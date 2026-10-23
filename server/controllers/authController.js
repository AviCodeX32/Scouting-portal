import { pool } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// POST /api/auth/signup
export const signup = async (req, res) => {
  const {
    username,
    email,
    password,
    role = 'player',
    real_name,
    ign,
    game_uid,
    primary_role = 'Assaulter',
    secondary_role = 'Support',
    device_type = 'iPhone 15 Pro Max',
    country = 'India',
    bio = ''
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  // Simple password hash simulation (or standard bcrypt hash)
  const password_hash = `$2b$10$hashed_${Buffer.from(password).toString('base64').slice(0, 15)}`;

  // 1. If live PostgreSQL is connected
  if (pool) {
    try {
      await pool.query('BEGIN');

      const userRes = await pool.query(`
        INSERT INTO users (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, username, email, role, created_at;
      `, [username, email, password_hash, role]);

      const newUser = userRes.rows[0];
      let newPlayer = null;

      if (role === 'player' || ign || game_uid) {
        const finalUid = game_uid || Math.floor(5000000000 + Math.random() * 4999999999).toString();
        const finalIgn = ign || username;

        const playerRes = await pool.query(`
          INSERT INTO players (user_id, ign, game_uid, real_name, primary_role, secondary_role, device_type, country, bio)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *;
        `, [newUser.user_id, finalIgn, finalUid, real_name || username, primary_role, secondary_role, device_type, country, bio]);
        newPlayer = playerRes.rows[0];
      }

      await pool.query('COMMIT');

      return res.status(201).json({
        message: 'Account created successfully!',
        user: newUser,
        player: newPlayer
      });
    } catch (err) {
      await pool.query('ROLLBACK');
      console.warn('Postgres signup error:', err.message);
      return res.status(400).json({ error: err.message });
    }
  }

  // 2. Demo mode / Mock store handling
  const existingUser = mockStore.users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email is already registered.' });
  }

  const userId = mockStore.users.length + 1;
  const finalUid = game_uid || Math.floor(5000000000 + Math.random() * 4999999999).toString();
  const finalIgn = ign || username;

  const newUser = {
    user_id: userId,
    username,
    email,
    password_hash,
    role,
    created_at: new Date().toISOString()
  };
  mockStore.users.push(newUser);

  let newPlayer = null;
  if (role === 'player' || ign || game_uid) {
    newPlayer = {
      player_id: mockStore.players.length + 1,
      user_id: userId,
      ign: finalIgn,
      game_uid: finalUid,
      real_name: real_name || username,
      primary_role: primary_role || 'Assaulter',
      secondary_role: secondary_role || 'Support',
      device_type: device_type || 'iPhone 15 Pro Max',
      country: country || 'India',
      bio: bio || 'Aspiring BGMI competitive athlete.'
    };
    mockStore.players.push(newPlayer);
  }

  return res.status(201).json({
    message: 'Account created successfully!',
    user: newUser,
    player: newPlayer
  });
};

// POST /api/auth/login
// Accepts player_id (Game UID, Username, or Email) and password
export const login = async (req, res) => {
  const { player_id, password } = req.body;

  if (!player_id || !password) {
    return res.status(400).json({ error: 'Player ID / Username and Password are required.' });
  }

  const identifier = player_id.toString().trim();

  // 1. If live PostgreSQL is connected
  if (pool) {
    try {
      const userRes = await pool.query(`
        SELECT u.user_id, u.username, u.email, u.password_hash, u.role,
               p.player_id, p.ign, p.game_uid, p.real_name, p.primary_role, p.device_type,
               t.team_name, t.team_tag
        FROM users u
        LEFT JOIN players p ON u.user_id = p.user_id
        LEFT JOIN team_roster tr ON p.player_id = tr.player_id AND tr.is_active = TRUE
        LEFT JOIN teams t ON tr.team_id = t.team_id
        WHERE u.username = $1 
           OR u.email = $1 
           OR p.game_uid = $1
           OR CAST(p.player_id AS TEXT) = $1
        LIMIT 1;
      `, [identifier]);

      if (userRes.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid Player ID / Username or Password.' });
      }

      const user = userRes.rows[0];

      return res.json({
        message: 'Login successful!',
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          player_id: user.player_id,
          ign: user.ign || user.username,
          game_uid: user.game_uid || 'N/A',
          real_name: user.real_name,
          primary_role: user.primary_role,
          team_name: user.team_name || 'Free Agent',
          team_tag: user.team_tag || 'FA'
        },
        token: 'bgmi_jwt_session_' + Buffer.from(user.username).toString('base64')
      });
    } catch (err) {
      console.warn('Postgres login error:', err.message);
    }
  }

  // 2. Demo mode / Mock store handling
  // Search user by username, email, game_uid, or player_id
  let foundUser = null;
  let foundPlayer = null;

  // Check if identifier matches a player's game_uid or player_id
  foundPlayer = mockStore.players.find(p => 
    p.game_uid === identifier || 
    p.player_id.toString() === identifier ||
    p.ign?.toLowerCase() === identifier.toLowerCase()
  );

  if (foundPlayer) {
    foundUser = mockStore.users.find(u => u.user_id === foundPlayer.user_id);
  } else {
    foundUser = mockStore.users.find(u => 
      u.username.toLowerCase() === identifier.toLowerCase() || 
      u.email.toLowerCase() === identifier.toLowerCase()
    );
    if (foundUser) {
      foundPlayer = mockStore.players.find(p => p.user_id === foundUser.user_id);
    }
  }

  if (!foundUser) {
    return res.status(401).json({ error: 'Player ID or User not found.' });
  }

  const activeRoster = foundPlayer ? mockStore.team_roster.find(tr => tr.player_id === foundPlayer.player_id && tr.is_active) : null;
  const team = activeRoster ? mockStore.teams.find(t => t.team_id === activeRoster.team_id) : null;

  return res.json({
    message: 'Login successful!',
    user: {
      user_id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      player_id: foundPlayer ? foundPlayer.player_id : null,
      ign: foundPlayer ? foundPlayer.ign : foundUser.username,
      game_uid: foundPlayer ? foundPlayer.game_uid : 'N/A',
      real_name: foundPlayer ? foundPlayer.real_name : foundUser.username,
      primary_role: foundPlayer ? foundPlayer.primary_role : 'Player',
      team_name: team ? team.team_name : 'Free Agent',
      team_tag: team ? team.team_tag : 'FA'
    },
    token: 'bgmi_jwt_session_' + Buffer.from(foundUser.username).toString('base64')
  });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  // If no auth token provided, default to mock scout or null
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = mockStore.users[0];
  const player = mockStore.players[0];

  res.json({
    user: {
      ...user,
      ign: player?.ign,
      game_uid: player?.game_uid
    }
  });
};
