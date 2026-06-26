import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <h2>🌍 Travel Buddy Finder</h2>

        <div>
          <Link to="/create-trip">Create Trip</Link>
          <Link to="/explore">Explore Trips</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/my-trips">My Trips</Link>
          <Link to="/my-requests">My Requests</Link>
          <Link to="/chat">Chat</Link>

          <button
            onClick={handleLogout}
            style={{ marginLeft: "15px" }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      <div className="welcome-card">
        <h1>Welcome, {user?.name || "Traveler"} ✈️</h1>

        <p>
          Discover amazing destinations and connect with like-minded travel
          companions.
        </p>

        <div className="card-buttons">
          <Link to="/create-trip">
            <button>Create a Trip</button>
          </Link>

          <Link to="/explore">
            <button>Explore Trips</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;