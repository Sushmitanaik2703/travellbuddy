import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/requests/${user._id}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load requests");
    }
  };

  const acceptRequest = async (id) => {
    try {
      await API.put(`/requests/accept/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.put(`/requests/reject/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📬 My Travel Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>Trip: {req.tripId?.destination}</h3>
            <p>
              <strong>From:</strong> {req.fromUser?.name}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>

            {req.status === "pending" && (
              <>
                <button onClick={() => acceptRequest(req._id)}>
                  ✅ Accept
                </button>

                <button
                  onClick={() => rejectRequest(req._id)}
                  style={{ marginLeft: "10px" }}
                >
                  ❌ Reject
                </button>
              </>
            )}
            {req.status === "accepted" && (
  <button
    onClick={() => navigate(`/chat?receiver=${req.fromUser._id}`)}
    style={{ marginTop: "10px" }}
  >
    💬 Chat
  </button>
)}
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;