import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import requestPortion from "../controllers/request-portion.js";

const router = Router();

router.post("/", requireLogin, requestPortion);

export default router;
