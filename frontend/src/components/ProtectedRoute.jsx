import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const user = await getCurrentUser();

    if (user?.authenticated) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }

  if (status === "loading") {
    return (
      <div className="container py-5 text-center">
        Checking authentication...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}