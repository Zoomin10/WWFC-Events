import { useEffect, useState } from "react";
import {
  getChallenges,
  createChallenge,
   updateChallenge,
  deleteChallenge,
} from "../api/challenges";

export default function ChallengesTab({ eventId }) {
  const [challenges, setChallenges] = useState([]);
const [editingChallenge, setEditingChallenge] = useState(null);
  const [name, setName] = useState("");
  const [scoringMethod, setScoringMethod] = useState("HIGHEST");
  const [unit, setUnit] = useState("Points");

  useEffect(() => {
    loadChallenges();
  }, [eventId]);

  async function loadChallenges() {
    const data = await getChallenges(eventId);
    setChallenges(data);
  }

  async function handleCreateChallenge(e) {
    e.preventDefault();

    if (!name) {
      alert("Please enter a challenge name.");
      return;
    }

    await createChallenge(eventId, {
      name,
      scoringMethod,
      unit,
    });

    setName("");
    setScoringMethod("HIGHEST");
    setUnit("Points");

    await loadChallenges();
  }
  async function handleUpdateChallenge(e) {
  e.preventDefault();

  await updateChallenge(eventId, editingChallenge.id, {
    name: editingChallenge.name,
    scoringMethod: editingChallenge.scoringMethod,
    unit: editingChallenge.unit,
  });

  setEditingChallenge(null);
  await loadChallenges();
}

async function handleDeleteChallenge(challengeId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this challenge? This will also delete related attempts."
  );

  if (!confirmed) return;

  await deleteChallenge(eventId, challengeId);
  await loadChallenges();
}

  return (
  <div>
    <h5>Challenges</h5>

    <form className="row g-2 mb-4" onSubmit={handleCreateChallenge}>
      <div className="col-md-4">
        <input
          className="form-control"
          placeholder="Challenge Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={scoringMethod}
          onChange={(e) => setScoringMethod(e.target.value)}
        >
          <option value="HIGHEST">Highest Score Wins</option>
          <option value="LOWEST">Lowest Score Wins</option>
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option>Points</option>
          <option>Goals</option>
          <option>Seconds</option>
          <option>Metres</option>
          <option>Centimetres</option>
          <option>Repetitions</option>
        </select>
      </div>

      <div className="col-md-2">
        <button className="btn btn-primary w-100" type="submit">
          Add
        </button>
      </div>
    </form>

    {challenges.length === 0 ? (
      <div className="alert alert-secondary">
        No challenges have been configured yet.
      </div>
    ) : (
      <table className="table table-sm align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Scoring</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id}>
              <td>{challenge.name}</td>

              <td>
                {challenge.scoringMethod === "HIGHEST"
                  ? "Highest Score Wins"
                  : "Lowest Score Wins"}
              </td>

              <td>{challenge.unit}</td>

              <td>
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => setEditingChallenge(challenge)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteChallenge(challenge.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {editingChallenge && (
      <div className="card shadow-sm mt-4">
        <div className="card-header fw-bold">Edit Challenge</div>

        <div className="card-body">
          <form onSubmit={handleUpdateChallenge}>
            <div className="mb-3">
              <label className="form-label">Challenge Name</label>
              <input
                className="form-control"
                value={editingChallenge.name}
                onChange={(e) =>
                  setEditingChallenge({
                    ...editingChallenge,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Scoring Method</label>
              <select
                className="form-select"
                value={editingChallenge.scoringMethod}
                onChange={(e) =>
                  setEditingChallenge({
                    ...editingChallenge,
                    scoringMethod: e.target.value,
                  })
                }
              >
                <option value="HIGHEST">Highest Score Wins</option>
                <option value="LOWEST">Lowest Score Wins</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Unit</label>
              <select
                className="form-select"
                value={editingChallenge.unit}
                onChange={(e) =>
                  setEditingChallenge({
                    ...editingChallenge,
                    unit: e.target.value,
                  })
                }
              >
                <option>Points</option>
                <option>Goals</option>
                <option>Seconds</option>
                <option>Metres</option>
                <option>Centimetres</option>
                <option>Repetitions</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setEditingChallenge(null)}
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