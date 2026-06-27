import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api/events";
import { getParticipants, createParticipant } from "../api/participants";
import { schoolYearLabels } from "../utils/schoolYears";

export default function ManageEventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [participants, setParticipants] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [schoolYear, setSchoolYear] = useState("YEAR4");

  useEffect(() => {
    loadEvent();
  }, [id]);

  async function loadEvent() {
    const eventData = await getEvent(id);
    const participantData = await getParticipants(id);

    setEvent(eventData);
    setParticipants(participantData);
  }

  async function handleCreateParticipant(e) {
    e.preventDefault();

    if (!firstName || !surname) {
      alert("Please enter first name and surname.");
      return;
    }

    await createParticipant(id, {
      firstName,
      surname,
      schoolYear,
    });

    setFirstName("");
    setSurname("");
    setSchoolYear("YEAR4");

    await loadEvent();
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
              <h3>{participants.length}</h3>
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
            <div>
              <h5>Participants</h5>

              <form className="row g-2 mb-4" onSubmit={handleCreateParticipant}>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={schoolYear}
                    onChange={(e) => setSchoolYear(e.target.value)}
                  >
                    <option value="RECEPTION">Reception</option>
                    <option value="YEAR1">Year 1</option>
                    <option value="YEAR2">Year 2</option>
                    <option value="YEAR3">Year 3</option>
                    <option value="YEAR4">Year 4</option>
                    <option value="YEAR5">Year 5</option>
                    <option value="YEAR6">Year 6</option>
                    <option value="YEAR7">Year 7</option>
                    <option value="YEAR8">Year 8</option>
                    <option value="YEAR9">Year 9</option>
                    <option value="YEAR10">Year 10</option>
                    <option value="YEAR11">Year 11</option>
                    <option value="YEAR12">Year 12</option>
                    <option value="YEAR13">Year 13</option>
                    <option value="ADULT">Adult</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <button className="btn btn-primary w-100" type="submit">
                    Add Participant
                  </button>
                </div>
              </form>

              {participants.length === 0 ? (
                <div className="alert alert-secondary">
                  No participants registered yet.
                </div>
              ) : (
                <table className="table table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Entry</th>
                      <th>Name</th>
                      <th>School Year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {participants.map((participant) => (
                      <tr key={participant.id}>
                        <td>
                          {String(participant.entryNumber).padStart(3, "0")}
                        </td>
                        <td>
                          {participant.firstName} {participant.surname}
                        </td>
                        <td>{schoolYearLabels[participant.schoolYear]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === "challenges" && (
            <div>
              <h5>Challenges</h5>
              <p className="text-muted mb-0">
                Challenge setup will appear here.
              </p>
            </div>
          )}

          {activeTab === "results" && (
            <div>
              <h5>Results</h5>
              <p className="text-muted mb-0">Score entry will appear here.</p>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h5>Leaderboard</h5>
              <p className="text-muted mb-0">
                Live leaderboard will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}