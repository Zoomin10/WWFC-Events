import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(password);
      navigate("/events");
    } catch {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 450 }}>
      <div className="text-center mb-4">
        <h1 className="page-title">WWFC Event Manager</h1>

        <p className="text-muted">
          Administrator Login
        </p>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <button
              className="btn btn-primary w-100"
              type="submit"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}