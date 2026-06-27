import { useEffect, useState } from "react";
import { getResults } from "../api/results";
import { getChallenges } from "../api/challenges";
import { ageGroups, getAgeGroupForSchoolYear } from "../utils/ageGroups";

export default function LeaderboardTab({ eventId }) {
  const [results, setResults] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const resultData = await getResults(eventId);
    const challengeData = await getChallenges(eventId);

    setResults(resultData);
    setChallenges(challengeData);
  }

function getResultsForChallengeAndAgeGroup(challenge, ageGroup) {
  const matchingResults = results.filter((result) => {
    const resultAgeGroup = getAgeGroupForSchoolYear(
      result.participant.schoolYear
    );

    return (
      result.challengeId === challenge.id &&
      resultAgeGroup?.key === ageGroup.key
    );
  });

  const bestResultByParticipant = new Map();

  matchingResults.forEach((result) => {
    const participantId = result.participant.id;
    const existing = bestResultByParticipant.get(participantId);

    if (!existing) {
      bestResultByParticipant.set(participantId, result);
      return;
    }

    if (challenge.scoringMethod === "LOWEST") {
      if (result.score < existing.score) {
        bestResultByParticipant.set(participantId, result);
      }
    } else {
      if (result.score > existing.score) {
        bestResultByParticipant.set(participantId, result);
      }
    }
  });

  return Array.from(bestResultByParticipant.values()).sort((a, b) => {
    if (challenge.scoringMethod === "LOWEST") {
      return a.score - b.score;
    }

    return b.score - a.score;
  });
}

  return (
    <div>
      <h5>Leaderboard</h5>

      {challenges.length === 0 ? (
        <div className="alert alert-warning">
          Add challenges before viewing the leaderboard.
        </div>
      ) : (
        challenges.map((challenge) => (
          <div className="card mb-4" key={challenge.id}>
            <div className="card-header fw-bold">
              {challenge.name}
            </div>

            <div className="card-body">
              {ageGroups.map((ageGroup) => {
                const rankedResults = getResultsForChallengeAndAgeGroup(
                  challenge,
                  ageGroup
                );

                return (
                  <div className="mb-4" key={ageGroup.key}>
                    <h6>{ageGroup.label}</h6>

                    {rankedResults.length === 0 ? (
                      <p className="text-muted mb-0">
                        No results yet.
                      </p>
                    ) : (
                      <table className="table table-sm align-middle">
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Entry</th>
                            <th>Name</th>
                            <th>Score</th>
                          </tr>
                        </thead>

                        <tbody>
                          {rankedResults.map((result, index) => (
                            <tr key={result.id}>
                              <td>{index + 1}</td>
                              <td>
                                {String(
                                  result.participant.entryNumber
                                ).padStart(3, "0")}
                              </td>
                              <td>
                                {result.participant.firstName}{" "}
                                {result.participant.surname}
                              </td>
                              <td>
                                {result.score} {challenge.unit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}