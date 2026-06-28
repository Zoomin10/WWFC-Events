import API_URL from "./api";

export async function getResults(eventId) {
  const response = await fetch(`${API_URL}/events/${eventId}/results`);

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  return response.json();
}

export async function createResult(eventId, result) {
  const response = await fetch(`${API_URL}/events/${eventId}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error("Failed to create result");
  }

  return response.json();
}