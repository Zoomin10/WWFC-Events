import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import ManageEventPage from "./pages/ManageEventPage";
import PublicLeaderboardPage from "./pages/PublicLeaderboardPage";
import LiveLeaderboardPage from "./pages/LiveLeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<ManageEventPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/events/:id/leaderboard" element={<PublicLeaderboardPage />} />
          <Route path="/live" element={<LiveLeaderboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;