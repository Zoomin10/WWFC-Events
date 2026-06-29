import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api/events";
import ParticipantsTab from "../components/ParticipantsTab";
import ChallengesTab from "../components/ChallengesTab";
import ResultsTab from "../components/ResultsTab";
import LeaderboardTab from "../components/LeaderboardTab";

export default function ManageEventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadEvent();
  }, [id]);

  async function loadEvent() {
    const eventData = await getEvent(id);
    setEvent(eventData);
  }

  if (!event) {
    return <p>Loading event...</p>;
  }

  return (
    <div>
      <Link to="/events" className="btn btn-outline-secondary btn-sm mb-3">
        ← Back to Events
      </Link>

      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1>{event.name}</h1>
          <Link
  to={`/events/${id}/leaderboard`}
  className="btn btn-outline-primary btn-sm mt-2"
>
  Public Leaderboard
</Link>
          <p className="text-muted mb-0">
            📍 {event.location || "No location"} · 📅{" "}
            {new Date(event.eventDate).toLocaleDateString("en-GB")}
          </p>
        </div>

        {event.isActive ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-secondary">Inactive</span>
        )}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h3>{event.participants.length}</h3>
              <p className="text-muted mb-0">Participants</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h3>{event.challenges.length}</h3>
              <p className="text-muted mb-0">Challenges</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
             <h3>
  {event.participants?.reduce(
    (total, participant) => total + (participant.results?.length ?? 0),
    0
  ) ?? 0}
</h3>
<p className="text-muted mb-0">Results</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "participants" ? "active" : ""
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "challenges" ? "active" : ""
            }`}
            onClick={() => setActiveTab("challenges")}
          >
            Challenges
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            Results
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "leaderboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
        </li>
      </ul>

      <div className="card shadow-sm border-top-0 rounded-top-0">
        <div className="card-body">
          {activeTab === "overview" && (
            <div>
              <h5>Overview</h5>
              <p className="text-muted mb-0">
                Event summary and setup information will appear here.
              </p>
            </div>
          )}

          {activeTab === "participants" && (
            <ParticipantsTab eventId={id} onParticipantsChanged={loadEvent} />
          )}

          {activeTab === "challenges" && <ChallengesTab eventId={id} />}

          {activeTab === "results" && <ResultsTab eventId={id} />}

          {activeTab === "leaderboard" && <LeaderboardTab eventId={id} />}
        </div>
      </div>
    </div>
  );
}