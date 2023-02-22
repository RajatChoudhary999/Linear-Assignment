const asyncHandler = require("express-async-handler");
const Question = require("../Models/questionModel");
const UserResponse = require("../Models/userResponseModel");

async function addResponseToDB(question, userId, selectedOption) {
  let questionId = question.id;
  let recordResponse = await UserResponse.create({
    userId,
    questionId,
    selectedOption,
  });

  return recordResponse;
}

const checkAnswer = asyncHandler(async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  const { selectedOption, userId } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("No Question Found");
  }

  let checkIfAnswered = await UserResponse.findOne({
    where: {
      userId: userId,
      questionId: question.id,
    },
  });
  //   console.log(checkIfAnswered);
  if (checkIfAnswered) {
    return res.status(400).json("Already Attempted");
  }

  //check answer
  if (question.answer == selectedOption) {
    const createResponse = await addResponseToDB(
      question,
      userId,
      selectedOption
    );
    if (createResponse) {
      return res.status(200).json({
        correct: true,
        message: "Your response is correct and Recorded!",
        comment: question.comment,
      });
    }
  }

  if (question.answer !== selectedOption) {
    const createResponse = await addResponseToDB(
      question,
      userId,
      selectedOption
    );
    if (createResponse) {
      return res.status(400).json({
        correct: false,
        message: "Your response is incorrect and Its recorded!",
        comment: question.comment,
      });
    }
  }
});

module.exports = {
  checkAnswer,
};
