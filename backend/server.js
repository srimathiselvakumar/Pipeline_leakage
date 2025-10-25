
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const pipelinesRoute = require('./routes/pipelines');
const alertsRoute = require('./routes/alerts');
const logsRoute = require('./routes/logs');
const authRoute = require('./routes/auth');

// Models
const Pipeline = require('./models/Pipeline');

// Utils
const sendEmail = require('./utils/sendEmail');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Auto-create default pipeline
async function createDefaultPipeline() {
  try {
    const existing = await Pipeline.findOne({ name: "Pipeline 1" });
    if (!existing) {
      const pipeline = new Pipeline({
        name: "Pipeline 1",
        location: "Block A - 1st Floor",
        pipeSize: "25 mm",
        sensorId: "S1"
      });
      await pipeline.save();
      console.log("✅ Default pipeline created:", pipeline._id);
    } else {
      console.log("ℹ️ Pipeline already exists:", existing._id);
    }
  } catch (err) {
    console.error("❌ Error creating default pipeline:", err);
  }
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    createDefaultPipeline();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/pipelines', pipelinesRoute);
app.use('/api/alerts', alertsRoute);
app.use('/api/logs', logsRoute);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    await sendEmail(
      "admin@example.com", // replace with your email
      "🚨 Test Email - Pipeline System",
      "This is a test email from the Pipeline Leakage Detection System."
    );
    res.json({ message: "✅ Test email sent successfully" });
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('⚠️ Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


