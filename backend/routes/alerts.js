

const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const Log = require("../models/Log");

// ✅ GET all alerts (optionally only active)
router.get("/", async (req, res) => {
  try {
    const { active } = req.query;
    const query = active === "true" ? { acknowledged: false } : {};
    const alerts = await Alert.find(query)
      .populate("pipeline")
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create new alert
router.post("/", async (req, res) => {
  try {
    const { message, type, pipeline } = req.body;
    const existing = await Alert.findOne({ message, type, pipeline, acknowledged: false });
    if (existing) return res.status(200).json(existing);

    const newAlert = new Alert({ message, type, pipeline });
    await newAlert.save();

    res.status(201).json(newAlert);
  } catch (err) {
    res.status(500).json({ message: "Error saving alert", error: err.message });
  }
});

// ✅ Acknowledge one alert
router.post("/:id/ack", async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true },
      { new: true }
    );

    if (!alert) return res.status(404).json({ error: "Alert not found" });

    await Log.create({
      pipeline: alert.pipeline,
      eventType: "Alert Acknowledged",
      actionTaken: "Acknowledged by user",
      user: req.body.user || "System",
    });

    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Reset all live alerts
router.post("/reset", async (req, res) => {
  try {
    // Find all active alerts first
    const activeAlerts = await Alert.find({ acknowledged: false });

    if (activeAlerts.length === 0) {
      return res.json({ message: "No live alerts to reset." });
    }

    // Mark them as acknowledged
    await Alert.updateMany({ acknowledged: false }, { acknowledged: true });

    // Log each reset
    for (const alert of activeAlerts) {
      await Log.create({
        pipeline: alert.pipeline,
        eventType: "Alert Reset",
        actionTaken: "Reset by Admin",
        user: req.body.user || "Admin",
      });
    }

    res.json({ message: "All live alerts have been reset.", count: activeAlerts.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

