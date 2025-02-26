import { Server } from "socket.io";

let io;
const users = new Map(); // Store userId -> socketId mapping

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Adjust based on frontend
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Store user when they join
    socket.on("join", (userId) => {
      users.set(userId, socket.id); // Map userId to socketId
      console.log(`User ${userId} connected with socket ${socket.id}`);
      io.emit("userList", Array.from(users.keys())); // Notify all clients
    });

    // Handle sending messages
    socket.on("send-message", (message) => {
      console.log("Received message:", message);
      const receiverSocketId = users.get(message.receiverId); // Get receiver's socket
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive-message", message);
      } else {
        console.log(`Receiver ${message.receiverId} not found or offline.`);
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      const disconnectedUser = [...users.entries()].find(([userId, id]) => id === socket.id);
      if (disconnectedUser) {
        users.delete(disconnectedUser[0]);
        console.log(`User ${disconnectedUser[0]} disconnected`);
        io.emit("userList", Array.from(users.keys())); // Notify all clients
      }
    });
  });
};

export { initializeSocket, io, users };
