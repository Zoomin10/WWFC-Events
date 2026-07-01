import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function MainLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
     <nav className="navbar navbar-dark bg-primary shadow-sm">
  <div className="container d-flex justify-content-between align-items-center">

    <div className="d-flex align-items-center gap-3">

      <Link
        to="/events"
        className="btn btn-outline-light btn-sm"
      >
        ← Events
      </Link>

      <span className="navbar-brand mb-0 h1 fw-bold">
        WWFC Event Manager
      </span>

    </div>

    <button
      className="btn btn-outline-light btn-sm"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>
</nav>
    </>
  );
}