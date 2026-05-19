const express = require("express");
const feedController = require("../controllers/feedController");

const router = express.Router();

router.get("/", feedController.getFeeds);
router.post("/", feedController.createFeed);

module.exports = router;
