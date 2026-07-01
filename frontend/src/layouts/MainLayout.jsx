import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const showEventsButton = location.pathname !== "/events";

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container d-flex justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            {showEventsButton && (
              <Link to="/events" className="btn btn-outline-light btn-sm">
                ← Events
              </Link>
            )}

            <span className="navbar-brand mb-0 fw-bold">
              WWFC Event Manager
            </span>
          </div>

          <button
            className="btn btn-outline-light btn-sm flex-shrink-0"
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