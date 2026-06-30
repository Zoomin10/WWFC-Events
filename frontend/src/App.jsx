import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import ManageEventPage from "./pages/ManageEventPage";
import PublicLeaderboardPage from "./pages/PublicLeaderboardPage";
import LiveLeaderboardPage from "./pages/LiveLeaderboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";


function App() {
return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/live" element={<LiveLeaderboardPage />} />

        {/* Redirect root to live leaderboard */}
        <Route path="/" element={<Navigate to="/live" replace />} />

        {/* Protected admin pages */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<ManageEventPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;