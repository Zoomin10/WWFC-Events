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
  <>
    {/* Club Banner */}
    <div
      className="bg-primary text-center shadow-sm"
      style={{ padding: "20px 0" }}
    >
      <img
        src="/images/logo-horizontal.png"
        alt="Wroughton & Wichelstowe FC"
        style={{
          width: "90%",
          maxWidth: "700px",
          height: "auto",
        }}
      />
    </div>

    <div className="container py-4">

      <div className="text-center mb-5">

        <div style={{ fontSize: "3rem" }}>🏆</div>

        <div className="text-uppercase text-primary fw-bold small">
          LIVE RESULTS
        </div>

        <h1 className="display-5 fw-bold mb-2">
          {event.name}
        </h1>

        <div className="text-muted">
          📅 {new Date(event.eventDate).toLocaleDateString("en-GB")}
        </div>

        <div className="text-muted mb-3">
          📍 {event.location}
        </div>

        <span className="badge bg-success fs-5 px-4 py-2">
          ● LIVE
        </span>

      </div>

      <LeaderboardTab eventId={event.id} />

    </div>
  </>
);
}