import { pool } from "../db/pool.js";

export async function mealRequestResponse(req, res, next) {
    console.log('Received response on a meal request', req.body);

    const {
        listingId,
        requesterId,
        approved
    } = req.body;

    const status = approved ? "approved" : "rejected";

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        await conn.query(`
            UPDATE reserves_portion
            SET status = ?
            WHERE listing = ?
                AND requested_by = ?`,
            [status, listingId, requesterId]
        );

        if (status === 'approved') {
            await conn.query(`
                UPDATE student
                SET points = points + 1
                WHERE student_id = ?`,
                [req.session.user_id]
            );
        }

        if (approved) {
            const totalPortions = (
                await conn.query(
                    `SELECT *
                    FROM food_listing
                    WHERE listing_id = ?`,
                    [listingId]
                )
            )[0].total_portions;

            const reservedPortions = (
                await conn.query(
                    `SELECT *
                    FROM reserves_portion
                    WHERE listing = ?
                        AND status = 'approved'`,
                    [listingId]
                )
            ).length;

            if (reservedPortions >= totalPortions) {
                await conn.query(`
                    UPDATE reserves_portion
                    SET status = 'rejected'
                    WHERE listing = ?
                        AND status = 'requested'
                    `,
                    [listingId]
                );
            }
        }

        await conn.commit();

        return res.json({
            message: approved ?
                "requestApprovalSuccessful" :
                "requestRejectionSuccessful"
        });
    } catch (error) {
        await conn.rollback();
        next(error);
    } finally {
        conn.release();
    }
}
