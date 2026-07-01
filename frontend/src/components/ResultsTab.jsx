import { useEffect, useState } from "react";
import { getChallenges } from "../api/challenges";
import {
  getResults,
  createResult,
  updateResult,
  deleteResult,
} from "../api/results";
import { getParticipants } from "../api/participants";
export default function ResultsTab({ eventId }) {
  const [challenges, setChallenges] = useState([]);
  const [results, setResults] = useState([]);
const [editingResult, setEditingResult] = useState(null);
  const [challengeId, setChallengeId] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [score, setScore] = useState("");
  const [participants, setParticipants] = useState([]);
const [participantSearch, setParticipantSearch] = useState("");
const [selectedParticipant, setSelectedParticipant] = useState(null);

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const challengeData = await getChallenges(eventId);
    const resultData = await getResults(eventId);
    const participantData = await getParticipants(eventId);
    setChallenges(challengeData);
    setResults(resultData);
    setParticipants(participantData);

    if (challengeData.length > 0 && !challengeId) {
      setChallengeId(challengeData[0].id);
    }
  }
const search = participantSearch.trim().toLowerCase();

const filteredParticipants = participants
  .filter((participant) => {
    if (!search) return false;

    const surnameMatch = participant.surname
      .toLowerCase()
      .startsWith(search);

    const entryMatch = participant.entryNumber
      .toString()
      .startsWith(search);

    return surnameMatch || entryMatch;
  })
  .sort((a, b) => {
    const surnameCompare = a.surname.localeCompare(b.surname);
    if (surnameCompare !== 0) return surnameCompare;
    return a.firstName.localeCompare(b.firstName);
  });

async function handleUpdateResult(e) {
  e.preventDefault();

await updateResult(eventId, editingResult.id, Number(editingResult.score)
  );

  setEditingResult(null);
 await loadData();
}

async function handleDeleteResult(id) {
  const confirmed = window.confirm(
    "Delete this attempt?"
  );

  if (!confirmed) return;

  await deleteResult(eventId, id);
await loadData();
}

  async function handleCreateResult(e) {
    e.preventDefault();

if (!challengeId || !selectedParticipant || !score) {
  alert("Please select a challenge, participant and score.");
  return;
}

await createResult(eventId, {
  challengeId,
  participantId: selectedParticipant.id,
  score,
});

setParticipantSearch("");
setSelectedParticipant(null);
    setScore("");

    await loadData();
  }

 return (
  <div>
    <h5 className="mb-4">Results</h5>

    {challenges.length === 0 ? (
      <div className="alert alert-warning">
        Add at least one challenge before entering results.
      </div>
    ) : (
      <form className="row g-2 mb-5" onSubmit={handleCreateResult}>
        <div className="col-md-4">
          <select
            className="form-select"
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
          >
            {challenges.map((challenge) => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
         <div className="position-relative">
  <input
    className="form-control"
    placeholder="Search participant..."
    value={participantSearch}
    onChange={(e) => {
      setParticipantSearch(e.target.value);
      setSelectedParticipant(null);
    }}
  />

  {participantSearch && !selectedParticipant && (
    <div
      className="list-group position-absolute w-100"
      style={{
        zIndex: 1000,
        maxHeight: "220px",
        overflowY: "auto",
      }}
    >
      {filteredParticipants.map((participant) => (
        <button
          key={participant.id}
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => {
            setSelectedParticipant(participant);
            setParticipantSearch(
              `${participant.entryNumber.toString().padStart(3, "0")} - ${participant.firstName} ${participant.surname}`
            );
          }}
        >
          <strong>
            {participant.entryNumber.toString().padStart(3, "0")}
          </strong>{" "}
          {participant.firstName} {participant.surname}
          <div className="small text-muted">
            {participant.schoolYear}
          </div>
        </button>
      ))}
    </div>
  )}
</div>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Save Result
          </button>
        </div>
      </form>
    )}

    <h6 className="mb-3">Recent Attempts</h6>

    {results.length === 0 ? (
      <div className="alert alert-secondary">
        No attempts entered yet.
      </div>
    ) : (
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Entry</th>
            <th>Participant</th>
            <th>Challenge</th>
            <th>Score</th>
            <th width="170">Actions</th>
          </tr>
        </thead>

        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>
                {String(result.participant.entryNumber).padStart(3, "0")}
              </td>

              <td>
                {result.participant.firstName}{" "}
                {result.participant.surname}
              </td>

              <td>{result.challenge.name}</td>

              <td>
                <strong>
                  {result.score} {result.challenge.unit}
                </strong>
              </td>

              <td>
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => setEditingResult(result)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteResult(result.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {editingResult && (
      <div className="card shadow-sm mt-5">
        <div className="card-header fw-bold">
          Edit Result
        </div>

        <div className="card-body">
          <form onSubmit={handleUpdateResult}>
            <div className="mb-3">
              <label className="form-label">Participant</label>
              <input
                className="form-control"
                value={`${editingResult.participant.firstName} ${editingResult.participant.surname}`}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Challenge</label>
              <input
                className="form-control"
                value={editingResult.challenge.name}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Score ({editingResult.challenge.unit})
              </label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                value={editingResult.score}
                onChange={(e) =>
                  setEditingResult({
                    ...editingResult,
                    score: e.target.value,
                  })
                }
              />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setEditingResult(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}