const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3001/api"
    : "https://wwfc-events-production.up.railway.app/api");

export default API_URL;