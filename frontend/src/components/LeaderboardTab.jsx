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

function getRankDisplay(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `${rank}.`;
}

export default function LeaderboardTab({ eventId }) {
  const [results, setResults] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const resultData = await getResults(eventId);
    const challengeData = await getChallenges(eventId);
const [loading, setLoading] = useState(true);
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
        <h2 className="fw-bold mb-2">Leaderboard</h2>

        <p className="text-muted mb-0">
          Awards are calculated per challenge and age group using each
          participant&apos;s best attempt.
        </p>
      </div>

      {challenges.length === 0 ? (
        <div className="alert alert-warning">
             No leaderboard results are available yet.
        </div>
      ) : (
        challenges.map((challenge) => (
          <div className="card shadow-sm mb-4" key={challenge.id}>
            <div className="card-header text-center">
              <h5 className="mb-0">{challenge.name}</h5>
              <small className="text-muted">
                {challenge.scoringMethod === "LOWEST"
                  ? "Lowest score wins"
                  : "Highest score wins"}{" "}
                · {challenge.unit}
              </small>
            </div>

            <div className="card-body">
              <div className="row g-3">
                {ageGroups.map((ageGroup) => {
                  const rankedResults = getRankedResults(challenge, ageGroup);
                  const topResults = rankedResults.slice(0, 3);

                  return (
                    <div className="col-md-4" key={ageGroup.key}>
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold text-center">
                          {ageGroup.label}
                        </h6>

                        {topResults.length === 0 ? (
                          <p className="text-muted small mb-0 text-center">
                            No results yet.
                          </p>
                        ) : (
                          <div className="d-grid gap-2">
                            {topResults.map((result, index) => (
                              <div
                                className="border rounded p-2 bg-light"
                                key={result.id}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong>
                                   {getRankDisplay(getRankForResult(topResults, index))}{" "}
                                    {result.participant.firstName}{" "}
                                    {result.participant.surname}
                                  </strong>

                                  <span className="fw-bold">
                                    {result.score} {challenge.unit}
                                  </span>
                                </div>

                                <div className="text-muted small mt-1">
                                  Best of {result.attemptCount} attempt
                                  {result.attemptCount === 1 ? "" : "s"}
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
