import { Router } from "express";
import { allergens } from "../controllers/allergens.js";

const router = Router();

router.get("/", allergens);

export default router;
