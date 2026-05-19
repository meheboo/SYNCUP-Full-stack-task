const prisma = require("../config/db");

const findLatestFeeds = async () => {
  return prisma.feed.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createFeed = async ({ title, message }) => {
  return prisma.feed.create({
    data: {
      title,
      message,
    },
  });
};

module.exports = {
  findLatestFeeds,
  createFeed,
};
