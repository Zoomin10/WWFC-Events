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
          <Link className="navbar-brand fw-bold" to="/events">
            WWFC Event Manager
          </Link>

          <button
            className="btn btn-outline-light btn-sm"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}