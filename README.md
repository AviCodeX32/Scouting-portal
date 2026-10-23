# Underdog Esports Scouting Portal

A full-stack, production-ready prototype for an **Underdog Esports Scouting Portal** (inspired by platforms like Krafton India, tailored for grassroots BGMI / T3 / T2 competitive talent).

---

## 1. Project Architecture & Directory Structure

```text
BGMI scouting portal/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Persistent nav with brand & DB indicator
│   │   │   ├── StatCard.jsx         # Metric card with neon accents & trend indicators
│   │   │   └── RatingSlider.jsx     # 1-10 slider component with dynamic tiers
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Summary metrics, top fraggers & featured underdogs
│   │   │   ├── PlayersDirectory.jsx # Searchable directory with ADR, UID, role filters
│   │   │   ├── TeamsDirectory.jsx   # Team rosters, underdog status, starter lists
│   │   │   ├── Tournaments.jsx      # Tier 3/2/1/Scrims listing, prize pools & dates
│   │   │   ├── MatchScorecard.jsx   # Krafton points table (Rank, Placement, Kills, Total)
│   │   │   ├── ScoutHub.jsx         # Watchlist & 1-10 slider scouting assessment form
│   │   │   └── Tryouts.jsx          # Open tryout postings & application submission modal
│   │   ├── services/
│   │   │   └── api.js               # Axios client
│   │   ├── App.jsx                  # Main application coordinator
│   │   ├── index.css                # Tailwind directives & esports cyber styling
│   │   └── main.jsx                 # Vite entry point
│   ├── index.html
│   ├── .env                         # VITE_API_URL=http://localhost:5000/api
│   ├── tailwind.config.js           # Dark theme (slate-950/900) & neon accents
│   ├── postcss.config.js
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js                    # pg.Pool with Neon SSL & fallback support
│   ├── controllers/
│   │   ├── scoutController.js       # Watchlists, 1-10 ratings, tryout applications
│   │   └── tournamentController.js  # Matches, scorecards, players, teams
│   ├── data/
│   │   └── mockStore.js             # High-fidelity in-memory store matching all 12 tables
│   ├── routes/
│   │   └── api.js                   # REST API routes
│   ├── schema.sql                   # All 12 PostgreSQL relational database tables
│   ├── seed.js                      # Seeds all 12 tables (reads schema.sql & inserts)
│   ├── index.js                     # Express server setup with CORS
│   ├── .env                         # PORT=5000, DATABASE_URL, NEON_AUTH_SECRET, CORS_ORIGIN
│   └── package.json
├── package.json                     # Root monorepo script runner
└── README.md
```

---

## 2. Environment Configurations

### `server/.env`
```env
PORT=5000
DATABASE_URL=postgresql://[neon_user]:[neon_password]@[neon_host]/[dbname]?sslmode=require
NEON_AUTH_SECRET=your_neon_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_NEON_AUTH_URL=https://[neon_auth_endpoint].neon.tech
```

---

## 3. The 12 Relational Database Tables

1. **`users`**: Scouts, players, team managers, organizers, admins.
2. **`teams`**: Registered teams with tags, underdog status, and manager links.
3. **`players`**: In-game names (IGN), game UIDs, real names, primary roles (IGL, Assaulter, Entry Fragger, Support, Sniper), devices, country.
4. **`team_roster`**: Active squad roster links (Starter, Substitute, Captain).
5. **`tournaments`**: Tier 3, Tier 2, Tier 1, and Open Scrim circuits with prize pools and schedules.
6. **`tournament_registrations`**: Team seeds and registration approvals.
7. **`matches`**: Fixtures with stages, maps (Erangel, Miramar, Sanhok, Vikendi), and scheduled times.
8. **`team_match_results`**: Official placement points and kill points with stored generated `total_points`.
9. **`player_match_stats`**: Kills, damage dealt (ADR), assists, survival time, headshots, and MVP awards.
10. **`scouting_watchlists`**: Scout observation notes on rising prospects.
11. **`scouting_reports`**: Quantitative 1–10 ratings for Aim, Game Sense, Communication, and Discipline, plus Potential and Scout Verdict.
12. **`tryout_applications`**: Trial applications with role applied, notes, and statuses.

---

## 4. Quick Start & Execution

### Step 1: Install Dependencies
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### Step 2: Seed Database
```bash
cd ../server
npm run seed
```
*(If a live Neon `DATABASE_URL` is provided, `seed.js` executes `schema.sql` and populates all 12 tables. If credentials are placeholder, the server seamlessly runs in in-memory demo mode with all 12 tables seeded so the portal works immediately!)*

### Step 3: Run the Servers
In terminal 1 (Backend - Port 5000):
```bash
cd server
npm run dev
```

In terminal 2 (Frontend - Port 5173):
```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 5. API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Database connection status and server health |
| `/api/players` | GET | List players with aggregated ADR, total kills, and team tag |
| `/api/teams` | GET | List teams with active roster counts and player details |
| `/api/tournaments` | GET | List tournaments ordered by date |
| `/api/matches` | GET | List tournament matches and maps |
| `/api/matches/:id/scorecard` | GET | Official Krafton competitive points table and MVP |
| `/api/scout/watchlist` | GET | Scouting watchlist entries |
| `/api/scout/reports` | GET | List submitted scouting reports |
| `/api/scout/reports` | POST | Submit a 1–10 rating report with scout verdict |
| `/api/tryouts` | GET | List tryout applications |
| `/api/tryouts/apply` | POST | Submit a new tryout application |
