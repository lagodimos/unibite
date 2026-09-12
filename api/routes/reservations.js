import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { reservations } from "../controllers/reservations.js";

const router = Router();

router.get("/", requireLogin, reservations);

export default router;
