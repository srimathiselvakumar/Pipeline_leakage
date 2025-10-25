

// const mongoose = require('mongoose');

// const LogSchema = new mongoose.Schema({
//   pipeline: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Pipeline', 
//     required: true 
//   },
//   eventType: { 
//     type: String, 
//     required: true 
//   }, // e.g. "Motor Toggled", "High Flow Detected"
//   actionTaken: { 
//     type: String, 
//     required: true 
//   }, // e.g. "Valve Closed", "Alert Sent"
//   user: { 
//     type: String, 
//     default: 'System' 
//   }, // User or role who triggered the action
//   details: { 
//     type: String 
//   }, // Optional additional info
//   severity: { 
//     type: String, 
//     enum: ["critical", "high", "medium", "low", "resolved"], 
//     default: "low" 
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   }
// });

// module.exports = mongoose.model('Log', LogSchema);


const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  pipeline: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pipeline', 
    required: true 
  },
  eventType: { 
    type: String, 
    required: true 
  }, // e.g. "Motor Toggled", "High Flow Detected", "Leakage Detected"
  actionTaken: { 
    type: String, 
    required: true 
  }, // e.g. "Valve Closed", "Alert Sent"
  user: { 
    type: String, 
    default: 'System' 
  }, // User or system role who triggered
  details: { 
    type: String 
  }, // Optional additional info
  severity: { 
    type: String, 
    enum: ["critical", "high", "medium", "low", "resolved"], 
    default: "low" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Log', LogSchema);

