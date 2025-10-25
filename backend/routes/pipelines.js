// const express = require('express');
// const router = express.Router();
// const Pipeline = require('../models/Pipeline');
// const Alert = require('../models/Alert');
// const Log = require('../models/Log');

// // GET /api/pipelines - list
// router.get('/', async (req, res) => {
//   try {
//     const pipelines = await Pipeline.find().sort({ createdAt: -1 });
//     res.json(pipelines);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // POST /api/pipelines - create
// router.post('/', async (req, res) => {
//   try {
//     const p = new Pipeline(req.body);
//     await p.save();
//     res.status(201).json(p);
//   } catch (err) { res.status(400).json({ error: err.message }); }
// });

// // GET /api/pipelines/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const p = await Pipeline.findById(req.params.id);
//     if (!p) return res.status(404).json({ error: 'Not found' });
//     res.json(p);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // PUT /api/pipelines/:id
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Pipeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) { res.status(400).json({ error: err.message }); }
// });

// // DELETE /api/pipelines/:id
// router.delete('/:id', async (req, res) => {
//   try {
//     await Pipeline.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// /*
//   Toggle motor endpoint - creates a log entry and updates pipeline state.
//   POST /api/pipelines/:id/toggle-motor
//   body: { status: 'ON'|'OFF', user: 'Secretary Name', reason?: 'manual' }
// */
// router.post('/:id/toggle-motor', async (req, res) => {
//   try {
//     const { status, user = 'Secretary', reason = '' } = req.body;
//     const p = await Pipeline.findByIdAndUpdate(
//       req.params.id,
//       { motorStatus: status, status: status === 'OFF' ? 'Motor OFF' : 'Normal' },
//       { new: true }
//     );
//     if (!p) return res.status(404).json({ error: 'Pipeline not found' });

//     const log = await Log.create({
//       pipeline: p._id,
//       eventType: 'Motor Toggled',
//       actionTaken: `Motor set to ${status}`,
//       user,
//       details: reason
//     });

//     res.json({ pipeline: p, log });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// /*
//   Simulate incoming sensor alert: POST /api/pipelines/:id/alert
//   body: { type, flowRate, solenoidStatus }
//   This creates an Alert document and updates pipeline status if necessary.
// */
// router.post('/:id/alert', async (req, res) => {
//   try {
//     const p = await Pipeline.findById(req.params.id);
//     if (!p) return res.status(404).json({ error: 'Pipeline not found' });

//     const { type = 'High Flow Alert', flowRate = p.currentFlowRate, solenoidStatus = p.solenoidStatus } = req.body;

//     const alert = await Alert.create({
//       pipeline: p._id,
//       type,
//       flowRate,
//       solenoidStatus
//     });

//     // update pipeline currentRate & status
//     p.currentFlowRate = flowRate;
//     p.status = 'Leak Detected';
//     await p.save();

//     await Log.create({
//       pipeline: p._id,
//       eventType: 'Alert Created',
//       actionTaken: `Alert ${type}`,
//       user: 'system',
//       details: `flowRate: ${flowRate}`
//     });

//     res.status(201).json(alert);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Pipeline = require('../models/Pipeline');
const Alert = require('../models/Alert');
const Log = require('../models/Log');

// GET /api/pipelines/:id - fetch pipeline by ID
router.get('/:id', async (req, res) => {
  try {
    const pipeline = await Pipeline.findById(req.params.id);
    if (!pipeline) return res.status(404).json({ error: 'Pipeline not found' });
    res.json(pipeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/pipelines/:id/alert - ESP8266 posts flow data
router.post('/:id/alert', async (req, res) => {
  try {
    const pipeline = await Pipeline.findById(req.params.id);
    if (!pipeline) return res.status(404).json({ error: 'Pipeline not found' });

    const { flowRate = 0, totalLiters = 0, solenoidStatus = "OFF" } = req.body;

    // Create alert if flowRate > 0
    let alert = null;
    if (flowRate > 0) {
      alert = await Alert.create({
        pipeline: pipeline._id,
        type: "Flow Detected",
        flowRate,
        solenoidStatus
      });
    }

    // Update pipeline data
    pipeline.currentFlowRate = flowRate;
    pipeline.totalLiters = totalLiters;
    pipeline.solenoidStatus = solenoidStatus;
    pipeline.status = flowRate > 0 ? 'Leak Detected' : 'Normal';
    await pipeline.save();

    // Log the update
    await Log.create({
      pipeline: pipeline._id,
      eventType: 'Alert Created',
      actionTaken: `FlowRate: ${flowRate}, TotalLiters: ${totalLiters}, Solenoid: ${solenoidStatus}`,
      user: 'ESP8266'
    });

    res.status(201).json({ pipeline, alert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
