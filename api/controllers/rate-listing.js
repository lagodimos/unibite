import { pool } from "../db/pool.js";

export async function rateListing(req, res, next) {
    console.log('Received listing rating', req.body);

    const {
        listingId,
        rating,
    } = req.body;

    try {
        await pool.query(`
            UPDATE reserves_portion
            SET rating = ?
            WHERE listing = ?
                AND requested_by = ?
            `,
            [rating, listingId, req.session.user_id]
        );

        if (rating > 3) {
            await pool.query(`
                UPDATE student
                SET points = points + 1
                WHERE student_id = (
                    SELECT created_by
                    FROM food_listing
                    WHERE listing_id = ?
                )`,
                [listingId]
            );
        }

        return res.json({
            message: "ratedListingSuccessfully"
        });
    } catch (error) {
        next(error);
    }
}
