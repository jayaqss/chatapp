const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();

app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
