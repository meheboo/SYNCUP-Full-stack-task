const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://syncup-full-stack-task-1.onrender.com";

const getApiUrl = () => {
  const normalizedUrl = API_URL.replace(/\/+$/, "");

  if (normalizedUrl.endsWith("/feed")) {
    return normalizedUrl.slice(0, -"/feed".length);
  }

  return normalizedUrl;
};

const parseJsonResponse = async (response, fallbackMessage) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch (_error) {
    throw new Error(
      `${fallbackMessage}. Backend returned HTML instead of JSON. Check NEXT_PUBLIC_API_URL.`
    );
  }
};

export async function fetchFeeds() {
  const response = await fetch(`${getApiUrl()}/feed`, {
    cache: "no-store",
  });

  const data = await parseJsonResponse(response, "Unable to load feeds");

  if (!response.ok) {
    throw new Error(data.message || "Unable to load feeds");
  }

  return data;
}

export async function createFeed(payload) {
  const response = await fetch(`${getApiUrl()}/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonResponse(response, "Unable to create feed");

  if (!response.ok) {
    throw new Error(data.message || "Unable to create feed");
  }

  return data;
}
