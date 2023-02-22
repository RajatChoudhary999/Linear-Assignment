const express = require("express");
const {
  createQuestionByTopicId,
  getQuestionsByTopicId,
  deleteQuestionById,
} = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// --------------------GET END POINTS-------------------------------
router.get("/topic/questions/:id", protect, getQuestionsByTopicId);

// --------------------POST END POINTS-------------------------------
router.post("/create-question/:id", protect, createQuestionByTopicId);

// --------------------PUT END POINTS-------------------------------
router.put("/delete-questions/:id", protect, deleteQuestionById);
module.exports = router;
