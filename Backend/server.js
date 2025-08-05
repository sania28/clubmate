import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config(); // Load .env file

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Simple test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is working fine!");
});

// Port setup
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
