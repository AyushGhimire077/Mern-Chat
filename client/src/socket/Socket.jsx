import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Socket connected:", socket.connected); // Should print true
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err); // Will print any connection error
});

export default socket;