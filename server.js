const server = app.listen(5000, console.log(`Server started on PORT ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  //frontend will send some data and join the chat
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
});
