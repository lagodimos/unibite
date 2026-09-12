import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { userProfile } from "../controllers/user-profile.js";

const router = Router();

router.get("/", requireLogin, userProfile);

export default router;
