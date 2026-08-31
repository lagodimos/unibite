const express = require("express");
const requireLogin = require("../middleware/require-login");
const router = express.Router();

const { status, login, logout } = require("../controllers/auth");

router.get("/status", requireLogin, status);
router.post("/login", login);
router.delete("/logout", requireLogin, logout);

module.exports = router;
