import { predefinedLocations } from "../data/locations.js";

export async function locations(req, res, next) {
    return res.json(predefinedLocations);
}
