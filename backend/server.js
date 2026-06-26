require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  socket.on("send-message", (data) => {
    const receiverSocket = onlineUsers[data.receiver];

    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});