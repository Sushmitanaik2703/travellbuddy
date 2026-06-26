import { useEffect, useState } from "react";
import API from "../services/api";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const res = await API.get(`/trips/my/${user._id}`);
        setTrips(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load your trips");
      }
    };

    if (user?._id) {
      fetchMyTrips();
    }
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8fb",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#0077b6",
        }}
      >
        ✈️ My Trips
      </h1>

      {trips.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          You haven't created any trips yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {trips.map((trip) => (
            <div
              key={trip._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ color: "#023e8a" }}>
                📍 {trip.destination}
              </h2>

              <p>
                <strong>📅 Dates:</strong> {trip.startDate} → {trip.endDate}
              </p>

              <p>
                <strong>💰 Budget:</strong> {trip.budget || "Not specified"}
              </p>

              <p>
                <strong>👥 Travelers Needed:</strong>{" "}
                {trip.travelersNeeded || "Not specified"}
              </p>

              <p>
                <strong>📝 Description:</strong>{" "}
                {trip.description || "No description"}
              </p>

              {trip.interests && trip.interests.length > 0 && (
                <p>
                  <strong>🎯 Interests:</strong>{" "}
                  {trip.interests.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;