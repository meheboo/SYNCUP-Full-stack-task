const getClientOrigins = () => {
  const origins = process.env.CLIENT_ORIGIN || "http://localhost:3000";

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

module.exports = {
  getClientOrigins,
};
