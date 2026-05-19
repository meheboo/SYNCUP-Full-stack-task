const VERCEL_PREVIEW_ORIGIN_PATTERN =
  /^https:\/\/syncup-full-stack-task-[a-z0-9-]+-mbs-projects-04623b4a\.vercel\.app$/;

const getClientOrigins = () => {
  const origins = process.env.CLIENT_ORIGIN || "http://localhost:3000";

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const isClientOriginAllowed = (origin) => {
  if (!origin) {
    return true;
  }

  return getClientOrigins().includes(origin) || VERCEL_PREVIEW_ORIGIN_PATTERN.test(origin);
};

const corsOrigin = (origin, callback) => {
  if (isClientOriginAllowed(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`Origin not allowed by CORS: ${origin}`));
};

module.exports = {
  corsOrigin,
  getClientOrigins,
  isClientOriginAllowed,
};
