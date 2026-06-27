import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api/events";

export default function ManageEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      const data = await getEvent(id);
      setEvent(data);
    }

    loadEvent();
  }, [id]);

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

      <div className="row g-3">
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
              <h3>0</h3>
              <p className="text-muted mb-0">Results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}