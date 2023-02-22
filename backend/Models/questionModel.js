const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const Topic = require("./topicModel");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option4: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Question.belongsTo(Topic);

module.exports = Question;
