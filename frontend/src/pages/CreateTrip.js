import { useState } from "react";
import API from "../services/api";

function CreateTrip() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelersNeeded: "",
    description: "",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  const tripData = {
    ...trip,
    userId: user._id,
  };

  await API.post("/trips/create", tripData);

  alert("Trip created successfully!");
};
setTrip({
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  travelersNeeded: "",
  description: "",
});

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Trip</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={trip.budget}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="travelersNeeded"
          placeholder="Travelers Needed"
          value={trip.travelersNeeded}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Trip Description"
          value={trip.description}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}

export default CreateTrip;