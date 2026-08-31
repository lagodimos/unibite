const express = require("express");
const requireLogin = require("../middleware/require-login");
const router = express.Router();

const { userProfile } = require("../controllers/user-profile");

router.get("/", requireLogin, userProfile);

module.exports = router;
