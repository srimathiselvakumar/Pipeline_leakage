

const express = require('express');
const router = express.Router();
// Example User model
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (dummy check for demo — replace with bcrypt.compare in real app)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // ✅ Do NOT log email or password
    console.log('🔐 Login attempt successful'); // safe log

    res.json({ message: 'Login successful', user: { email: user.email } });
  } catch (err) {
    console.error('⚠️ Login error:', err.message); // safe error log
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/register (optional example)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Save user (dummy — use bcrypt.hash for production)
    const newUser = new User({ email, password });
    await newUser.save();

    console.log('✅ New user registered'); // safe log

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('⚠️ Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
