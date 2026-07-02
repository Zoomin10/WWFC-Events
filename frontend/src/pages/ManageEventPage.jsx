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
 const [activeTab, setActiveTab] = useState("participants");

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
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h1 className="page-title mb-2">{event.name}</h1>

      
      </div>

      <span
        className={`badge fs-6 px-3 py-2 ${
          event.isActive ? "bg-success" : "bg-secondary"
        }`}
      >
        {event.isActive ? "Active" : "Inactive"}
      </span>
    </div>

    <ul className="nav nav-tabs event-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "participants" ? "active" : ""}`}
          onClick={() => setActiveTab("participants")}
        >
   
          Participants
        </button>
      </li>

      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "challenges" ? "active" : ""}`}
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
          className={`nav-link ${activeTab === "leaderboard" ? "active" : ""}`}
          onClick={() => setActiveTab("leaderboard")}
        >
         
          Leaderboard
        </button>
      </li>
    </ul>

    <div className="stats-panel mb-3">
      <div className="row g-3">
        <div className="col-md-4">
         <div className="card stat-card text-center shadow-sm">
            <div className="card-body py-2">
              <i className="bi bi-people-fill text-primary fs-5"></i>

              <h5 className="fw-bold text-primary my-0">
                {event.participants?.length ?? 0}
              </h5>

              <p className="small text-muted mb-0">Participants</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
         <div className="card stat-card text-center shadow-sm">
            <div className="card-body py-2">
              <i className="bi bi-trophy-fill text-primary fs-5"></i>

            <h5 className="fw-bold text-primary my-0">
                {event.challenges?.length ?? 0}
              </h5>

              <p className="small text-muted mb-0">Challenges</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card stat-card text-center shadow-sm">
            <div className="card-body py-2">
              <i className="bi bi-bar-chart-fill text-primary fs-5"></i>

           <h5 className="fw-bold text-primary my-0">
                {event.participants?.reduce(
                  (total, participant) =>
                    total + (participant.results?.length ?? 0),
                  0
                ) ?? 0}
              </h5>

              <p className="small text-muted mb-0">Results Submitted</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="card shadow-sm">
      <div className="card-body">
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