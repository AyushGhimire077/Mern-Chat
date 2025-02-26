import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

// File imports
import connectDB from "./config/connectdb.js";
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { initializeSocket } from "./config/socket.js"; 

const app = express();
const server = http.createServer(app); 

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Initialize socket
initializeSocket(server); 

// Routes 
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

server.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
