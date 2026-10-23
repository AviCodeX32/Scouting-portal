import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Crosshair, 
  Trophy, 
  FileText, 
  ArrowRight, 
  Flame, 
  Award, 
  ChevronRight,
  Shield,
  Sparkles,
  Zap,
  Play
} from 'lucide-react';
import StatCard from '../components/StatCard';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function Dashboard({ setActiveTab, setSelectedPlayerId, setSelectedMatchId, onOpenAuth, currentUser }) {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [playersRes, teamsRes, tourneysRes, reportsRes] = await Promise.all([
          api.getPlayers(),
          api.getTeams(),
          api.getTournaments(),
          api.getReports().catch(() => ({ data: [] }))
        ]);
        setPlayers(playersRes.data || []);
        setTeams(teamsRes.data || []);
        setTournaments(tourneysRes.data || []);
        setReports(reportsRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const topFraggers = [...players].sort((a, b) => (b.avg_damage || 0) - (a.avg_damage || 0)).slice(0, 5);
  const featuredTeams = teams.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Official BGMI Tournament Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121622] via-[#0d1017] to-[#1a1205] border border-krafton-border p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-krafton-gold text-xs font-mono font-bold mb-4">
            <Flame className="w-3.5 h-3.5 text-krafton-gold" />
            <span>BATTLEGROUNDS MOBILE INDIA OFFICIAL SCOUTING PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans leading-tight">
            THE PATH TO <span className="text-krafton-gold">BGIS & BMPS</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Official Krafton India scouting and recruitment ecosystem. Track live competitive match scorecards, discover verified grassroots talent, and scout India's elite competitive rosters.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('tournaments')}
              className="flex items-center gap-2 bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-krafton-gold transition-all"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore Tournaments</span>
            </button>

            <button
              onClick={() => setActiveTab('players')}
              className="flex items-center gap-2 bg-[#171d2b] hover:bg-[#1e2638] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider border border-krafton-border transition-all"
            >
              <Crosshair className="w-4 h-4 text-krafton-gold" />
              <span>Browse Player Directory</span>
            </button>

            {!currentUser && (
              <button
                onClick={() => onOpenAuth('signup')}
                className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider border border-slate-700 transition-all"
              >
                <span>Register Player Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Verified BGMI Athletes"
          value={loading ? '--' : players.length}
          subtitle="Official Game UIDs"
          trend="Grassroots & Pros"
          icon={Crosshair}
          accent="gold"
        />
        <StatCard
          title="Competitive Teams"
          value={loading ? '--' : teams.length}
          subtitle="BGIS Franchises & Underdogs"
          trend="Active Rosters"
          icon={Users}
          accent="blue"
        />
        <StatCard
          title="Official Tournaments"
          value={loading ? '--' : tournaments.length}
          subtitle="BGIS, BMPS & Open Scrims"
          trend="₹3.15 Crore Pool"
          icon={Trophy}
          accent="red"
        />
        <StatCard
          title="Calibrated Scout Reports"
          value={loading ? '--' : reports.length}
          subtitle="Aim, Game Sense & Comms"
          trend="Verified Rubric"
          icon={FileText}
          accent="emerald"
        />
      </div>

      {/* Famous BGMI Teams Showcase Bar */}
      <div className="bg-krafton-card rounded-2xl border border-krafton-border p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-krafton-border">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-krafton-gold" />
            <h2 className="text-base font-black text-white uppercase tracking-wider font-sans">
              Official Competitive Teams & Franchises
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('teams')}
            className="text-xs font-bold text-krafton-gold hover:text-amber-400 flex items-center gap-1 uppercase tracking-wider font-mono"
          >
            <span>View All ({teams.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {teams.slice(0, 6).map((team) => (
            <div
              key={team.team_id}
              onClick={() => setActiveTab('teams')}
              className="bg-[#0c0f17] hover:bg-[#161c28] p-4 rounded-xl border border-krafton-border hover:border-krafton-gold/50 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 flex items-center justify-center p-1 transition-transform group-hover:scale-110">
                <TeamLogo tag={team.team_tag} teamName={team.team_name} logoKey={team.logo_key} className="w-12 h-12" />
              </div>
              <h3 className="text-xs font-black text-white mt-3 group-hover:text-krafton-gold transition-colors">
                {team.team_name}
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">
                {team.team_tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Top Performers & Live Circuits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Fraggers Leaderboard (8 cols) */}
        <div className="lg:col-span-8 bg-krafton-card rounded-2xl border border-krafton-border p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-krafton-border">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-krafton-gold" />
              <h2 className="text-base font-black text-white uppercase tracking-wider font-sans">
                Top Competitive Fraggers (ADR & Finishes)
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('players')}
              className="text-xs font-bold text-krafton-gold hover:text-amber-400 flex items-center gap-1 uppercase tracking-wider font-mono"
            >
              <span>Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase font-mono border-b border-krafton-border">
                  <th className="py-3 px-3">Rank / Athlete</th>
                  <th className="py-3 px-3">Team</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3 text-right">Avg ADR</th>
                  <th className="py-3 px-3 text-right">Finishes</th>
                  <th className="py-3 px-3 text-center">Scout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-krafton-border/60">
                {topFraggers.map((player, idx) => (
                  <tr key={player.player_id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-black ${
                          idx === 0 
                            ? 'bg-krafton-gold text-slate-950 font-black shadow-krafton-gold' 
                            : idx === 1 
                            ? 'bg-slate-300 text-slate-950' 
                            : idx === 2 
                            ? 'bg-amber-700 text-white' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-white hover:text-krafton-gold cursor-pointer text-sm">
                            {player.ign}
                          </p>
                          <p className="text-[11px] font-mono text-slate-400">UID: {player.game_uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <TeamLogo tag={player.team_tag} teamName={player.team_name} className="w-6 h-6" />
                        <span className="text-xs font-semibold text-slate-200">{player.team_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#0c0f17] text-slate-300 border border-krafton-border">
                        {player.primary_role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-extrabold text-krafton-gold">
                      {player.avg_damage}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-black text-red-400">
                      {player.total_kills}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => {
                          if (setSelectedPlayerId) setSelectedPlayerId(player.player_id);
                          setActiveTab('scouthub');
                        }}
                        className="px-2.5 py-1 text-xs font-bold rounded bg-krafton-gold/10 hover:bg-krafton-gold text-krafton-gold hover:text-slate-950 border border-amber-500/30 transition-all font-mono uppercase"
                      >
                        Scout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Tournaments & Standings Link (4 cols) */}
        <div className="lg:col-span-4 bg-krafton-card rounded-2xl border border-krafton-border p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-krafton-border">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-krafton-gold" />
                <h3 className="text-base font-black text-white uppercase tracking-wider font-sans">
                  Current Circuits
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('tournaments')}
                className="text-xs font-bold text-krafton-gold hover:text-amber-400 font-mono"
              >
                All &rarr;
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {tournaments.slice(0, 3).map((t) => (
                <div
                  key={t.tournament_id}
                  onClick={() => {
                    if (setSelectedMatchId) setSelectedMatchId(1);
                    setActiveTab('scorecard');
                  }}
                  className="p-3.5 rounded-xl bg-[#0c0f17] border border-krafton-border hover:border-slate-700 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-krafton-gold">
                      {t.tier}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      t.status === 'Ongoing'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-blue-950 text-blue-400 border border-blue-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{t.title}</h4>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-krafton-border/60">
                    <span className="text-slate-400 font-mono text-[10px]">Prize Pool</span>
                    <span className="font-mono font-black text-emerald-400">
                      ₹{Number(t.prize_pool).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (setSelectedMatchId) setSelectedMatchId(1);
              setActiveTab('scorecard');
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-krafton-gold transition-all"
          >
            Open Grand Finals Scorecard
          </button>
        </div>

      </div>

    </div>
  );
}
