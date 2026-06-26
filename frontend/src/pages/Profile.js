import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>👤 My Profile</h1>

      <div
        style={{
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <p><strong>Bio:</strong> {user.bio || "No bio added yet."}</p>

        <p><strong>Interests:</strong> {user.interests?.join(", ") || "Not specified"}</p>
      </div>
    </div>
  );
}

export default Profile;