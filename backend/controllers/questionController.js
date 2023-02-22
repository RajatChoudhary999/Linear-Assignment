const Question = require("../Models/questionModel");
const asyncHandler = require("express-async-handler");
const Topic = require("../Models/topicModel");

const getQuestionsByTopicId = asyncHandler(async (req, res) => {
  const topicId = req.params.id;
  // console.log(req.params.id);

  try {
    const questions = await Question.findAll({
      where: { topicId },
      attributes: { exclude: ["comment", "answer"] },
    });

    return res.status(201).json(questions);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const createQuestionByTopicId = asyncHandler(async (req, res) => {
  const { text, option1, option2, option3, option4, answer, comment } =
    req.body;

  //checking values are passed
  if (
    !(text && option1 && option2 && option3 && option4 && answer && comment)
  ) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // console.log(req.params.id);
  //Checking if topic exist
  const topic = await Topic.findByPk(req.params.id);

  if (!topic) {
    return res.status(404).send("Topic not found");
  }

  try {
    const question = await Question.create({
      text,
      option1,
      option2,
      option3,
      option4,
      answer,
      comment,
      TopicId: topic.id,
    });

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).send(error);
  }
});

const deleteQuestionById = asyncHandler(async (req, res) => {
  let question = await Question.findByPk(req.params.id);

  try {
    // Attempt to delete the Question
    const deleted = await Question.destroy({
      where: {
        id: question.id,
      },
    });

    // Check if any rows were affected by the delete operation
    if (deleted === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    // If the question was successfully deleted, return a success message
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: "Failed to delete Question" });
  }
});

module.exports = {
  getQuestionsByTopicId,
  createQuestionByTopicId,
  deleteQuestionById,
};
