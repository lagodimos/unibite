import { Router } from "express";
import requireLogin from "../middleware/require-login.js";
import { mealRequests } from "../controllers/meal-requests.js";

const router = Router();

router.get("/", requireLogin, mealRequests);

export default router;
