import { useEffect, useState } from "react";
import { getResults } from "../api/results";
import { getChallenges } from "../api/challenges";
import { ageGroups, getAgeGroupForSchoolYear } from "../utils/ageGroups";



function getRankForResult(results, index) {
  if (index === 0) return 1;

  const previousResult = results[index - 1];
  const currentResult = results[index];

  if (currentResult.score === previousResult.score) {
    return getRankForResult(results, index - 1);
  }

  return index + 1;
}



export default function LeaderboardTab({ eventId }) {
  const [results, setResults] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const resultData = await getResults(eventId);
    const challengeData = await getChallenges(eventId);

    setResults(resultData);
    setChallenges(challengeData);
      setLoading(false);
  }
if (loading) {
  return null;
}

  function getRankedResults(challenge, ageGroup) {
    const matchingResults = results.filter((result) => {
      const resultAgeGroup = getAgeGroupForSchoolYear(
        result.participant.schoolYear
      );

      return (
        result.challengeId === challenge.id &&
        resultAgeGroup?.key === ageGroup.key
      );
    });

    const bestByParticipant = new Map();

    matchingResults.forEach((result) => {
      const participantId = result.participant.id;
      const existing = bestByParticipant.get(participantId);

      if (!existing) {
        bestByParticipant.set(participantId, {
          ...result,
          attemptCount: 1,
        });
        return;
      }

      existing.attemptCount += 1;

      const isBetter =
        challenge.scoringMethod === "LOWEST"
          ? result.score < existing.score
          : result.score > existing.score;

      if (isBetter) {
        bestByParticipant.set(participantId, {
          ...result,
          attemptCount: existing.attemptCount,
        });
      }
    });

    return Array.from(bestByParticipant.values()).sort((a, b) => {
      if (challenge.scoringMethod === "LOWEST") {
        return a.score - b.score;
      }

      return b.score - a.score;
    });
  }

  return (
  <div>
    <div className="text-center mb-4">
  <h2 className="fw-bold mb-1">Live Leaderboard</h2>

  <p className="text-muted small mb-0">
    Updated automatically throughout the event.
  </p>
</div>

    {challenges.length === 0 ? (
      <div className="text-center text-muted py-4">
        No leaderboard results are available yet.
      </div>
    ) : (
      challenges.map((challenge) => (
        <div className="card shadow mb-5 border-0" key={challenge.id}>
          <div
            className="card-header text-center text-white py-3"
            style={{
              background: "linear-gradient(135deg, #0057B8, #007BFF)",
            }}
          >
            <h4 className="mb-1 fw-bold">{challenge.name}</h4>

            <small className="text-white-50">
              {challenge.scoringMethod === "LOWEST"
                ? "Lowest score wins"
                : "Highest score wins"}{" "}
              • {challenge.unit}
            </small>
          </div>

          <div className="card-body bg-white">
            <div className="row g-4">
              {ageGroups.map((ageGroup) => {
                const rankedResults = getRankedResults(challenge, ageGroup);
                const topResults = rankedResults.slice(0, 3);

                return (
                  <div className="col-md-4" key={ageGroup.key}>
                    <div className="border rounded-3 p-3 h-100 bg-light">
                      <h6
                        className="fw-bold text-center text-white rounded py-2 mb-3"
                        style={{ backgroundColor: "#6c757d" }}
                      >
                        {ageGroup.label}
                      </h6>

                      {topResults.length === 0 ? (
                        <p className="text-muted small mb-0 text-center">
                          No results yet.
                        </p>
                      ) : (
                        <div className="d-grid gap-3">
                          {topResults.map((result, index) => (
                            <div
                              className="border rounded-3 p-3 bg-white shadow-sm"
                              key={result.id}
                            >
                              <div className="d-flex justify-content-between align-items-center gap-3">
                                <div className="d-flex align-items-center gap-2">
                                  <span
                                    className={`badge rounded-pill ${
                                      index === 0
                                        ? "bg-success"
                                        : index === 1
                                        ? "bg-primary"
                                        : "bg-secondary"
                                    }`}
                                    style={{
                                      minWidth: "36px",
                                      height: "36px",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    {getRankForResult(topResults, index)}
                                  </span>

                                  <strong>
                                    {result.participant.firstName}{" "}
                                    {result.participant.surname}
                                  </strong>
                                </div>

                                <span
                                  className="fw-bold text-primary text-nowrap"
                                  style={{ fontSize: "1.25rem" }}
                                >
                                  {result.score}{" "}
                                  <small>{challenge.unit}</small>
                                </span>
                              </div>

                            
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}