

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Log = require('../models/Log');
// const { Parser } = require('json2csv');

// // GET /api/logs?severity=high
// // Fetch logs, optionally filter by severity
// router.get('/', async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.severity) filter.severity = req.query.severity;

//     const logs = await Log.find(filter)
//       .populate('pipeline')
//       .sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET /api/logs/download?severity=high
// // Download logs as CSV
// router.get('/download', async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.severity) filter.severity = req.query.severity;

//     const logs = await Log.find(filter)
//       .populate('pipeline')
//       .sort({ createdAt: -1 })
//       .lean();

//     const rows = logs.map(l => ({
//       date: new Date(l.createdAt).toLocaleString(), // Human-readable
//       pipeline: l.pipeline ? l.pipeline.name : '',
//       eventType: l.eventType,
//       actionTaken: l.actionTaken,
//       user: l.user,
//       details: l.details,
//       severity: l.severity
//     }));

//     const parser = new Parser();
//     const csv = parser.parse(rows);

//     res.header('Content-Type', 'text/csv');
//     res.attachment('logs.csv');
//     res.send(csv);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { Parser } = require('json2csv');

// GET /api/logs?severity=high
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.severity) filter.severity = req.query.severity;

    const logs = await Log.find(filter)
      .populate('pipeline')
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/logs/download?severity=high
router.get('/download', async (req, res) => {
  try {
    const filter = {};
    if (req.query.severity) filter.severity = req.query.severity;

    const logs = await Log.find(filter)
      .populate('pipeline')
      .sort({ createdAt: -1 })
      .lean();

    const rows = logs.map(l => ({
      date: new Date(l.createdAt).toLocaleString(),
      pipeline: l.pipeline ? l.pipeline.name : '',
      eventType: l.eventType,
      actionTaken: l.actionTaken,
      user: l.user,
      details: l.details,
      severity: l.severity
    }));

    const parser = new Parser();
    const csv = parser.parse(rows);

    res.header('Content-Type', 'text/csv');
    res.attachment('logs.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

