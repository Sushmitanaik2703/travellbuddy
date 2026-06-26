import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <h2>🌍 Travel Buddy Finder</h2>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <div className="hero">
        <h1>Explore the World Together ✈️</h1>

        <p>
          Find travel companions, discover exciting destinations,
          and create unforgettable memories.
        </p>

        <Link to="/register">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;