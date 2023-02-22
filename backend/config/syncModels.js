// const Answer = require("./answer.model");
const Question = require("../Models/questionModel");
const Topic = require("../Models/topicModel");
const User = require("../Models/userModel");
const UserResponse = require("../Models/userResponseModel");

function syncModels() {
  User.sync();
  Topic.sync();
  Question.sync();
  UserResponse.sync();
  // Answer.sync();
}

module.exports = syncModels;
