import path from "path";
import crypto from "crypto";

export function savePhoto(photo) {
    const fileExtension = path.extname(photo.name);

    const newFilename = `${crypto.randomUUID()}${fileExtension}`;

    photo.mv(`/app/uploads/images/${newFilename}`);

    return newFilename;
}
