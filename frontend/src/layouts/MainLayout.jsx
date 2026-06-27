import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            WWFC Events
          </Link>

          <div className="navbar-nav">
            <Link className="nav-link text-white" to="/">
              Dashboard
            </Link>

            <Link className="nav-link text-white" to="/events">
              Events
            </Link>

            <Link className="nav-link text-white" to="/settings">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}