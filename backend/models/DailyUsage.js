const mongoose = require('mongoose');

const DailyStatSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  pipelineId: { type: String, required: true },
  totalLiters: { type: Number, default: 0 },
  leaksCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('DailyStat', DailyStatSchema);
