import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token if present in localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('bgmi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Health
  getHealth: () => client.get('/health'),

  // Auth
  signup: (data) => client.post('/auth/signup', data),
  login: (data) => client.post('/auth/login', data),
  getMe: () => client.get('/auth/me'),

  // Players
  getPlayers: () => client.get('/players'),

  // Teams
  getTeams: () => client.get('/teams'),

  // Tournaments & Matches
  getTournaments: () => client.get('/tournaments'),
  getMatches: () => client.get('/matches'),
  getMatchScorecard: (id) => client.get(`/matches/${id}/scorecard`),

  // Scouting
  getWatchlist: () => client.get('/scout/watchlist'),
  getReports: () => client.get('/scout/reports'),
  createReport: (data) => client.post('/scout/reports', data),

  // Tryouts
  getTryouts: () => client.get('/tryouts'),
  applyTryout: (data) => client.post('/tryouts/apply', data),
};

export default api;
