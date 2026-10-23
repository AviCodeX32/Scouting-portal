import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.includes('[neon_user]') || databaseUrl.includes('your_neon_')) {
  console.log("=================================================================");
  console.log("⚠️  NEON POSTGRESQL CONFIGURATION NOTICE");
  console.log("Your server/.env currently has placeholder credentials for DATABASE_URL.");
  console.log("=================================================================");
  process.exit(0);
}

const { Pool } = pg;
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

async function runSeed() {
  const client = await pool.connect();
  try {
    console.log("⚡ Starting Neon PostgreSQL schema migration and 12-table seed...");

    // 0. Ensure schema exists
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSql);
    console.log("✓ All 12 tables verified or created in Neon PostgreSQL.");

    await client.query('BEGIN');

    // Clean existing data for clean seed
    await client.query(`
      TRUNCATE TABLE 
        tryout_applications,
        scouting_reports,
        scouting_watchlists,
        player_match_stats,
        team_match_results,
        matches,
        tournament_registrations,
        tournaments,
        team_roster,
        players,
        teams,
        users
      RESTART IDENTITY CASCADE;
    `);

    // 1. Users Table (Scouts, Players, Managers, Organizers)
    console.log("Seeding Users...");
    await client.query(`
      INSERT INTO users (user_id, username, email, password_hash, role) VALUES
      (1, 'scout_apex', 'scout@kraftonindia.gg', '$2b$10$wT2829202examplehash', 'scout'),
      (2, 'jonathan_gaming', 'jonathan@godl.in', '$2b$10$wT2829202examplehash', 'player'),
      (3, 'manya_igl', 'manya@teamsoul.in', '$2b$10$wT2829202examplehash', 'player'),
      (4, 'spraygod_tx', 'spraygod@teamxspark.gg', '$2b$10$wT2829202examplehash', 'player'),
      (5, 'goblin_fragger', 'goblin@carnivalgaming.in', '$2b$10$wT2829202examplehash', 'player'),
      (6, 'sensei_igl', 'sensei@revenant.gg', '$2b$10$wT2829202examplehash', 'player'),
      (7, 'krafton_admin', 'admin@kraftonindiaesports.com', '$2b$10$wT2829202examplehash', 'organizer')
      ON CONFLICT (user_id) DO NOTHING;
    `);

    // 2. Teams Table (10 Famous BGMI Teams)
    console.log("Seeding Teams...");
    await client.query(`
      INSERT INTO teams (team_id, team_name, team_tag, logo_url, logo_key, tier, achievements, manager_id, is_underdog) VALUES
      (1, 'Team Soul', 'SOUL', '/logos/soul.svg', 'soul', 'Tier 1 Pro', 'BMPS Champions, Battlegrounds Master Series Winners', 1, FALSE),
      (2, 'GodLike Esports', 'GODL', '/logos/godl.svg', 'godl', 'Tier 1 Pro', 'PMGC Global Finalist, BGIS Runners-up', 1, FALSE),
      (3, 'Team XSpark', 'TX', '/logos/tx.svg', 'tx', 'Tier 1 Pro', 'BGIS 2024 Reigning Champions', 1, FALSE),
      (4, 'Carnival Gaming', 'CG', '/logos/cg.svg', 'cg', 'Tier 1 Pro', 'BMPS 2024 Top 3, LAN Finalists', NULL, FALSE),
      (5, 'Global Esports', 'GE', '/logos/ge.svg', 'ge', 'Tier 1 Pro', 'VCT & BGIS Season Finalists', NULL, FALSE),
      (6, 'Revenant Esports', 'RNT', '/logos/rnt.svg', 'rnt', 'Tier 1 Pro', 'Skyesports Championship Winners', NULL, FALSE),
      (7, 'Orangutan Esports', 'OG', '/logos/og.svg', 'og', 'Tier 1 Pro', 'BMOC Champions, Masters Series Top 5', NULL, FALSE),
      (8, 'Reckoning Underdogs', 'RCK', '/logos/rck.svg', 'rck', 'Tier 2 Challenger', 'Grassroots Cup S1 Champions', NULL, TRUE),
      (9, 'Blind Esports', 'BLIND', '/logos/blind.svg', 'blind', 'Tier 2 Challenger', 'BMPS Season 2 Champions', NULL, TRUE),
      (10, 'Medal Esports', 'MEDAL', '/logos/medal.svg', 'medal', 'Tier 3 Grassroots', 'Rising Stars Open 2025 Winners', NULL, TRUE)
      ON CONFLICT (team_id) DO NOTHING;
    `);

    // 3. Players Table (Famous Pros & Rising Grassroots Talents)
    console.log("Seeding Players...");
    await client.query(`
      INSERT INTO players (player_id, user_id, ign, game_uid, real_name, primary_role, secondary_role, device_type, country, bio) VALUES
      (1, 2, 'Jonathan', '5124829104', 'Jonathan Amaral', 'Assaulter', 'Entry Fragger', 'iPhone 15 Pro Max', 'India', 'Legendary BGMI assaulter. Multiple MVP titles in official Krafton LAN championships with 700+ tournament finishes.'),
      (2, 3, 'Manya', '5284910382', 'Mohammad Raja', 'IGL', 'Support', 'iPhone 15 Pro Max', 'India', 'Champion In-Game Leader for Team Soul. Renowned for late-zone rotational composure and strategic split setups.'),
      (3, 4, 'SprayGod', '5391048291', 'Harsh Malik', 'Entry Fragger', 'Assaulter', 'OnePlus 12', 'India', 'BGIS 2024 Champion and MVP fragger. Unstoppable 1v1 duel win rate and pinpoint 6x spray control.'),
      (4, 5, 'Goblin', '5401928374', 'Harsh Chandani', 'Assaulter', 'Entry Fragger', 'iPhone 15 Pro Max', 'India', 'BMPS MVP record holder with unmatched close-quarter agility and explosive clearing ability.'),
      (5, 6, 'Sensei', '5519283741', 'Deepak Negi', 'IGL', 'Support', 'ROG Phone 8 Pro', 'India', 'Master tactician and veteran captain. Specialized in early information gathering and compound defense.'),
      (6, NULL, 'VortexGod', '5837261940', 'Rahul Verma', 'Entry Fragger', 'Assaulter', 'iQOO 12', 'India', 'Grassroots sensation delivering 500+ ADR in Tier 2/3 official qualifiers. Prime prospect for franchise trials.'),
      (7, NULL, 'ZenithBolt', '5429103847', 'Sameer Khan', 'Sniper', 'Support', 'iPhone 14 Pro', 'India', 'Miramar and Erangel ridge sniper. Holds 72% first-knock conversion rate in open scrims.'),
      (8, NULL, 'ShadowOP', '5129384712', 'Aman Sharma', 'IGL', 'Support', 'iPhone 15 Pro', 'India', 'Underdog rotational specialist with 400+ scrim matches captained. Unmatched patience during zone 5 collapses.')
      ON CONFLICT (player_id) DO NOTHING;
    `);

    // 4. Team Roster Table
    console.log("Seeding Team Roster...");
    await client.query(`
      INSERT INTO team_roster (roster_id, team_id, player_id, roster_role, is_active) VALUES
      (1, 1, 2, 'Captain', TRUE),
      (2, 2, 1, 'Starter', TRUE),
      (3, 3, 3, 'Starter', TRUE),
      (4, 4, 4, 'Starter', TRUE),
      (5, 6, 5, 'Captain', TRUE),
      (6, 8, 6, 'Starter', TRUE),
      (7, 8, 8, 'Captain', TRUE),
      (8, 9, 7, 'Starter', TRUE)
      ON CONFLICT (roster_id) DO NOTHING;
    `);

    // 5. Tournaments Table
    console.log("Seeding Tournaments...");
    await client.query(`
      INSERT INTO tournaments (tournament_id, organizer_id, title, tier, prize_pool, start_date, end_date, format, status) VALUES
      (1, 7, 'BGIS 2026: Battlegrounds Mobile India Series', 'Tier 1', 20000000.00, '2026-03-01', '2026-04-15', 'Battle Royale (Squad)', 'Ongoing'),
      (2, 7, 'BMPS 2026: Pro Series Season 4', 'Tier 1', 10000000.00, '2026-05-10', '2026-06-25', 'Battle Royale (Squad)', 'Upcoming'),
      (3, 7, 'Krafton India Grassroots Challengers (Tier 2/3)', 'Tier 2', 1500000.00, '2026-02-01', '2026-02-28', 'Battle Royale (Squad)', 'Ongoing'),
      (4, 7, 'Daily Official BGMI Open Scrims - Season 8', 'Open Scrims', 50000.00, '2026-10-01', '2026-10-31', 'Battle Royale (Squad)', 'Ongoing')
      ON CONFLICT (tournament_id) DO NOTHING;
    `);

    // 6. Tournament Registrations Table
    console.log("Seeding Registrations...");
    await client.query(`
      INSERT INTO tournament_registrations (registration_id, tournament_id, team_id, seed_number, registration_status) VALUES
      (1, 1, 1, 1, 'Approved'),
      (2, 1, 2, 2, 'Approved'),
      (3, 1, 3, 3, 'Approved'),
      (4, 1, 4, 4, 'Approved'),
      (5, 1, 8, 5, 'Approved')
      ON CONFLICT (registration_id) DO NOTHING;
    `);

    // 7. Matches Table
    console.log("Seeding Matches...");
    await client.query(`
      INSERT INTO matches (match_id, tournament_id, match_number, stage_name, map_name, scheduled_time, status) VALUES
      (1, 1, 1, 'Grand Finals - Match 1', 'Erangel', '2026-04-10 17:30:00', 'Finished'),
      (2, 1, 2, 'Grand Finals - Match 2', 'Miramar', '2026-04-10 18:30:00', 'Finished'),
      (3, 1, 3, 'Grand Finals - Match 3', 'Sanhok', '2026-04-10 19:30:00', 'Scheduled'),
      (4, 1, 4, 'Grand Finals - Match 4', 'Vikendi', '2026-04-10 20:30:00', 'Scheduled')
      ON CONFLICT (match_id) DO NOTHING;
    `);

    // 8. Team Match Results Table (Official 10-Point System)
    console.log("Seeding Team Match Results...");
    await client.query(`
      INSERT INTO team_match_results (result_id, match_id, team_id, placement, placement_points, kill_points) VALUES
      (1, 1, 3, 1, 10, 12),
      (2, 1, 1, 2, 6, 8),
      (3, 1, 2, 3, 5, 7),
      (4, 1, 4, 4, 4, 5),
      (5, 1, 8, 5, 3, 6),
      (6, 1, 6, 6, 2, 3),
      (7, 1, 7, 7, 1, 3),
      (8, 1, 5, 8, 0, 2),
      (9, 2, 1, 1, 10, 11),
      (10, 2, 2, 2, 6, 9),
      (11, 2, 3, 3, 5, 5),
      (12, 2, 8, 4, 4, 4)
      ON CONFLICT (result_id) DO NOTHING;
    `);

    // 9. Player Match Stats Table (Frags, ADR, Headshots & MVPs)
    console.log("Seeding Player Match Stats...");
    await client.query(`
      INSERT INTO player_match_stats (stat_id, match_id, player_id, team_id, kills, damage_dealt, assists, survival_time_seconds, headshots, mvp_awarded) VALUES
      (1, 1, 3, 3, 6, 940.00, 2, 1420, 4, TRUE),
      (2, 1, 1, 2, 5, 880.50, 1, 1310, 3, FALSE),
      (3, 1, 2, 1, 3, 510.00, 3, 1390, 1, FALSE),
      (4, 1, 4, 4, 4, 620.00, 0, 1180, 2, FALSE),
      (5, 1, 6, 8, 4, 590.00, 2, 1240, 2, FALSE),
      (6, 2, 2, 1, 5, 820.00, 2, 1450, 2, TRUE)
      ON CONFLICT (stat_id) DO NOTHING;
    `);

    // 10. Scouting Watchlists Table
    console.log("Seeding Scouting Watchlists...");
    await client.query(`
      INSERT INTO scouting_watchlists (watchlist_id, scout_id, player_id, team_id, notes) VALUES
      (1, 1, 6, 8, 'VortexGod: Sharp crosshair placement and high duel win rate in T2 Challengers. Prime candidate for T1 Academy trials.'),
      (2, 1, 8, 8, 'ShadowOP: Disciplined late-circle edge rotations and flawless smoke line execution.'),
      (3, 1, 7, 9, 'ZenithBolt: Miramar first-knock specialist. 70%+ DMR accuracy on moving vehicles.')
      ON CONFLICT (watchlist_id) DO NOTHING;
    `);

    // 11. Scouting Reports Table
    console.log("Seeding Scouting Reports...");
    await client.query(`
      INSERT INTO scouting_reports (report_id, scout_id, player_id, aim_rating, game_sense_rating, communication_rating, discipline_rating, overall_potential, scout_verdict) VALUES
      (1, 1, 6, 9, 9, 8, 8, 'High', 'Ready for Tier 1 franchise trial. Outstanding reaction time in 1v1 close-range encounters.'),
      (2, 1, 8, 8, 9, 9, 9, 'High', 'Natural In-Game Leader. Keeps squad composed during 4-team sandwich scenarios in zone 5.')
      ON CONFLICT (report_id) DO NOTHING;
    `);

    // 12. Tryout Applications Table
    console.log("Seeding Tryout Applications...");
    await client.query(`
      INSERT INTO tryout_applications (application_id, team_id, player_id, role_applied, application_status, submission_notes) VALUES
      (1, 1, 6, 'Entry Fragger', 'Trial Offered', 'Applying for Soul Academy open trial. 600+ ADR in recent BGIS qualifiers.'),
      (2, 2, 7, 'Sniper', 'Pending', 'GodLike Rising trial candidate. 6 hours/day scrim commitment.'),
      (3, 3, 8, 'Support', 'Pending', 'Applying for Team XSpark substitute squad.')
      ON CONFLICT (application_id) DO NOTHING;
    `);

    // Reset sequence counters so future inserts don't collide
    await client.query(`
      SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));
      SELECT setval('teams_team_id_seq', (SELECT MAX(team_id) FROM teams));
      SELECT setval('players_player_id_seq', (SELECT MAX(player_id) FROM players));
      SELECT setval('team_roster_roster_id_seq', (SELECT MAX(roster_id) FROM team_roster));
      SELECT setval('tournaments_tournament_id_seq', (SELECT MAX(tournament_id) FROM tournaments));
      SELECT setval('tournament_registrations_registration_id_seq', (SELECT MAX(registration_id) FROM tournament_registrations));
      SELECT setval('matches_match_id_seq', (SELECT MAX(match_id) FROM matches));
      SELECT setval('team_match_results_result_id_seq', (SELECT MAX(result_id) FROM team_match_results));
      SELECT setval('player_match_stats_stat_id_seq', (SELECT MAX(stat_id) FROM player_match_stats));
      SELECT setval('scouting_watchlists_watchlist_id_seq', (SELECT MAX(watchlist_id) FROM scouting_watchlists));
      SELECT setval('scouting_reports_report_id_seq', (SELECT MAX(report_id) FROM scouting_reports));
      SELECT setval('tryout_applications_application_id_seq', (SELECT MAX(application_id) FROM tryout_applications));
    `);

    await client.query('COMMIT');
    console.log("=================================================================");
    console.log("🎉 NEON POSTGRESQL SEED COMPLETE!");
    console.log("✓ All 12 relational database tables successfully created and seeded.");
    console.log("✓ Tables & rows are now fully visible on your Neon console dashboard!");
    console.log("=================================================================");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Seeding failed:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

runSeed();
