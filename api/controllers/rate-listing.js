import { pool } from "../db/pool.js";

export async function rateListing(req, res, next) {
    console.log('Received listing rating', req.body);

    const { listingId } = req.body;

    // The rating arrives as a string when it is
    // submitted from the rating modal's hidden input
    const rating = Number(req.body.rating);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "invalidRating"
        });
    }

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // Only a portion that the current user reserved,
        // received and has not rated yet can be rated
        const ratingResult = await conn.query(`
            UPDATE reserves_portion
            SET rating = ?
            WHERE listing = ?
                AND requested_by = ?
                AND status = 'approved'
                AND received = TRUE
                AND rating IS NULL
            `,
            [rating, listingId, req.session.user_id]
        );

        if (ratingResult.affectedRows === 0) {
            await conn.rollback();

            return res.status(403).json({
                message: "cannotRateListing"
            });
        }

        if (rating > 3) {
            await conn.query(`
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

        await conn.commit();

        return res.json({
            message: "ratedListingSuccessfully"
        });
    } catch (error) {
        await conn.rollback();
        next(error);
    } finally {
        conn.release();
    }
}
