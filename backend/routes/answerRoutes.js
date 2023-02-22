const express = require("express");
const { checkAnswer } = require("../controllers/answerController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// --------------------GET END POINTS-------------------------------

// --------------------POST END POINTS-------------------------------
router.post("/answer-question/:id", protect, checkAnswer);

// --------------------PUT END POINTS-------------------------------

module.exports = router;
