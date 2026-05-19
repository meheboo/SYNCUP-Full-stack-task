const feedRepository = require("../repository/feedRepository");
const { redis, ensureRedisConnected } = require("../config/redis");

const FEED_CACHE_KEY = "feed:latest";
const FEED_CACHE_TTL_SECONDS = 60;

const readFeedCache = async () => {
  try {
    await ensureRedisConnected();
    const cachedFeeds = await redis.get(FEED_CACHE_KEY);
    return cachedFeeds ? JSON.parse(cachedFeeds) : null;
  } catch (error) {
    console.error("Redis read failed:", error.message);
    return null;
  }
};

const writeFeedCache = async (feeds) => {
  try {
    await ensureRedisConnected();
    await redis.set(
      FEED_CACHE_KEY,
      JSON.stringify(feeds),
      "EX",
      FEED_CACHE_TTL_SECONDS
    );
  } catch (error) {
    console.error("Redis write failed:", error.message);
  }
};

const clearFeedCache = async () => {
  try {
    await ensureRedisConnected();
    await redis.del(FEED_CACHE_KEY);
  } catch (error) {
    console.error("Redis clear failed:", error.message);
  }
};

const getFeeds = async () => {
  const cachedFeeds = await readFeedCache();

  if (cachedFeeds) {
    return {
      source: "cache",
      feeds: cachedFeeds,
    };
  }

  const feeds = await feedRepository.findLatestFeeds();
  await writeFeedCache(feeds);

  return {
    source: "database",
    feeds,
  };
};

const createFeed = async ({ title, message }) => {
  const normalizedTitle = title?.trim();
  const normalizedMessage = message?.trim();

  if (!normalizedTitle || !normalizedMessage) {
    const error = new Error("Title and message are required");
    error.statusCode = 400;
    throw error;
  }

  if (normalizedTitle.length > 120) {
    const error = new Error("Title must be 120 characters or fewer");
    error.statusCode = 400;
    throw error;
  }

  const feed = await feedRepository.createFeed({
    title: normalizedTitle,
    message: normalizedMessage,
  });

  await clearFeedCache();
  return feed;
};

module.exports = {
  getFeeds,
  createFeed,
};
