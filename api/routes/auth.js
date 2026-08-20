const express = require("express");
const router = express.Router();

const { status, login, logout } = require("../controllers/auth");

router.get("/status", status);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
