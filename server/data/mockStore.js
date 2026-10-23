// High-fidelity BGMI / Krafton India Esports Database Store
// Contains famous BGMI competitive teams, real tournament structures, and rosters.

export const mockStore = {
  users: [
    { user_id: 1, username: 'scout_apex', email: 'scout@kraftonindia.gg', password_hash: '$2b$10$hashed', role: 'scout' },
    { user_id: 2, username: 'jonathan_gaming', email: 'jonathan@godl.in', password_hash: '$2b$10$hashed', role: 'player' },
    { user_id: 3, username: 'manya_igl', email: 'manya@teamsoul.in', password_hash: '$2b$10$hashed', role: 'player' },
    { user_id: 4, username: 'spraygod_tx', email: 'spraygod@teamxspark.gg', password_hash: '$2b$10$hashed', role: 'player' },
    { user_id: 5, username: 'goblin_fragger', email: 'goblin@carnivalgaming.in', password_hash: '$2b$10$hashed', role: 'player' },
    { user_id: 6, username: 'sensei_igl', email: 'sensei@revenant.gg', password_hash: '$2b$10$hashed', role: 'player' },
    { user_id: 7, username: 'krafton_admin', email: 'admin@kraftonindiaesports.com', password_hash: '$2b$10$hashed', role: 'organizer' }
  ],

  teams: [
    {
      team_id: 1,
      team_name: 'Team Soul',
      team_tag: 'SOUL',
      logo_key: 'soul',
      logo_url: '/logos/soul.svg',
      manager_id: 1,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'BMPS Champions, Battlegrounds Master Series Winners',
      created_at: '2022-01-15'
    },
    {
      team_id: 2,
      team_name: 'GodLike Esports',
      team_tag: 'GODL',
      logo_key: 'godl',
      logo_url: '/logos/godl.svg',
      manager_id: 1,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'PMGC Global Finalist, BGIS Runners-up',
      created_at: '2021-08-20'
    },
    {
      team_id: 3,
      team_name: 'Team XSpark',
      team_tag: 'TX',
      logo_key: 'tx',
      logo_url: '/logos/tx.svg',
      manager_id: 1,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'BGIS 2024 Reigning Champions',
      created_at: '2021-06-10'
    },
    {
      team_id: 4,
      team_name: 'Carnival Gaming',
      team_tag: 'CG',
      logo_key: 'cg',
      logo_url: '/logos/cg.svg',
      manager_id: null,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'BMPS 2024 Top 3, LAN Finalists',
      created_at: '2024-01-05'
    },
    {
      team_id: 5,
      team_name: 'Global Esports',
      team_tag: 'GE',
      logo_key: 'ge',
      logo_url: '/logos/ge.svg',
      manager_id: null,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'VCT & BGIS Season Finalists',
      created_at: '2021-03-12'
    },
    {
      team_id: 6,
      team_name: 'Revenant Esports',
      team_tag: 'RNT',
      logo_key: 'rnt',
      logo_url: '/logos/rnt.svg',
      manager_id: null,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'Skyesports Championship Winners',
      created_at: '2022-04-18'
    },
    {
      team_id: 7,
      team_name: 'Orangutan Esports',
      team_tag: 'OG',
      logo_key: 'og',
      logo_url: '/logos/og.svg',
      manager_id: null,
      is_underdog: false,
      tier: 'Tier 1 Pro',
      achievements: 'BMOC Champions, Masters Series Top 5',
      created_at: '2021-11-25'
    },
    {
      team_id: 8,
      team_name: 'Reckoning Underdogs',
      team_tag: 'RCK',
      logo_key: 'rck',
      logo_url: '/logos/rck.svg',
      manager_id: null,
      is_underdog: true,
      tier: 'Tier 2 Challenger',
      achievements: 'Grassroots Cup S1 Champions',
      created_at: '2023-09-14'
    },
    {
      team_id: 9,
      team_name: 'Blind Esports',
      team_tag: 'BLIND',
      logo_key: 'blind',
      logo_url: '/logos/blind.svg',
      manager_id: null,
      is_underdog: true,
      tier: 'Tier 2 Challenger',
      achievements: 'BMPS Season 2 Champions',
      created_at: '2022-02-28'
    },
    {
      team_id: 10,
      team_name: 'Medal Esports',
      team_tag: 'MEDAL',
      logo_key: 'medal',
      logo_url: '/logos/medal.svg',
      manager_id: null,
      is_underdog: true,
      tier: 'Tier 3 Grassroots',
      achievements: 'Rising Stars Open 2025 Winners',
      created_at: '2024-03-01'
    }
  ],

  players: [
    {
      player_id: 1,
      user_id: 2,
      ign: 'Jonathan',
      game_uid: '5124829104',
      real_name: 'Jonathan Amaral',
      primary_role: 'Assaulter',
      secondary_role: 'Entry Fragger',
      device_type: 'iPhone 15 Pro Max',
      country: 'India',
      bio: 'Legendary BGMI assaulter. Multiple MVP titles in official Krafton LAN championships with 700+ tournament finishes.'
    },
    {
      player_id: 2,
      user_id: 3,
      ign: 'Manya',
      game_uid: '5284910382',
      real_name: 'Mohammad Raja',
      primary_role: 'IGL',
      secondary_role: 'Support',
      device_type: 'iPhone 15 Pro Max',
      country: 'India',
      bio: 'Champion In-Game Leader for Team Soul. Renowned for late-zone rotational composure and strategic split setups.'
    },
    {
      player_id: 3,
      user_id: 4,
      ign: 'SprayGod',
      game_uid: '5391048291',
      real_name: 'Harsh Malik',
      primary_role: 'Entry Fragger',
      secondary_role: 'Assaulter',
      device_type: 'OnePlus 12',
      country: 'India',
      bio: 'BGIS 2024 Champion and MVP fragger. Unstoppable 1v1 duel win rate and pinpoint 6x spray control.'
    },
    {
      player_id: 4,
      user_id: 5,
      ign: 'Goblin',
      game_uid: '5401928374',
      real_name: 'Harsh Chandani',
      primary_role: 'Assaulter',
      secondary_role: 'Entry Fragger',
      device_type: 'iPhone 15 Pro Max',
      country: 'India',
      bio: 'BMPS MVP record holder with unmatched close-quarter agility and explosive clearing ability.'
    },
    {
      player_id: 5,
      user_id: 6,
      ign: 'Sensei',
      game_uid: '5519283741',
      real_name: 'Deepak Negi',
      primary_role: 'IGL',
      secondary_role: 'Support',
      device_type: 'ROG Phone 8 Pro',
      country: 'India',
      bio: 'Master tactician and veteran captain. Specialized in early information gathering and compound defense.'
    },
    {
      player_id: 6,
      user_id: null,
      ign: 'VortexGod',
      game_uid: '5837261940',
      real_name: 'Rahul Verma',
      primary_role: 'Entry Fragger',
      secondary_role: 'Assaulter',
      device_type: 'iQOO 12',
      country: 'India',
      bio: 'Grassroots sensation delivering 500+ ADR in Tier 2/3 official qualifiers. Prime prospect for franchise trials.'
    },
    {
      player_id: 7,
      user_id: null,
      ign: 'ZenithBolt',
      game_uid: '5429103847',
      real_name: 'Sameer Khan',
      primary_role: 'Sniper',
      secondary_role: 'Support',
      device_type: 'iPhone 14 Pro',
      country: 'India',
      bio: 'Miramar and Erangel ridge sniper. Holds 72% first-knock conversion rate in open scrims.'
    },
    {
      player_id: 8,
      user_id: null,
      ign: 'ShadowOP',
      game_uid: '5129384712',
      real_name: 'Aman Sharma',
      primary_role: 'IGL',
      secondary_role: 'Support',
      device_type: 'iPhone 15 Pro',
      country: 'India',
      bio: 'Underdog rotational specialist with 400+ scrim matches captained. Unmatched patience during zone 5 collapses.'
    }
  ],

  team_roster: [
    { roster_id: 1, team_id: 1, player_id: 2, roster_role: 'Captain', joined_date: '2024-01-01', left_date: null, is_active: true }, // Manya - Soul
    { roster_id: 2, team_id: 2, player_id: 1, roster_role: 'Starter', joined_date: '2021-08-20', left_date: null, is_active: true }, // Jonathan - GodL
    { roster_id: 3, team_id: 3, player_id: 3, roster_role: 'Starter', joined_date: '2024-02-15', left_date: null, is_active: true }, // SprayGod - TX
    { roster_id: 4, team_id: 4, player_id: 4, roster_role: 'Starter', joined_date: '2024-01-10', left_date: null, is_active: true }, // Goblin - CG
    { roster_id: 5, team_id: 6, player_id: 5, roster_role: 'Captain', joined_date: '2023-05-01', left_date: null, is_active: true }, // Sensei - RNT
    { roster_id: 6, team_id: 8, player_id: 6, roster_role: 'Starter', joined_date: '2024-06-01', left_date: null, is_active: true }, // Vortex - RCK
    { roster_id: 7, team_id: 8, player_id: 8, roster_role: 'Captain', joined_date: '2024-06-01', left_date: null, is_active: true }, // ShadowOP - RCK
    { roster_id: 8, team_id: 9, player_id: 7, roster_role: 'Starter', joined_date: '2024-07-15', left_date: null, is_active: true }  // Zenith - Blind
  ],

  tournaments: [
    {
      tournament_id: 1,
      organizer_id: 7,
      title: 'BGIS 2026: Battlegrounds Mobile India Series',
      tier: 'Tier 1',
      prize_pool: 20000000.00,
      start_date: '2026-03-01',
      end_date: '2026-04-15',
      format: 'Battle Royale (Squad)',
      status: 'Ongoing'
    },
    {
      tournament_id: 2,
      organizer_id: 7,
      title: 'BMPS 2026: Pro Series Season 4',
      tier: 'Tier 1',
      prize_pool: 10000000.00,
      start_date: '2026-05-10',
      end_date: '2026-06-25',
      format: 'Battle Royale (Squad)',
      status: 'Upcoming'
    },
    {
      tournament_id: 3,
      organizer_id: 7,
      title: 'Krafton India Grassroots Challengers (Tier 2/3)',
      tier: 'Tier 2',
      prize_pool: 1500000.00,
      start_date: '2026-02-01',
      end_date: '2026-02-28',
      format: 'Battle Royale (Squad)',
      status: 'Ongoing'
    },
    {
      tournament_id: 4,
      organizer_id: 7,
      title: 'Daily Official BGMI Open Scrims - Season 8',
      tier: 'Open Scrims',
      prize_pool: 50000.00,
      start_date: '2026-10-01',
      end_date: '2026-10-31',
      format: 'Battle Royale (Squad)',
      status: 'Ongoing'
    }
  ],

  tournament_registrations: [
    { registration_id: 1, tournament_id: 1, team_id: 1, seed_number: 1, registration_status: 'Approved', registered_at: '2026-02-20' },
    { registration_id: 2, tournament_id: 1, team_id: 2, seed_number: 2, registration_status: 'Approved', registered_at: '2026-02-20' },
    { registration_id: 3, tournament_id: 1, team_id: 3, seed_number: 3, registration_status: 'Approved', registered_at: '2026-02-21' },
    { registration_id: 4, tournament_id: 1, team_id: 4, seed_number: 4, registration_status: 'Approved', registered_at: '2026-02-21' },
    { registration_id: 5, tournament_id: 1, team_id: 8, seed_number: 5, registration_status: 'Approved', registered_at: '2026-02-22' }
  ],

  matches: [
    {
      match_id: 1,
      tournament_id: 1,
      match_number: 1,
      stage_name: 'Grand Finals - Match 1',
      map_name: 'Erangel',
      scheduled_time: '2026-04-10 17:30:00',
      status: 'Finished'
    },
    {
      match_id: 2,
      tournament_id: 1,
      match_number: 2,
      stage_name: 'Grand Finals - Match 2',
      map_name: 'Miramar',
      scheduled_time: '2026-04-10 18:30:00',
      status: 'Finished'
    },
    {
      match_id: 3,
      tournament_id: 1,
      match_number: 3,
      stage_name: 'Grand Finals - Match 3',
      map_name: 'Sanhok',
      scheduled_time: '2026-04-10 19:30:00',
      status: 'Scheduled'
    },
    {
      match_id: 4,
      tournament_id: 1,
      match_number: 4,
      stage_name: 'Grand Finals - Match 4',
      map_name: 'Vikendi',
      scheduled_time: '2026-04-10 20:30:00',
      status: 'Scheduled'
    }
  ],

  team_match_results: [
    // Match 1 (Erangel)
    { result_id: 1, match_id: 1, team_id: 3, placement: 1, placement_points: 10, kill_points: 12, total_points: 22 }, // Team XSpark (WWCD)
    { result_id: 2, match_id: 1, team_id: 1, placement: 2, placement_points: 6, kill_points: 8, total_points: 14 },  // Team Soul
    { result_id: 3, match_id: 1, team_id: 2, placement: 3, placement_points: 5, kill_points: 7, total_points: 12 },  // GodLike
    { result_id: 4, match_id: 1, team_id: 4, placement: 4, placement_points: 4, kill_points: 5, total_points: 9 },   // Carnival
    { result_id: 5, match_id: 1, team_id: 8, placement: 5, placement_points: 3, kill_points: 6, total_points: 9 },   // Reckoning Underdogs
    { result_id: 6, match_id: 1, team_id: 6, placement: 6, placement_points: 2, kill_points: 3, total_points: 5 },   // Revenant
    { result_id: 7, match_id: 1, team_id: 7, placement: 7, placement_points: 1, kill_points: 3, total_points: 4 },   // Orangutan
    { result_id: 8, match_id: 1, team_id: 5, placement: 8, placement_points: 0, kill_points: 2, total_points: 2 },   // Global
    
    // Match 2 (Miramar)
    { result_id: 9, match_id: 2, team_id: 1, placement: 1, placement_points: 10, kill_points: 11, total_points: 21 }, // Team Soul (WWCD)
    { result_id: 10, match_id: 2, team_id: 2, placement: 2, placement_points: 6, kill_points: 9, total_points: 15 },  // GodLike
    { result_id: 11, match_id: 2, team_id: 3, placement: 3, placement_points: 5, kill_points: 5, total_points: 10 },  // Team XSpark
    { result_id: 12, match_id: 2, team_id: 8, placement: 4, placement_points: 4, kill_points: 4, total_points: 8 }   // Reckoning
  ],

  player_match_stats: [
    { stat_id: 1, match_id: 1, player_id: 3, team_id: 3, kills: 6, damage_dealt: 940.00, assists: 2, survival_time_seconds: 1420, headshots: 4, revives: 1, mvp_awarded: true }, // SprayGod MVP
    { stat_id: 2, match_id: 1, player_id: 1, team_id: 2, kills: 5, damage_dealt: 880.50, assists: 1, survival_time_seconds: 1310, headshots: 3, revives: 0, mvp_awarded: false }, // Jonathan
    { stat_id: 3, match_id: 1, player_id: 2, team_id: 1, kills: 3, damage_dealt: 510.00, assists: 3, survival_time_seconds: 1390, headshots: 1, revives: 2, mvp_awarded: false }, // Manya
    { stat_id: 4, match_id: 1, player_id: 4, team_id: 4, kills: 4, damage_dealt: 620.00, assists: 0, survival_time_seconds: 1180, headshots: 2, revives: 0, mvp_awarded: false }, // Goblin
    { stat_id: 5, match_id: 1, player_id: 6, team_id: 8, kills: 4, damage_dealt: 590.00, assists: 2, survival_time_seconds: 1240, headshots: 2, revives: 1, mvp_awarded: false }, // Vortex
    { stat_id: 6, match_id: 2, player_id: 2, team_id: 1, kills: 5, damage_dealt: 820.00, assists: 2, survival_time_seconds: 1450, headshots: 2, revives: 1, mvp_awarded: true }  // Manya MVP Match 2
  ],

  scouting_watchlists: [
    {
      watchlist_id: 1,
      scout_id: 1,
      player_id: 6,
      team_id: 8,
      notes: 'VortexGod: Sharp crosshair placement and high duel win rate in T2 Challengers. Prime candidate for T1 Academy trials.',
      created_at: '2026-04-05'
    },
    {
      watchlist_id: 2,
      scout_id: 1,
      player_id: 8,
      team_id: 8,
      notes: 'ShadowOP: Disciplined late-circle edge rotations and flawless smoke line execution.',
      created_at: '2026-04-06'
    },
    {
      watchlist_id: 3,
      scout_id: 1,
      player_id: 7,
      team_id: 9,
      notes: 'ZenithBolt: Miramar first-knock specialist. 70%+ DMR accuracy on moving vehicles.',
      created_at: '2026-04-08'
    }
  ],

  scouting_reports: [
    {
      report_id: 1,
      scout_id: 1,
      player_id: 6,
      aim_rating: 9,
      game_sense_rating: 9,
      communication_rating: 8,
      discipline_rating: 8,
      overall_potential: 'High',
      scout_verdict: 'Ready for Tier 1 franchise trial. Outstanding reaction time in 1v1 close-range encounters.',
      created_at: '2026-04-07'
    },
    {
      report_id: 2,
      scout_id: 1,
      player_id: 8,
      aim_rating: 8,
      game_sense_rating: 9,
      communication_rating: 9,
      discipline_rating: 9,
      overall_potential: 'High',
      scout_verdict: 'Natural In-Game Leader. Keeps squad composed during 4-team sandwich scenarios in zone 5.',
      created_at: '2026-04-08'
    }
  ],

  tryout_applications: [
    {
      application_id: 1,
      team_id: 1,
      player_id: 6,
      role_applied: 'Entry Fragger',
      application_status: 'Trial Offered',
      submission_notes: 'Applying for Soul Academy open trial. 600+ ADR in recent BGIS qualifiers.',
      applied_at: '2026-04-09'
    },
    {
      application_id: 2,
      team_id: 2,
      player_id: 7,
      role_applied: 'Sniper',
      application_status: 'Pending',
      submission_notes: 'GodLike Rising trial candidate. 6 hours/day scrim commitment.',
      applied_at: '2026-04-10'
    },
    {
      application_id: 3,
      team_id: 3,
      player_id: 8,
      role_applied: 'Support',
      application_status: 'Pending',
      submission_notes: 'Applying for Team XSpark substitute squad.',
      applied_at: '2026-04-11'
    }
  ]
};
