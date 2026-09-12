import { foodListingsWithAllergensSqlQuery } from "../db/allergens.js";
import { pool } from "../db/pool.js";
import { calcDerivedListingProperties, filterDeletedListings } from "../utils/listings.js";

export async function listingsFeed(req, res, next) {
    try {
        const results = await pool.query(
            foodListingsWithAllergensSqlQuery(
                '', // additional joins
                'WHERE created_by <> ?' // condition
            ),
            [req.session.user_id]
        );

        let listings = filterDeletedListings(results);

        listings = await calcDerivedListingProperties(
            listings,
            req.session.user_id
        );

        return res.json(listings);
    } catch (error) {
        next(error);
    }
}
