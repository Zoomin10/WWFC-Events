const API_URL = import.meta.env.VITE_API_URL;

export async function login(password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("Invalid password");
  }

  return response.json();
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}