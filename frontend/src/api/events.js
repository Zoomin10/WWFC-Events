import API_URL from "./api";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export async function createEvent(event) {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}
export async function activateEvent(id) {
  const response = await fetch(`${API_URL}/events/${id}/activate`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to activate event");
  }

  return response.json();
}
export async function getEvent(id) {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}