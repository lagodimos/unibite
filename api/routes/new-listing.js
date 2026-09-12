import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { newListing } from "../controllers/new-listing.js";

const router = Router();

router.post("/", requireLogin, newListing);

export default router;
