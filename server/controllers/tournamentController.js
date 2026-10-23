import { pool } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// GET /api/players
export const getPlayers = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT p.*, t.team_name, t.team_tag,
               COALESCE(AVG(pms.damage_dealt), 0)::numeric(6,1) as avg_damage,
               COALESCE(SUM(pms.kills), 0) as total_kills,
               COALESCE(SUM(pms.headshots), 0) as total_headshots,
               COUNT(pms.stat_id) as matches_played
        FROM players p
        LEFT JOIN team_roster tr ON p.player_id = tr.player_id AND tr.is_active = TRUE
        LEFT JOIN teams t ON tr.team_id = t.team_id
        LEFT JOIN player_match_stats pms ON p.player_id = pms.player_id
        GROUP BY p.player_id, t.team_name, t.team_tag
        ORDER BY total_kills DESC, avg_damage DESC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  // Fallback using mockStore
  const rows = mockStore.players.map(p => {
    const activeRoster = mockStore.team_roster.find(tr => tr.player_id === p.player_id && tr.is_active);
    const team = activeRoster ? mockStore.teams.find(t => t.team_id === activeRoster.team_id) : null;
    const stats = mockStore.player_match_stats.filter(s => s.player_id === p.player_id);
    
    const total_kills = stats.reduce((acc, curr) => acc + (curr.kills || 0), 0);
    const total_damage = stats.reduce((acc, curr) => acc + Number(curr.damage_dealt || 0), 0);
    const avg_damage = stats.length > 0 ? (total_damage / stats.length).toFixed(1) : 0;
    const total_headshots = stats.reduce((acc, curr) => acc + (curr.headshots || 0), 0);

    return {
      ...p,
      team_name: team ? team.team_name : 'Free Agent',
      team_tag: team ? team.team_tag : 'FA',
      avg_damage: Number(avg_damage),
      total_kills: Number(total_kills),
      total_headshots: Number(total_headshots),
      matches_played: stats.length
    };
  });

  res.json(rows);
};

// GET /api/teams
export const getTeams = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT t.*, 
               COUNT(tr.player_id) as active_members,
               COALESCE(
                 json_agg(
                   json_build_object(
                     'player_id', p.player_id,
                     'ign', p.ign,
                     'primary_role', p.primary_role,
                     'roster_role', tr.roster_role
                   )
                 ) FILTER (WHERE p.player_id IS NOT NULL), '[]'
               ) as roster
        FROM teams t
        LEFT JOIN team_roster tr ON t.team_id = tr.team_id AND tr.is_active = TRUE
        LEFT JOIN players p ON tr.player_id = p.player_id
        GROUP BY t.team_id
        ORDER BY t.team_id ASC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  const rows = mockStore.teams.map(t => {
    const rosterEntries = mockStore.team_roster.filter(tr => tr.team_id === t.team_id && tr.is_active);
    const members = rosterEntries.map(tr => {
      const player = mockStore.players.find(p => p.player_id === tr.player_id);
      return {
        ...player,
        roster_role: tr.roster_role
      };
    });

    return {
      ...t,
      active_members: rosterEntries.length,
      roster: members
    };
  });

  res.json(rows);
};

// GET /api/tournaments
export const getTournaments = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM tournaments ORDER BY start_date DESC;');
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  res.json(mockStore.tournaments);
};

// GET /api/matches
export const getMatches = async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT m.*, t.title as tournament_title, t.tier
        FROM matches m
        JOIN tournaments t ON m.tournament_id = t.tournament_id
        ORDER BY m.match_id ASC;
      `);
      return res.json(rows);
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  const rows = mockStore.matches.map(m => {
    const tourney = mockStore.tournaments.find(t => t.tournament_id === m.tournament_id) || {};
    return {
      ...m,
      tournament_title: tourney.title || 'Official Tournament',
      tier: tourney.tier || 'Tier 3'
    };
  });

  res.json(rows);
};

// GET /api/matches/:id/scorecard
export const getMatchScorecard = async (req, res) => {
  const { id } = req.params;
  const matchId = Number(id);

  if (pool) {
    try {
      const match = await pool.query('SELECT * FROM matches WHERE match_id = $1', [matchId]);
      const results = await pool.query(`
        SELECT tmr.*, t.team_name, t.team_tag, t.logo_url
        FROM team_match_results tmr
        JOIN teams t ON tmr.team_id = t.team_id
        WHERE tmr.match_id = $1
        ORDER BY tmr.total_points DESC, tmr.placement ASC;
      `, [matchId]);

      const mvp = await pool.query(`
        SELECT pms.*, p.ign, p.primary_role, t.team_tag
        FROM player_match_stats pms
        JOIN players p ON pms.player_id = p.player_id
        JOIN teams t ON pms.team_id = t.team_id
        WHERE pms.match_id = $1 AND pms.mvp_awarded = TRUE
        LIMIT 1;
      `, [matchId]);

      return res.json({
        match: match.rows[0] || null,
        standings: results.rows || [],
        mvp: mvp.rows[0] || null
      });
    } catch (err) {
      console.warn('Postgres query error, using store:', err.message);
    }
  }

  // Fallback to mockStore
  const match = mockStore.matches.find(m => m.match_id === matchId) || mockStore.matches[0];
  const results = mockStore.team_match_results
    .filter(r => r.match_id === match.match_id)
    .map(r => {
      const team = mockStore.teams.find(t => t.team_id === r.team_id) || {};
      return {
        ...r,
        team_name: team.team_name || 'Underdog Team',
        team_tag: team.team_tag || 'TAG',
        logo_url: team.logo_url
      };
    })
    .sort((a, b) => b.total_points - a.total_points || a.placement - b.placement);

  const mvpStat = mockStore.player_match_stats.find(s => s.match_id === match.match_id && s.mvp_awarded);
  let mvp = null;
  if (mvpStat) {
    const player = mockStore.players.find(p => p.player_id === mvpStat.player_id) || {};
    const team = mockStore.teams.find(t => t.team_id === mvpStat.team_id) || {};
    mvp = {
      ...mvpStat,
      ign: player.ign || 'ShadowOP',
      primary_role: player.primary_role || 'Assaulter',
      team_tag: team.team_tag || 'RCK'
    };
  }

  res.json({
    match,
    standings: results,
    mvp
  });
};
