import React, { useState, useEffect } from 'react';
import { Users, Shield, PlusCircle, UserCheck, Flame, ChevronRight, Award, Trophy } from 'lucide-react';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function TeamsDirectory({ setActiveTab, setSelectedTeamForTryout }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await api.getTeams();
        setTeams(res.data || []);
      } catch (err) {
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(t => {
    if (filter === 'ALL') return true;
    if (filter === 'UNDERDOG') return t.is_underdog;
    if (filter === 'PRO') return !t.is_underdog;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              BGMI Esports Franchises & Underdogs
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official BGIS/BMPS squads, grassroots challenger rosters, and academy trial spots.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-[#0c0f17] p-1 rounded-xl border border-krafton-border self-start md:self-auto">
          {[
            { id: 'ALL', label: 'All Teams' },
            { id: 'PRO', label: 'Tier 1 Pro' },
            { id: 'UNDERDOG', label: 'Underdog Contenders' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                filter === f.id
                  ? 'bg-krafton-gold text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-krafton-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 mt-3 font-mono">Loading official BGMI rosters...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.team_id}
              className="bg-krafton-card rounded-2xl border border-krafton-border hover:border-krafton-gold/50 p-6 transition-all duration-300 flex flex-col justify-between shadow-card-dark"
            >
              <div>
                {/* Team Info Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#0a0d14] border border-krafton-border flex items-center justify-center p-1.5 shadow-md">
                      <TeamLogo tag={team.team_tag} teamName={team.team_name} logoKey={team.logo_key} className="w-13 h-13" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-white uppercase">{team.team_name}</h2>
                        <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-[#0a0d14] text-krafton-gold border border-krafton-border">
                          {team.team_tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Tier: <span className="text-white font-bold">{team.tier || (team.is_underdog ? 'Tier 2 Challenger' : 'Tier 1 Pro')}</span>
                      </p>
                      {team.achievements && (
                        <p className="text-[11px] text-amber-400/90 font-medium mt-0.5 flex items-center gap-1">
                          <Trophy className="w-3 h-3 flex-shrink-0" />
                          <span>{team.achievements}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {team.is_underdog ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-emerald-400" />
                      <span>Underdog</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-950 text-krafton-gold border border-amber-800 flex items-center gap-1">
                      <Award className="w-3 h-3 text-krafton-gold" />
                      <span>BGIS Pro</span>
                    </span>
                  )}
                </div>

                {/* Active Roster List */}
                <div className="mt-5 space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Official Competitive Roster
                  </h4>

                  {team.roster && team.roster.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {team.roster.map((player) => (
                        <div
                          key={player.player_id}
                          className="p-2.5 rounded-xl bg-[#0b0e15] border border-krafton-border flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-bold text-white">{player.ign}</p>
                            <p className="text-[10px] font-mono text-slate-400">{player.primary_role}</p>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            player.roster_role === 'Captain' 
                              ? 'bg-amber-950 text-krafton-gold border border-amber-800/60' 
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {player.roster_role}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#0b0e15] border border-krafton-border text-xs text-slate-400 italic">
                      Squad roster currently preparing for national qualifiers.
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="mt-6 pt-4 border-t border-krafton-border flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {team.active_members || (team.roster ? team.roster.length : 0)} Registered Starters
                </span>
                <button
                  onClick={() => {
                    if (setSelectedTeamForTryout) setSelectedTeamForTryout(team.team_id);
                    setActiveTab('tryouts');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-krafton-gold hover:text-amber-400 uppercase tracking-wider transition-colors font-mono"
                >
                  <span>Apply for Roster Trial</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
