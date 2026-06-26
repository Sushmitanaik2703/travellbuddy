import { useEffect, useState } from "react";
import API from "../services/api";
import "./ExploreTrips.css";

function ExploreTrips() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await API.get("/trips/all");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load trips.");
    }
  };

  const sendRequest = async (trip) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }
console.log(trip);
      await API.post("/requests/send", {
        fromUser: user._id,
        toUser: trip.userId,
        tripId: trip._id,
      });

      alert("🎉 Travel request sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request.");
    }
  };

  const filteredTrips = trips.filter((trip) =>
    trip.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore-container">
      <h1>🌍 Explore Trips</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTrips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="trip-grid">
          {filteredTrips.map((trip) => (
            <div className="trip-card" key={trip._id}>
              <h2>📍 {trip.destination}</h2>
              <img
  src={`https://picsum.photos/seed/${encodeURIComponent(
    trip.destination
  )}/600/300`}
  alt={trip.destination}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  }}
/>

              <p>
                <strong>📅 Dates:</strong> {trip.startDate} → {trip.endDate}
              </p>

              <p>
                <strong>💰 Budget:</strong>{" "}
                {trip.budget || "Not specified"}
              </p>

              <p>
                <strong>👥 Travelers Needed:</strong>{" "}
                {trip.travelersNeeded || "Not specified"}
              </p>

              <p>
                <strong>📝 Description:</strong>{" "}
                {trip.description || "No description provided"}
              </p>
              <iframe
  title={trip.destination}
  width="100%"
  height="220"
  style={{
    border: 0,
    borderRadius: "10px",
    marginTop: "10px",
  }}
  loading="lazy"
  allowFullScreen
  src={`https://www.google.com/maps?q=${encodeURIComponent(
    trip.destination
  )}&output=embed`}
/>
<a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    trip.destination
  )}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button style={{ marginBottom: "10px" }}>
    📍 Open in Google Maps
  </button>
</a>
             {user?._id !== (trip.userId?._id || trip.userId) && (
  <button onClick={() => sendRequest(trip)}>
    🤝 Request to Join
  </button>
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreTrips;