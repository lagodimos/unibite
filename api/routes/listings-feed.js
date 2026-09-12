import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { listingsFeed } from "../controllers/listings-feed.js";

const router = Router();

router.get("/", requireLogin, listingsFeed);

export default router;
