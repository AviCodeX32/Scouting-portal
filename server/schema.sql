-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('player', 'scout', 'team_manager', 'organizer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Teams Table
CREATE TABLE IF NOT EXISTS teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) UNIQUE NOT NULL,
    team_tag VARCHAR(10) NOT NULL,
    logo_url VARCHAR(255),
    logo_key VARCHAR(50),
    tier VARCHAR(50) DEFAULT 'Tier 1 Pro',
    achievements TEXT,
    manager_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    is_underdog BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Players Table
CREATE TABLE IF NOT EXISTS players (
    player_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    ign VARCHAR(50) NOT NULL,
    game_uid VARCHAR(30) UNIQUE NOT NULL,
    real_name VARCHAR(100),
    primary_role VARCHAR(30) NOT NULL CHECK (primary_role IN ('IGL', 'Assaulter', 'Entry Fragger', 'Support', 'Sniper')),
    secondary_role VARCHAR(30),
    device_type VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    bio TEXT
);

-- 4. Team Roster Table
CREATE TABLE IF NOT EXISTS team_roster (
    roster_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    player_id INT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    roster_role VARCHAR(20) DEFAULT 'Starter' CHECK (roster_role IN ('Starter', 'Substitute', 'Captain')),
    joined_date DATE NOT NULL DEFAULT CURRENT_DATE,
    left_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- 5. Tournaments Table
CREATE TABLE IF NOT EXISTS tournaments (
    tournament_id SERIAL PRIMARY KEY,
    organizer_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('Tier 3', 'Tier 2', 'Tier 1', 'Open Scrims')),
    prize_pool NUMERIC(10, 2) DEFAULT 0.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    format VARCHAR(50) DEFAULT 'Battle Royale',
    status VARCHAR(20) DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed', 'Cancelled'))
);

-- 6. Tournament Registrations Table
CREATE TABLE IF NOT EXISTS tournament_registrations (
    registration_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    team_id INT NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    seed_number INT,
    registration_status VARCHAR(20) DEFAULT 'Pending' CHECK (registration_status IN ('Pending', 'Approved', 'Rejected', 'Disqualified')),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_tournament_team UNIQUE (tournament_id, team_id)
);

-- 7. Matches Table
CREATE TABLE IF NOT EXISTS matches (
    match_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    match_number INT NOT NULL,
    stage_name VARCHAR(50) NOT NULL,
    map_name VARCHAR(50) NOT NULL CHECK (map_name IN ('Erangel', 'Miramar', 'Sanhok', 'Vikendi')),
    scheduled_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Live', 'Finished', 'Abandoned'))
);

-- 8. Team Match Results Table
CREATE TABLE IF NOT EXISTS team_match_results (
    result_id SERIAL PRIMARY KEY,
    match_id INT NOT NULL REFERENCES matches(match_id) ON DELETE CASCADE,
    team_id INT NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    placement INT NOT NULL CHECK (placement >= 1 AND placement <= 25),
    placement_points INT NOT NULL DEFAULT 0,
    kill_points INT NOT NULL DEFAULT 0,
    total_points INT GENERATED ALWAYS AS (placement_points + kill_points) STORED,
    CONSTRAINT unique_team_per_match UNIQUE (match_id, team_id)
);

-- 9. Player Match Stats Table
CREATE TABLE IF NOT EXISTS player_match_stats (
    stat_id SERIAL PRIMARY KEY,
    match_id INT NOT NULL REFERENCES matches(match_id) ON DELETE CASCADE,
    player_id INT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    team_id INT NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    kills INT NOT NULL DEFAULT 0,
    damage_dealt NUMERIC(7, 2) NOT NULL DEFAULT 0.00,
    assists INT NOT NULL DEFAULT 0,
    survival_time_seconds INT NOT NULL DEFAULT 0,
    headshots INT NOT NULL DEFAULT 0,
    revives INT NOT NULL DEFAULT 0,
    mvp_awarded BOOLEAN DEFAULT FALSE,
    CONSTRAINT unique_player_per_match UNIQUE (match_id, player_id)
);

-- 10. Scouting Watchlists Table
CREATE TABLE IF NOT EXISTS scouting_watchlists (
    watchlist_id SERIAL PRIMARY KEY,
    scout_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    player_id INT REFERENCES players(player_id) ON DELETE CASCADE,
    team_id INT REFERENCES teams(team_id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Scouting Reports Table
CREATE TABLE IF NOT EXISTS scouting_reports (
    report_id SERIAL PRIMARY KEY,
    scout_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    player_id INT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    aim_rating INT CHECK (aim_rating BETWEEN 1 AND 10),
    game_sense_rating INT CHECK (game_sense_rating BETWEEN 1 AND 10),
    communication_rating INT CHECK (communication_rating BETWEEN 1 AND 10),
    discipline_rating INT CHECK (discipline_rating BETWEEN 1 AND 10),
    overall_potential VARCHAR(20) CHECK (overall_potential IN ('High', 'Moderate', 'Development Needed')),
    scout_verdict TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Tryout Applications Table
CREATE TABLE IF NOT EXISTS tryout_applications (
    application_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    player_id INT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    role_applied VARCHAR(30) NOT NULL,
    application_status VARCHAR(20) DEFAULT 'Pending' CHECK (application_status IN ('Pending', 'Trial Offered', 'Accepted', 'Rejected')),
    submission_notes TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_application UNIQUE (team_id, player_id)
);
