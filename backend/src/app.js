const express = require("express");
const cors = require("cors");

const feedRoutes = require("./routes/feedRoutes");

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: clientOrigin,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

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
