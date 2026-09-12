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
