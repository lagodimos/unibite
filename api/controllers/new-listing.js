import { setAllergensForListing } from "../db/allergens.js";
import { pool } from "../db/pool.js";
import { savePhoto } from "../utils/save-photo.js";
import { formValueToArray } from '../utils/form-array.js';

export async function newListing(req, res, next) {
    try {
        console.log('Received new lisitng', req.body);

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

        const photo = req.files?.photo;
        const originalPhotoFilename = photo?.name ?? null;
        let photoFilename = null;
        if (photo) {
            photoFilename = await savePhoto(photo);
        }

        const result = await pool.query(
            `INSERT INTO food_listing (
                title,
                photo_filename,
                original_photo_filename,
                notes,
                total_portions,
                creation_datetime,
                pickup_datetime,
                pickup_point_description,
                pickup_point_room_number,
                pickup_point_latitude,
                pickup_point_longitude,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
            [
                title,
                photoFilename,
                originalPhotoFilename,
                notes,
                totalPortions,
                pickupDateTime,
                pickupPoint,
                roomNumber ? roomNumber : null,
                latitude,
                longitude,
                req.session.user_id
            ]
        );

        setAllergensForListing(result.insertId, allergens)

        return res.status(201).json({
            message: "newListingPublished"
        });
    } catch (error) {
        next(error);
    }
}
