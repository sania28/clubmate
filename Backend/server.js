const http = require("http");
const app = require("./app");
const connectRedis = require("./DB/redis.connection");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`🚀 Server running at port ${port}`);
    });
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
}

startServer();
