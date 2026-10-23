import express from 'express';
import {
  getPlayers,
  getTeams,
  getTournaments,
  getMatches,
  getMatchScorecard
} from '../controllers/tournamentController.js';

import {
  getWatchlist,
  getReports,
  createReport,
  getTryouts,
  applyTryout
} from '../controllers/scoutController.js';

import {
  signup,
  login,
  getMe
} from '../controllers/authController.js';

import { pool, isDbConnected } from '../config/db.js';

const router = express.Router();

// System Health / Database Connection status
router.get('/health', async (req, res) => {
  const connected = await isDbConnected();
  res.json({
    status: 'ok',
    database: connected ? 'Neon PostgreSQL (Live)' : 'Krafton BGMI Store',
    isLiveDb: connected,
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/me', getMe);

// Players with aggregated match stats (ADR, total kills)
router.get('/players', getPlayers);

// Teams with active roster count
router.get('/teams', getTeams);

// Tournaments list
router.get('/tournaments', getTournaments);

// Matches list
router.get('/matches', getMatches);

// Match Scorecard with Placement & Kill points (Krafton official competitive format)
router.get('/matches/:id/scorecard', getMatchScorecard);

// Scout Watchlist
router.get('/scout/watchlist', getWatchlist);

// Scouting Reports (List & Submit)
router.get('/scout/reports', getReports);
router.post('/scout/reports', createReport);

// Tryouts (List & Apply)
router.get('/tryouts', getTryouts);
router.post('/tryouts/apply', applyTryout);

export default router;
