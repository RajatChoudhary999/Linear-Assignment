const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Topic = sequelize.define("Topics", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Topic;
