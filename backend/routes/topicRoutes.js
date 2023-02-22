const express = require("express");
const {
  getAllTopics,
  createNewTopics,
  deleteTopics,
} = require("../controllers/topicController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// --------------------GET END POINTS-------------------------------
router.get("/alltopics", protect, getAllTopics);

// --------------------POST END POINTS-------------------------------
router.post("/create-topics", protect, createNewTopics);

// --------------------PUT END POINTS-------------------------------
router.put("/delete-topics", protect, deleteTopics);

module.exports = router;
