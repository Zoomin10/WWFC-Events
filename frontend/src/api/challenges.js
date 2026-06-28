import API_URL from "./api";


export async function getChallenges(eventId) {
  const response = await fetch(
    `${API_URL}/events/${eventId}/challenges`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }

  return response.json();
}

export async function createChallenge(eventId, challenge) {
  const response = await fetch(
    `${API_URL}/events/${eventId}/challenges`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(challenge),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }

  return response.json();
}