import { useEffect, useState } from "react";
import { getParticipants, createParticipant } from "../api/participants";
import { schoolYearLabels } from "../utils/schoolYears";

export default function ParticipantsTab({ eventId, onParticipantsChanged }) {
  const [participants, setParticipants] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [schoolYear, setSchoolYear] = useState("YEAR4");

  useEffect(() => {
    loadParticipants();
  }, [eventId]);

  async function loadParticipants() {
    const data = await getParticipants(eventId);
    setParticipants(data);
  }

  async function handleCreateParticipant(e) {
    e.preventDefault();

    if (!firstName || !surname) {
      alert("Please enter first name and surname.");
      return;
    }

    await createParticipant(eventId, {
      firstName,
      surname,
      schoolYear,
    });

    setFirstName("");
    setSurname("");
    setSchoolYear("YEAR4");

    await loadParticipants();

    if (onParticipantsChanged) {
      onParticipantsChanged();
    }
  }

  return (
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
            {Object.entries(schoolYearLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100" type="submit">
            Add New Participant
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
              <th>Assigned Number</th>
              <th>Name</th>
              <th>School Year</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td>{String(participant.entryNumber).padStart(3, "0")}</td>
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
  );
}