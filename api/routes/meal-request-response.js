import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { mealRequestResponse } from "../controllers/meal-request-response.js";

const router = Router();

router.patch("/", requireLogin, mealRequestResponse);

export default router;
