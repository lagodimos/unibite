import { pool } from "../db/pool.js";

export async function stats(req, res, next) {
    try {
        // MAke sure the user is admin
        const adminResults = await pool.query(
            "SELECT 1 FROM admin WHERE admin_id = ?",
            [req.session.user_id]
        );
        if (adminResults.length === 0) {
            return res.status(403).json({
                message: "userIsNotAdmin"
            });
        }

        /* Monthly Shared Portions */
        const result = await pool.query(`
            SELECT COUNT(*) AS monthly_shared_portions
            FROM reserves_portion rp
            JOIN food_listing fl ON rp.listing = fl.listing_id
            WHERE rp.received = TRUE
              AND fl.creation_datetime >= NOW() - INTERVAL 30 DAY
        `);
        const monthlySharedPortions =
            Number(result.length === 0 ?
                0 : result[0].monthly_shared_portions)

        /* Top Donor */
        const topDonorResult = await pool.query(`
            SELECT
                u.user_id,
                u.first_name,
                u.last_name,
                u.email,
                COUNT(rp.listing) AS total_portions_donated
            FROM user u
            JOIN student s ON u.user_id = s.student_id
            JOIN food_listing fl ON s.student_id = fl.created_by
            JOIN reserves_portion rp ON fl.listing_id = rp.listing
            WHERE rp.received = TRUE
            GROUP BY u.user_id, u.first_name, u.last_name, u.email
            ORDER BY total_portions_donated DESC
            LIMIT 1
        `);
        const topDonor = topDonorResult[0];
        topDonor.total_portions_donated = Number(topDonor.total_portions_donated);

        /* Top Rated Listings */
        const [topRatedMeals] = await pool.query(`
            SELECT
                fl.listing_id,
                fl.title,
                u.first_name AS user_first_name,
                u.last_name AS user_last_name,
                ROUND(AVG(rp.rating), 2) AS average_rating
            FROM food_listing fl
            JOIN user u ON fl.created_by = u.user_id
            JOIN reserves_portion rp ON fl.listing_id = rp.listing
            WHERE rp.received = TRUE
              AND rp.rating IS NOT NULL
            GROUP BY fl.listing_id, fl.title, u.first_name, u.last_name
            ORDER BY average_rating DESC
            LIMIT 5
        `);

        return res.json({
            monthlySharedPortions,
            topDonor,
            topRatedMeals
        })
    } catch (error) {
        next(error);
    }
}
