import { useEffect, useState } from "react";
import { getChallenges } from "../api/challenges";
import { getResults, createResult } from "../api/results";

export default function ResultsTab({ eventId }) {
  const [challenges, setChallenges] = useState([]);
  const [results, setResults] = useState([]);

  const [challengeId, setChallengeId] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const challengeData = await getChallenges(eventId);
    const resultData = await getResults(eventId);

    setChallenges(challengeData);
    setResults(resultData);

    if (challengeData.length > 0 && !challengeId) {
      setChallengeId(challengeData[0].id);
    }
  }

  async function handleCreateResult(e) {
    e.preventDefault();

    if (!challengeId || !entryNumber || !score) {
      alert("Please select a challenge, enter an entry number and score.");
      return;
    }

    await createResult(eventId, {
      challengeId,
      entryNumber,
      score,
    });

    setEntryNumber("");
    setScore("");

    await loadData();
  }

  return (
    <div>
      <h5>Results</h5>

      {challenges.length === 0 ? (
        <div className="alert alert-warning">
          Add at least one challenge before entering results.
        </div>
      ) : (
        <form className="row g-2 mb-4" onSubmit={handleCreateResult}>
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
            <input
              className="form-control"
              placeholder="Entry number"
              value={entryNumber}
              onChange={(e) => setEntryNumber(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Save
            </button>
          </div>
        </form>
      )}

      <h6>Recent Attempts</h6>

      {results.length === 0 ? (
        <div className="alert alert-secondary">
          No attempts entered yet.
        </div>
      ) : (
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Participant</th>
              <th>Challenge</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  {String(result.participant.entryNumber).padStart(3, "0")}
                </td>

                <td>
                  {result.participant.firstName} {result.participant.surname}
                </td>

                <td>{result.challenge.name}</td>

                <td>
                  {result.score} {result.challenge.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}