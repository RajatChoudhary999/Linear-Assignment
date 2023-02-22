const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const Question = require("./questionModel");
const User = require("./userModel");

const UserResponse = sequelize.define("UserResponse", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  selectedOption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserResponse.belongsTo(User, { foreignKey: "userId" });
UserResponse.belongsTo(Question, { foreignKey: "questionId" });

module.exports = UserResponse;
