import { pool } from "../db/pool.js";

export async function calcDerivedListingProperties(listings, userId) {
    const newListings = [];

    for (const listing of listings) {
        const reservedPortions = (
            await pool.query(
                `SELECT *
                FROM reserves_portion
                WHERE listing = ?
                    AND status = 'approved'`,
                [listing.listing_id]
            )
        ).length;

        const isActive = listing.total_portions - reservedPortions > 0;

        const reservationForCurrentUser = await pool.query(
            `SELECT status, received, rating
             FROM reserves_portion
             WHERE requested_by = ?
               AND listing = ?`,
            [userId, listing.listing_id]
        );

        const statusForCurrentUser =
            reservationForCurrentUser.length > 0
                ? reservationForCurrentUser[0].status
                : "not_requested";

        const isReceivedByCurrentUser =
            statusForCurrentUser == 'approved' ?
                reservationForCurrentUser[0].received :
                false;

        const currentUserRating =
            statusForCurrentUser == 'approved' ?
                reservationForCurrentUser[0].rating :
                undefined;

        newListings.push({
            ...listing,
            reserved_portions: reservedPortions,
            is_active: isActive,
            status_for_current_user: statusForCurrentUser,
            received_by_current_user: isReceivedByCurrentUser,
            current_user_rating: currentUserRating
        });
    }

    return newListings;
}

/**
 * Filters the deleted listings from a list.
 * A listing is considered deleted if 48 hours
 * have passed from its creation.
 */
export function filterDeletedListings(listings) {
    const notDeletedListings = listings.filter(result => {
        const created = new Date(result.creation_datetime);
        const expires = created.getTime() + 48 * 60 * 60 * 1000;

        return Date.now() < expires;
    });

    return notDeletedListings;
}
