import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { rateListing } from "../controllers/rate-listing.js";

const router = Router();

router.patch("/", requireLogin, rateListing);

export default router;
