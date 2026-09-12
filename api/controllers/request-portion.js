import { pool } from "../db/pool.js";

async function requestPortion(req, res, next) {
    try {
        const listingId = req.body.listing_id;

        await pool.query(
            `INSERT INTO reserves_portion (status, requested_by, listing, received)
            VALUES ('requested', ?, ?, NULL)
            `, [req.session.user_id, listingId]
        );

        return res.status(201).json({
            message: `sentReservationRequest`
        });
    } catch (error) {
        next(error);
    }
}

export default requestPortion;
