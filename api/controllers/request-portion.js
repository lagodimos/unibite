import { pool } from "../db/pool.js";
import { filterDeletedListings } from "../utils/listings.js";

async function requestPortion(req, res, next) {
    try {
        const listingId = req.body.listing_id;

        const listingResults = await pool.query(
            `SELECT listing_id, created_by, total_portions, creation_datetime
            FROM food_listing
            WHERE listing_id = ?`,
            [listingId]
        );

        if (listingResults.length === 0) {
            return res.status(404).json({ message: "listingNotFound" });
        }

        const listing = listingResults[0];

        if (listing.created_by === req.session.user_id) {
            return res.status(403).json({ message: "cannotRequestOwnListing" });
        }

        if (filterDeletedListings(listingResults).length === 0) {
            return res.status(410).json({ message: "listingIsDeleted" });
        }

        const reservedPortions = (
            await pool.query(
                `SELECT *
                FROM reserves_portion
                WHERE listing = ?
                    AND status = 'approved'`,
                [listingId]
            )
        ).length;

        if (listing.total_portions - reservedPortions <= 0) {
            return res.status(409).json({ message: "noPortionsAvailable" });
        }

        const existingRequest = await pool.query(
            `SELECT *
            FROM reserves_portion
            WHERE listing = ?
                AND requested_by = ?`,
            [listingId, req.session.user_id]
        );

        if (existingRequest.length > 0) {
            return res.status(409).json({ message: "portionAlreadyRequested" });
        }

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
