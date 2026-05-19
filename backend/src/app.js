const express = require("express");
const cors = require("cors");

const { getClientOrigins } = require("./config/clientOrigins");
const feedRoutes = require("./routes/feedRoutes");

const app = express();

const clientOrigins = getClientOrigins();

app.use(
  cors({
    origin: clientOrigins,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "SYNCUP backend is running",
    endpoints: {
      health: "/health",
      feed: "/feed",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/feed", feedRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
