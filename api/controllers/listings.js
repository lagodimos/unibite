import { unlink } from 'node:fs/promises';
import { setAllergensForListing } from "../db/allergens.js";
import { savePhoto } from "../utils/save-photo.js";
import { pool } from "../db/pool.js";
import { calcDerivedListingProperties } from "../utils/listings.js";
import { foodListingsWithAllergensSqlQuery } from '../db/allergens.js';
import { formValueToArray } from '../utils/form-array.js';

export async function listing(req, res, next) {
    try {
        const results = await pool.query(
            foodListingsWithAllergensSqlQuery(
                '',   // additional joins
                "WHERE listing_id = ?"    // condition
            ),
            [req.params.listingId]
        );

        const listings = await calcDerivedListingProperties(
            results,
            req.session.user_id
        );

        return res.json(listings[0]);
    } catch (error) {
        next(error);
    }
}

export async function editListing(req, res, next) {
    try {
        console.log('Received updated lisitng', req.body);

        let {
            title,
            photo_filename,
            notes,
            pickupDateTime,
            pickupPoint,
            roomNumber,
            totalPortions,
            latitude,
            longitude,
            allergens
        } = req.body;

        allergens = formValueToArray(allergens);

        // CHeck if the listing belongs to current user
        const result = (await pool.query(
            `SELECT * FROM food_listing
            WHERE listing_id = ?`,
            [req.params.listingId]
        ))[0];
        if (result.created_by !== req.session.user_id) {
            return res.status(403).json({ message: 'userDoesNotOwnThisListing' });
        }

        const photo = req.files?.photo;
        const originalPhotoFilename = photo?.name ?? null;
        let photoFilename = null;
        if (photo) {
            photoFilename = savePhoto(photo);

            // Delete old photo
            if (result.photo_filename) {
                unlink(`/app/uploads/images/${result.photo_filename}`);
            }
        }

        await pool.query(
            `UPDATE food_listing SET
            title = ?,
            photo_filename = ?,
            original_photo_filename = ?,
            notes = ?,
            total_portions = ?,
            pickup_datetime = ?,
            pickup_point_description = ?,
            pickup_point_room_number = ?,
            pickup_point_latitude = ?,
            pickup_point_longitude = ?
            WHERE listing_id = ?`,
            [
                title,
                photoFilename ?? result.photo_filename,
                originalPhotoFilename ?? result.original_photo_filename,
                notes,
                totalPortions,
                pickupDateTime,
                pickupPoint,
                roomNumber ? roomNumber : null,
                latitude,
                longitude,
                req.params.listingId
            ]
        );

        setAllergensForListing(req.params.listingId, allergens)

        return res.status(201).json({
            message: "listingEdited"
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteListing(req, res, next) {
    try {
        const results = await pool.query(
            `SELECT * FROM food_listing
            WHERE listing_id = ?`,
            [req.params.listingId]
        );

        if (results[0].created_by !== req.session.user_id) {
            return res.status(403).json({ message: 'userDoesNotOwnThisListing' });
        }
        else {
            await pool.query(
                `DELETE FROM food_listing
                WHERE listing_id = ?`,
                [req.params.listingId]
            );

            const photoFilename = results[0].photo_filename
            if (photoFilename) {
                unlink(`/app/uploads/images/${photoFilename}`);
            }

            console.log(`Deleted listing with id: ${req.params.listingId}`)

            return res.json({ message: 'listingDeleted' });
        }
    } catch (error) {
        next(error);
    }
}
