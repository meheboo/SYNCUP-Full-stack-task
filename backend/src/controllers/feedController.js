const feedService = require("../services/feedService");
const { getIO } = require("../config/socket");

const getFeeds = async (_req, res, next) => {
  try {
    const result = await feedService.getFeeds();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createFeed = async (req, res, next) => {
  try {
    const feed = await feedService.createFeed(req.body);

    getIO().emit("feed:created", feed);

    res.status(201).json({
      message: "Feed created successfully",
      feed,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeeds,
  createFeed,
};
