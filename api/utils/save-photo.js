import path from "path";
import crypto from "crypto";

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

export async function savePhoto(photo) {
    const fileExtension = path.extname(photo.name).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        const error = new Error(`Unsupported photo type: ${fileExtension}`);
        error.statusCode = 400;
        error.clientMessage = "unsupportedPhotoType";

        throw error;
    }

    const newFilename = `${crypto.randomUUID()}${fileExtension}`;

    await photo.mv(`/app/uploads/images/${newFilename}`);

    return newFilename;
}
