// const mongoose = require('mongoose');

// const MaintenanceSchema = new mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   notes: String
// });

// const PipelineSchema = new mongoose.Schema({
//   name: { type: String, required: true },           // e.g., "Block A - 1st Floor"
//   location: String,
//   pipeSize: String,                                 // "25 mm"
//   sensorId: String,
//   currentFlowRate: { type: Number, default: 0 },    // L/min
//   motorStatus: { type: String, enum: ['ON','OFF'], default: 'OFF' },
//   solenoidStatus: { type: String, enum: ['ON','OFF'], default: 'OFF' },
//   status: { type: String, enum: ['Normal','Leak Detected','Motor OFF'], default: 'Normal' },
//   maintenanceHistory: [MaintenanceSchema]
// }, { timestamps: true });

// module.exports = mongoose.model('Pipeline', PipelineSchema);
const mongoose = require("mongoose");

const PipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g., "Block A - 1st Floor"
  location: String,
  pipeSize: String,                               // e.g., "25 mm"
  sensorId: String,
  totalLiters: { type: Number, default: 0 },     // Total water usage
  currentFlowRate: { type: Number, default: 0 }, // Flow rate in L/min
  motorStatus: { type: String, enum: ["ON", "OFF"], default: "OFF" },
  solenoidStatus: { type: String, enum: ["ON", "OFF"], default: "OFF" },
  status: { type: String, enum: ["Normal", "Leak Detected", "Motor OFF"], default: "Normal" },
}, { timestamps: true });

module.exports = mongoose.model("Pipeline", PipelineSchema);
