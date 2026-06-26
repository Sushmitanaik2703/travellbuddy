const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// Send request
router.post("/send", async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get requests for a user
router.get("/:userId", async (req, res) => {
  try {
    const requests = await Request.find({
      toUser: req.params.userId,
    })
      .populate("fromUser", "name email")
      .populate("toUser", "name email")
      .populate("tripId", "destination");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept request
router.put("/accept/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );

  res.json(updated);
});

// Reject request
router.put("/reject/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;