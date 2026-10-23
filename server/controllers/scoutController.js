import { pool } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// GET /api/scout/watchlist
export const getWatchlist = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT w.*, p.ign, p.primary_role, t.team_name
        FROM scouting_watchlists w
        LEFT JOIN players p ON w.player_id = p.player_id
        LEFT JOIN teams t ON w.team_id = t.team_id
        ORDER BY w.created_at DESC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  // Fallback to store
  const results = mockStore.scouting_watchlists.map(w => {
    const player = mockStore.players.find(p => p.player_id === w.player_id) || {};
    const team = mockStore.teams.find(t => t.team_id === w.team_id) || {};
    return {
      ...w,
      ign: player.ign || 'Unknown',
      primary_role: player.primary_role || 'Assaulter',
      team_name: team.team_name || 'Free Agent'
    };
  });
  res.json(results);
};

// GET /api/scout/reports
export const getReports = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT r.*, p.ign, p.game_uid, p.primary_role, u.username as scout_name
        FROM scouting_reports r
        LEFT JOIN players p ON r.player_id = p.player_id
        LEFT JOIN users u ON r.scout_id = u.user_id
        ORDER BY r.created_at DESC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  const results = mockStore.scouting_reports.map(r => {
    const player = mockStore.players.find(p => p.player_id === r.player_id) || {};
    const scout = mockStore.users.find(u => u.user_id === r.scout_id) || {};
    return {
      ...r,
      ign: player.ign || 'ShadowOP',
      game_uid: player.game_uid || '5129384712',
      primary_role: player.primary_role || 'Assaulter',
      scout_name: scout.username || 'apex_scout'
    };
  });
  res.json(results);
};

// POST /api/scout/reports
export const createReport = async (req, res) => {
  const {
    scout_id = 1,
    player_id,
    aim_rating,
    game_sense_rating,
    communication_rating,
    discipline_rating,
    overall_potential,
    scout_verdict
  } = req.body;

  if (!player_id || !scout_verdict) {
    return res.status(400).json({ error: 'player_id and scout_verdict are required.' });
  }

  if (pool) {
    try {
      const { rows } = await pool.query(`
        INSERT INTO scouting_reports 
        (scout_id, player_id, aim_rating, game_sense_rating, communication_rating, discipline_rating, overall_potential, scout_verdict)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `, [scout_id, player_id, aim_rating, game_sense_rating, communication_rating, discipline_rating, overall_potential, scout_verdict]);
      return res.status(201).json(rows[0]);
    } catch (err) {
      console.warn('Postgres insert error, using store:', err.message);
    }
  }

  const newReport = {
    report_id: mockStore.scouting_reports.length + 1,
    scout_id: Number(scout_id) || 1,
    player_id: Number(player_id),
    aim_rating: Number(aim_rating) || 8,
    game_sense_rating: Number(game_sense_rating) || 8,
    communication_rating: Number(communication_rating) || 8,
    discipline_rating: Number(discipline_rating) || 8,
    overall_potential: overall_potential || 'High',
    scout_verdict,
    created_at: new Date().toISOString()
  };
  mockStore.scouting_reports.unshift(newReport);
  res.status(201).json(newReport);
};

// GET /api/tryouts
export const getTryouts = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT ta.*, p.ign, p.primary_role, p.game_uid, t.team_name, t.team_tag
        FROM tryout_applications ta
        JOIN players p ON ta.player_id = p.player_id
        JOIN teams t ON ta.team_id = t.team_id
        ORDER BY ta.applied_at DESC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  const results = mockStore.tryout_applications.map(ta => {
    const player = mockStore.players.find(p => p.player_id === ta.player_id) || {};
    const team = mockStore.teams.find(t => t.team_id === ta.team_id) || {};
    return {
      ...ta,
      ign: player.ign || 'Unknown',
      primary_role: player.primary_role || 'Assaulter',
      game_uid: player.game_uid || 'N/A',
      team_name: team.team_name || 'Unknown',
      team_tag: team.team_tag || 'TAG'
    };
  });
  res.json(results);
};

// POST /api/tryouts/apply
export const applyTryout = async (req, res) => {
  const { team_id, player_id, role_applied, submission_notes } = req.body;

  if (!team_id || !player_id || !role_applied) {
    return res.status(400).json({ error: 'team_id, player_id, and role_applied are required' });
  }

  if (pool) {
    try {
      const { rows } = await pool.query(`
        INSERT INTO tryout_applications (team_id, player_id, role_applied, submission_notes)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `, [team_id, player_id, role_applied, submission_notes || '']);
      return res.status(201).json(rows[0]);
    } catch (err) {
      console.warn('Postgres insert error, using store:', err.message);
    }
  }

  const newApp = {
    application_id: mockStore.tryout_applications.length + 1,
    team_id: Number(team_id),
    player_id: Number(player_id),
    role_applied,
    application_status: 'Pending',
    submission_notes: submission_notes || '',
    applied_at: new Date().toISOString()
  };
  mockStore.tryout_applications.unshift(newApp);
  res.status(201).json(newApp);
};
