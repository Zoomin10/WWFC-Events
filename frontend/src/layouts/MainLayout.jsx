import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isLivePage = location.pathname === "/live";

  if (isLivePage) {
    return <Outlet />;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
           Admin Site
          </Link>

       
        </div>
      </nav>

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}