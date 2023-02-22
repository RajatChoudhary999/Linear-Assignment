const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");
const router = express.Router();

// --------------------POST END POINTS-------------------------------
router.post("/create-user", registerUser);
router.post("/login", authUser);

module.exports = router;
