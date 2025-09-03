// Backend/service/cache.service.js
const redisClient = require("../DB/redis.connection");

const TTL = process.env.CACHE_TTL || 300; // Default = 5 min

// ✅ Get cached value
async function get(key) {
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.error("❌ Redis GET error:", error);
    return null;
  }
}

async function set(key, value, ttl = TTL) {
  try {
    const storeValue = typeof value === "string" ? value : JSON.stringify(value);
    await redisClient.set(key, storeValue, { EX: ttl });
  } catch (err) {
    console.error("❌ Redis SET error:", err);
  }
}


// ✅ Delete single key
async function del(key) {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("❌ Redis DEL error:", error);
  }
}

// ✅ Delete keys by pattern (Redis v4+ compatible)
async function delPattern(pattern) {
  try {
    const keys = await redisClient.sendCommand(["KEYS", `*${pattern}*`]); // v4 way
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🗑 Deleted cache keys: ${keys}`);
    }
  } catch (error) {
    console.error("❌ Redis delPattern error:", error);
  }
}

module.exports = { get, set, del, delPattern };
