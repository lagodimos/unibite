import { pool } from "./pool.js";

export function foodListingsWithAllergensSqlQuery(joins, condition) {
    return `
        SELECT
            fl.*,
            CASE
                WHEN COUNT(a.allergen_id) = 0 THEN JSON_ARRAY()
                ELSE JSON_ARRAYAGG(a.allergen_name)
            END AS allergens
        FROM food_listing AS fl

        LEFT JOIN contains_allergen AS ca
            ON fl.listing_id = ca.listing

        LEFT JOIN allergen AS a
            ON ca.allergen = a.allergen_id

        ${joins}

        ${condition}

        GROUP BY fl.listing_id`;
}

export async function getAllergens() {
    const results = await pool.query(`
        SELECT allergen_name
        FROM allergen
    `);
    const allergens = results.map((result) => result.allergen_name);

    return allergens;
}

export async function setAllergensForListing(listingId, allergens) {
    await pool.query(
        `DELETE FROM contains_allergen
        WHERE listing = ?`,
        [listingId]
    );

    if (allergens.length > 0) {
        const placeholders = allergens.map(() => '?').join(",");

        await pool.query(
            `INSERT INTO contains_allergen (listing, allergen)
            SELECT ?, allergen_id
            FROM allergen
            WHERE allergen_name IN (${placeholders})`,
            [listingId, ...allergens]
        );
    }
}
