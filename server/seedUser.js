import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.includes('[neon_user]')) {
  console.error("❌ Error: Valid DATABASE_URL is required in server/.env");
  process.exit(1);
}

const { Pool } = pg;
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

// 2 Pre-configured User & Player Profiles for Testing
export const seedUserData = [
  {
    username: 'viper_striker',
    email: 'viper@kraftonesports.in',
    password: 'Viper@2026',
    password_hash: '$2b$10$hashed_Viper2026secure',
    role: 'player',
    ign: 'ViperOP',
    game_uid: '5678901234',
    real_name: 'Rohan Deshmukh',
    primary_role: 'Entry Fragger',
    secondary_role: 'Assaulter',
    device_type: 'iQOO 12 Pro',
    country: 'India',
    bio: 'Grassroots entry-fragger with 550+ ADR in Tier 2/3 competitive scrims. Specialized in aggressive compound breaches.'
  },
  {
    username: 'ninja_scout',
    email: 'scout.ninja@kraftonesports.in',
    password: 'Scout@2026',
    password_hash: '$2b$10$hashed_NinjaScout2026',
    role: 'scout',
    ign: 'NinjaScout',
    game_uid: '5890123456',
    real_name: 'Vikram Malhotra',
    primary_role: 'IGL',
    secondary_role: 'Support',
    device_type: 'iPhone 15 Pro Max',
    country: 'India',
    bio: 'Official Krafton India grassroots talent scout & analyst. Evaluating Tier 3 prodigies for franchise trials and BGIS academy squads.'
  }
];

async function seedUsers() {
  const client = await pool.connect();
  try {
    console.log("⚡ Connecting to Neon PostgreSQL to seed 2 user profiles...");
    await client.query('BEGIN');

    const createdUsers = [];

    for (const data of seedUserData) {
      // 1. Insert or update User
      const userRes = await client.query(`
        INSERT INTO users (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO UPDATE 
        SET username = EXCLUDED.username,
            password_hash = EXCLUDED.password_hash,
            role = EXCLUDED.role
        RETURNING user_id, username, email, role;
      `, [data.username, data.email, data.password_hash, data.role]);

      const user = userRes.rows[0];

      // 2. Insert or update Player profile
      const playerRes = await client.query(`
        INSERT INTO players (user_id, ign, game_uid, real_name, primary_role, secondary_role, device_type, country, bio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (user_id) DO UPDATE
        SET ign = EXCLUDED.ign,
            game_uid = EXCLUDED.game_uid,
            real_name = EXCLUDED.real_name,
            primary_role = EXCLUDED.primary_role,
            secondary_role = EXCLUDED.secondary_role,
            device_type = EXCLUDED.device_type,
            bio = EXCLUDED.bio
        RETURNING player_id, ign, game_uid, primary_role;
      `, [user.user_id, data.ign, data.game_uid, data.real_name, data.primary_role, data.secondary_role, data.device_type, data.country, data.bio]);

      const player = playerRes.rows[0];

      createdUsers.push({
        ...data,
        user_id: user.user_id,
        player_id: player.player_id
      });
    }

    await client.query('COMMIT');

    console.log("\n=================================================================");
    console.log("🎉 2 USERS SUCCESSFULLY SEEDED INTO NEON DATABASE!");
    console.log("=================================================================\n");

    createdUsers.forEach((u, i) => {
      console.log(`👤 USER ${i + 1} REGISTRATION DETAILS:`);
      console.log(`-----------------------------------------------------------------`);
      console.log(`  • Account Role      : ${u.role.toUpperCase()}`);
      console.log(`  • Username          : ${u.username}`);
      console.log(`  • In-Game Name (IGN): ${u.ign}`);
      console.log(`  • BGMI Game UID     : ${u.game_uid} (Login with this!)`);
      console.log(`  • Email Address     : ${u.email}`);
      console.log(`  • Password          : ${u.password}`);
      console.log(`  • Real Name         : ${u.real_name}`);
      console.log(`  • Primary Role      : ${u.primary_role}`);
      console.log(`  • Device Type       : ${u.device_type}`);
      console.log(`  • Database IDs      : user_id=${u.user_id}, player_id=${u.player_id}`);
      console.log(`-----------------------------------------------------------------\n`);
    });

    console.log("💡 You can log in with either Username, Email, or BGMI Game UID + Password.");
    console.log("=================================================================\n");

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Failed to seed users into Neon:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedUsers();
