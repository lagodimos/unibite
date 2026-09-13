import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { status, register, login, logout } from "../controllers/auth.js";

const router = Router();

router.get("/status", status);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", requireLogin, logout);

export default router;
