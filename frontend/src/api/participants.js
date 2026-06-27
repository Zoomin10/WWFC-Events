import API_URL from "./api";

export async function getParticipants(eventId) {
  const response = await fetch(`${API_URL}/events/${eventId}/participants`);

  if (!response.ok) {
    throw new Error("Failed to fetch participants");
  }

  return response.json();
}

export async function createParticipant(eventId, participant) {
  const response = await fetch(`${API_URL}/events/${eventId}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });

  if (!response.ok) {
    throw new Error("Failed to create participant");
  }

  return response.json();
}