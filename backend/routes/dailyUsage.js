const express = require('express');
const router = express.Router();
const DailyStat = require('../models/DailyStat');

// GET daily stats (last 7 days)
router.get('/last-week/:pipelineId', async (req, res) => {
  try {
    const { pipelineId } = req.params;
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 6*24*60*60*1000);

    const stats = await DailyStat.find({
      pipelineId,
      date: { $gte: sevenDaysAgo, $lte: now }
    }).sort({ date: 1 }); // oldest → newest

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or update today's stats
router.post('/update-today', async (req, res) => {
  try {
    const { pipelineId, totalLiters, leaksCount } = req.body;
    const today = new Date();
    today.setHours(0,0,0,0);

    const stat = await DailyStat.findOneAndUpdate(
      { pipelineId, date: today },
      { $inc: { totalLiters: totalLiters || 0, leaksCount: leaksCount || 0 } },
      { upsert: true, new: true }
    );

    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
