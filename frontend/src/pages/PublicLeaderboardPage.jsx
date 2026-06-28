import { useParams, Link } from "react-router-dom";
import LeaderboardTab from "../components/LeaderboardTab";

export default function PublicLeaderboardPage() {
  const { id } = useParams();

  return (
    <div className="container py-3">
      <div className="text-center mb-3">
        <h1 className="h3 fw-bold">WWFC Leaderboard</h1>
        <p className="text-muted mb-0">Live challenge standings</p>
      </div>

      <LeaderboardTab eventId={id} />

      <div className="text-center mt-4">
        <Link to={`/events/${id}`} className="btn btn-outline-secondary btn-sm">
          Back to Event
        </Link>
      </div>
    </div>
  );
}
