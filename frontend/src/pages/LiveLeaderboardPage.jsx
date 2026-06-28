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
      className="bg-primary text-center shadow-sm py-2"
      style={{ overflow: "hidden" }}
    >
      <img
        src="/images/logo-horizontal.png"
        alt="Wroughton & Wichelstowe FC"
        style={{
          width: "70%",
          maxWidth: "380px",
          height: "auto",
        }}
      />
    </div>

    <div className="container py-3">

      <div className="text-center mb-4">

        <div className="text-uppercase text-primary fw-bold small mb-2">
          LIVE RESULTS
        </div>

        <h1
          className="fw-bold mb-2"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)" }}
        >
          {event.name}
        </h1>

        <div
  className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-3 mb-3"
>

  <div className="text-muted">
    📅 {new Date(event.eventDate).toLocaleDateString("en-GB")}
  </div>

  <div className="text-muted">
    📍 {event.location || "Location TBC"}
  </div>

  <span className="badge bg-success fs-6 px-3 py-2">
    ● LIVE
  </span>

</div>



      </div>

      <LeaderboardTab eventId={event.id} />

    </div>
  </>
);
}