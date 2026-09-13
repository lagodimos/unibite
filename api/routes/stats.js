import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { stats } from "../controllers/stats.js";

const router = Router();

router.get("/", requireLogin, stats);

export default router;
