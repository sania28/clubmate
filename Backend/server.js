const http = require("http");
const app = require("./app");
const connectRedis = require("./DB/redis.connection");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // Explicitly connect to Redis before starting the server.
    await require('./DB/redis.connection').connect();

    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`🚀 Server running at port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server due to Redis connection failure:", err);
    process.exit(1); // Exit if critical connection fails
  }
}

startServer();
