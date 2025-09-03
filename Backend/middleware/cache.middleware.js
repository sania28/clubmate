const cacheService = require("../service/cache.service");

// Middleware to check cache before hitting DB
async function cacheMiddleware(req, res, next) {
  try {
    const key = req.originalUrl; // cache per URL+query
    console.log(`🔍 Checking cache for key: ${key}`);

    const cachedData = await cacheService.get(key);

    if (cachedData) {
      console.log(`✅ Cache HIT for ${key}`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log(`🐢 Cache MISS for ${key}, proceeding to DB...`);

    // Intercept res.json to store response in Redis
    res.sendResponse = res.json;
    res.json = async (body) => {
      try {
        await cacheService.set(key, JSON.stringify(body), 60); // cache for 60s
        console.log(`✅ Response cached for ${key}`);
      } catch (err) {
        console.error(`❌ Failed to cache response for ${key}:`, err);
      }
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error("Redis middleware error:", err);
    next();
  }
}

module.exports = cacheMiddleware;
