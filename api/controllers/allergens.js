import { getAllergens } from "../db/allergens.js";

export async function allergens(req, res, next) {
    return res.json(await getAllergens());
}
