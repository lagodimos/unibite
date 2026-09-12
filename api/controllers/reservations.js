import { pool } from "../db/pool.js";
import { calcDerivedListingProperties, filterDeletedListings } from "../utils/listings.js";
import { foodListingsWithAllergensSqlQuery } from "../db/allergens.js";

/**
 * Returns all reservations made by the current user
 */
export async function reservations(req, res, next) {
    try {
        const results = await pool.query(
            foodListingsWithAllergensSqlQuery(
                `JOIN reserves_portion AS rp
                    ON fl.listing_id = rp.listing`, // additional joins
                'WHERE rp.requested_by = ?'),   // condition
            [req.session.user_id]
        );

        let reservations = filterDeletedListings(results);

        reservations = await calcDerivedListingProperties(
            reservations,
            req.session.user_id
        );

        return res.json(reservations);
    } catch (error) {
        next(error);
    }
}
