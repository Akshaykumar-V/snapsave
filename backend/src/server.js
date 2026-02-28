// Load environment variables (backend/.env is one level up from src/)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const goalRoutes = require('./routes/goals');
const uploadRoutes = require('./routes/upload');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5500',
    /\.vercel\.app$/  // Allow all Vercel preview URLs
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);

// ─── Root Endpoint ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    message: '💰 SnapSave API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      auth: '/api/auth (POST /register, /login, GET /me)',
      transactions: '/api/transactions (GET, POST, DELETE /:id)',
      goals: '/api/goals (GET, POST, GET /:id, PUT /:id, DELETE /:id)',
      upload: '/api/upload (POST /pdf)',
    },
  });
});

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'Connected' : 'Not connected';

  res.status(200).json({
    success: true,
    status: 'OK',
    database: dbStatus,
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('❌ [Server]', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// ─── Start Server ────────────────────────────────────────────
async function start() {
  try {
    console.log('\n🚀 SnapSave Backend Server');
    await connectDB();
    console.log('🗄️  MongoDB Connected successfully!');
    app.listen(PORT, () => {
      console.log(`📡 Running on: http://localhost:${PORT}`);
      console.log('\n✅ Server is ready!\n');
    });
  } catch (err) {
    console.error('❌ [Server] Failed to start:', err.message);
    process.exit(1);
  }
}

start();
