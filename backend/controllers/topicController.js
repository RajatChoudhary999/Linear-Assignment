const Topic = require("../Models/topicModel");
const asyncHandler = require("express-async-handler");

const getAllTopics = asyncHandler(async (req, res) => {
  try {
    let allTopics = await Topic.findAll();

    if (allTopics) {
      return res.status(200).json({ allTopics });
    } else {
      return res.status(401).json("No topics Found");
    }
  } catch (error) {
    res.status(400).send("Failed to find Topic: " + error.message);
  }
});

const createNewTopics = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please Enter Topic name");
  }

  //Create User
  try {
    const topic = await Topic.create({
      name,
    });

    if (topic) {
      // console.log("topic Created: ", topic);
      return res.status(201).json({
        id: topic.id,
        topic: topic.name,
      });
    }
  } catch (error) {
    res.status(400).send("Failed to create Topic: " + error.message);
  }
});

const deleteTopics = asyncHandler(async (req, res) => {
  const { topicId } = req.body;
  if (!topicId) {
    res.status(400);
    throw new Error("Please Enter Id of the Topic");
  }

  try {
    // Attempt to delete the topic
    const deleted = await Topic.destroy({
      where: {
        id: topicId,
      },
    });

    // Check if any rows were affected by the delete operation
    if (deleted === 0) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // If the topic was successfully deleted, return a success message
    return res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete topic" });
  }
});

module.exports = {
  getAllTopics,
  createNewTopics,
  deleteTopics,
};
