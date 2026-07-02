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
      <div className="container">

        {/* Club title */}
        <div className="text-center text-md-start mb-2 mb-md-3">
          <span className="navbar-brand mb-0 fw-bold fs-4">
            WWFC Event Manager
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="d-flex justify-content-between align-items-center">

          {showEventsButton ? (
            <Link
              to="/events"
              className="btn btn-outline-light btn-sm"
            >
              <i className="bi bi-arrow-left me-1"></i>
              Events
            </Link>
          ) : (
            <span></span>
          )}

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>

        </div>

      </div>
    </nav>

    <main className="container py-4">
      <Outlet />
    </main>
  </>
);
}