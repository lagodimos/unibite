import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { submitReceptionStatus } from "../controllers/submit-reception-status.js";

const router = Router();

router.patch("/", requireLogin, submitReceptionStatus);

export default router;
