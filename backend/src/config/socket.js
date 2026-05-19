const { Server } = require("socket.io");
const { getClientOrigins } = require("./clientOrigins");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: getClientOrigins(),
      methods: ["GET", "POST"],
    },
    connectionStateRecovery: {},
  });

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};
