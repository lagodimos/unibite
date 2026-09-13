import { pool } from "../db/pool.js";

export async function submitReceptionStatus(req, res, next) {
    console.log('Received reception status', req.body);

    const {
        listingId,
        requesterId,
        received
    } = req.body;

    const conn = await pool.getConnection();

    try {
        const listingResults = await conn.query(
            `SELECT created_by
            FROM food_listing
            WHERE listing_id = ?`,
            [listingId]
        );

        if (listingResults.length === 0) {
            return res.status(404).json({ message: "listingNotFound" });
        }

        if (listingResults[0].created_by !== req.session.user_id) {
            return res.status(403).json({ message: "userDoesNotOwnThisListing" });
        }

        await conn.beginTransaction();

        await conn.query(`
            UPDATE reserves_portion
            SET received = ?
            WHERE listing = ?
                AND requested_by = ?
            `,
            [received, listingId, requesterId]
        );

        if (!received) {
            await conn.query(
                `
                UPDATE student
                SET points = points - 1
                WHERE student_id = ?
                `,
                [requesterId]
            );
        }

        await conn.commit();

        return res.json({
            message: received ?
                "markedAsReceived" :
                "markedAsNotReceived"
        });
    } catch (error) {
        await conn.rollback();
        next(error);
    } finally {
        conn.release();
    }
}
