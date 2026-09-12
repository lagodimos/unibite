import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { myListings } from "../controllers/my-listings.js";

const router = Router();

router.get("/", requireLogin, myListings);

export default router;
