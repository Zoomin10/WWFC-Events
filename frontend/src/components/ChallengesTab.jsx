import { useEffect, useState } from "react";
import {
  getChallenges,
  createChallenge,
} from "../api/challenges";

export default function ChallengesTab({ eventId }) {
  const [challenges, setChallenges] = useState([]);

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

  return (
    <div>
      <h5>Challenges</h5>

      <form
        className="row g-2 mb-4"
        onSubmit={handleCreateChallenge}
      >
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
            <option value="HIGHEST">
              Highest Score Wins
            </option>

            <option value="LOWEST">
              Lowest Score Wins
            </option>
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
          <button
            className="btn btn-primary w-100"
            type="submit"
          >
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}