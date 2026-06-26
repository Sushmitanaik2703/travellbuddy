const Trip = require("../models/Trip");

exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};