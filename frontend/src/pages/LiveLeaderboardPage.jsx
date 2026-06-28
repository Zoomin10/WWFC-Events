import { useEffect, useState } from "react";
import { getActiveEvent } from "../api/events";
import LeaderboardTab from "../components/LeaderboardTab";

export default function LiveLeaderboardPage() {
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadActiveEvent();
  }, []);

  async function loadActiveEvent() {
    try {
      const data = await getActiveEvent();
      setEvent(data);
      setStatus("ready");
    } catch (error) {
      setStatus("none");
    }
  }

  if (status === "loading") {
    return (
      <div className="container py-4 text-center">
        <p>Loading live leaderboard...</p>
      </div>
    );
  }

  if (status === "none") {
    return (
      <div className="container py-4 text-center">
        <h1 className="h3 fw-bold">WWFC Live Leaderboard</h1>
        <p className="text-muted">
          There is no active event at the moment.
        </p>
      </div>
    );
  }

return (
  <div className="container py-4">

    <div className="text-center mb-4">

      <div style={{ fontSize: "3rem" }}>🏆</div>

      <div className="text-uppercase text-primary fw-bold small">
        WWFC LIVE RESULTS
      </div>

      <h1 className="display-6 fw-bold mb-2">
        {event.name}
      </h1>

      <div className="text-muted">
        {new Date(event.eventDate).toLocaleDateString("en-GB")}
      </div>

      <div className="text-muted mb-3">
        {event.location}
      </div>

      <span className="badge bg-success fs-6">
        ● LIVE
      </span>

    </div>

    <LeaderboardTab eventId={event.id} />

  </div>
);
}