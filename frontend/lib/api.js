const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://syncup-full-stack-task-1.onrender.com";

export async function fetchFeeds() {
  const response = await fetch(`${API_URL}/feed`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load feeds");
  }

  return response.json();
}

export async function createFeed(payload) {
  const response = await fetch(`${API_URL}/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create feed");
  }

  return data;
}