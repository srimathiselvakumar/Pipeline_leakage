// const mongoose = require('mongoose');

// const AlertSchema = new mongoose.Schema({
//   pipeline: { type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline' },
//   type: { type: String },      // "High Flow Alert"
//   flowRate: Number,
//   solenoidStatus: String,
//   acknowledged: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Alert', AlertSchema);
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  pipeline: { type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true },
  type: { type: String, default: "Flow Alert" }, // e.g., "High Flow Alert"
  flowRate: { type: Number, default: 0 },
  solenoidStatus: { type: String, enum: ["ON", "OFF"], default: "OFF" },
  acknowledged: { type: Boolean, default: false }, // Has user acknowledged?
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);

