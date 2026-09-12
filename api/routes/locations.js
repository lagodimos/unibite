import { Router } from "express";
import { locations } from "../controllers/locations.js";

const router = Router();

router.get("/", locations);

export default router;
