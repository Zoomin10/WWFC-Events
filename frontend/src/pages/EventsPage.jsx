import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, createEvent, activateEvent } from "../api/events";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function handleActivateEvent(id) {
  await activateEvent(id);
  await loadEvents();
}

  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

 async function handleCreateEvent(e) {
  e.preventDefault();

  if (!name || !eventDate) {
    alert("Please enter an event name and date.");
    return;
  }

  await createEvent({
    name,
    location,
    eventDate: new Date(eventDate).toISOString(),
  });

  setName("");
  setLocation("");
  setEventDate("");

  await loadEvents();
}
  return (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h1 className="display-4 fw-bold">WWFC Events</h1>
      <p className="lead text-muted">Event Management System</p>
    </div>

    <div className="card shadow-sm mb-5">
      <div className="card-header fw-bold">Create New Event</div>

      <div className="card-body">
        <form onSubmit={handleCreateEvent}>
          <div className="mb-3">
            <label className="form-label">Event Name</label>
            <input
              className="form-control"
              placeholder="Summer Fete 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              className="form-control"
              placeholder="The Weir Field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Event Date</label>
            <input
              className="form-control"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>

    <h2 className="mb-3">Events</h2>

{events.length === 0 ? (
  <div className="alert alert-secondary">
    No events have been created yet.
  </div>
) : (
  <div className="row g-3">
    {events.map((event) => (
      <div className="col-md-6" key={event.id}>
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 className="card-title mb-1">{event.name}</h5>
                <div className="text-muted small">
                  📅 {new Date(event.eventDate).toLocaleDateString("en-GB")}
                </div>
              </div>

              {event.isActive ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-secondary">Inactive</span>
              )}
            </div>

            <p className="mb-3">
              📍 {event.location || "No location"}
            </p>

            <div className="row text-center border rounded py-3 mb-3">
              <div className="col">
                <h5 className="mb-0">0</h5>
                <small className="text-muted">Participants</small>
              </div>

              <div className="col">
                <h5 className="mb-0">0</h5>
                <small className="text-muted">Challenges</small>
              </div>

              <div className="col">
                <h5 className="mb-0">0</h5>
                <small className="text-muted">Results</small>
              </div>
            </div>

            <div className="d-flex gap-2">
              {!event.isActive && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleActivateEvent(event.id)}
                >
                  Make Active
                </button>
              )}

              <Link
  className="btn btn-primary btn-sm"
  to={`/events/${event.id}`}
>
  Manage
</Link>

              <button className="btn btn-outline-secondary btn-sm" disabled>
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
 
  </div>
);
}