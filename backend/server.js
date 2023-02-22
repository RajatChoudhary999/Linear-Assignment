const express = require("express");
const dotenv = require("dotenv");
// const connectToDatabase = require("./config/dbConnection");
const User = require("./routes/userRoutes");
const Topic = require("./routes/topicRoutes");
const Question = require("./routes/questionRoutes");
const Answer = require("./routes/answerRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const syncModels = require("./config/syncModels");

dotenv.config();

//DB Work
require("./config/dbConnection");
syncModels();

const app = express();
app.use(express.json()); // to Accept Json Data

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/topic", Topic);
app.use("/api/user", User);
app.use("/api/question", Question);
app.use("/api/answers", Answer);

//If no routes exist it will fall on this
app.use(notFound);
//If still there is a error it will fall on this
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

//7:27
