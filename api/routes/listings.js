import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { listing, editListing, deleteListing } from "../controllers/listings.js";

const router = Router();

router.get("/:listingId", requireLogin, listing);
router.patch("/:listingId", requireLogin, editListing);
router.delete("/:listingId", requireLogin, deleteListing);

export default router;
