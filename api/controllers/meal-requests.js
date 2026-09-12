import { pool } from "../db/pool.js";

export async function mealRequests(req, res, next) {
    try {
        const results = await pool.query(`
            SELECT
                fl.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'requester_id', u.user_id,
                        'requester_first_name', u.first_name,
                        'requester_last_name', u.last_name,
                        'status', rp.status,
                        'received', rp.received,
                        'rating', rp.rating
                    )
                ) AS requests
            FROM food_listing fl
            INNER JOIN reserves_portion rp
                ON rp.listing = fl.listing_id
            INNER JOIN user u
                ON u.user_id = rp.requested_by
            WHERE fl.created_by = ?
            GROUP BY fl.listing_id
            ORDER BY fl.creation_datetime DESC;`,
            [req.session.user_id]
        );

        return res.json(results);
    } catch (error) {
        next(error);
    }
}
