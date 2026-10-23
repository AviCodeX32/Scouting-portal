import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight,
  Shield,
  FileSpreadsheet,
  Award
} from 'lucide-react';
import api from '../services/api';

export default function Tournaments({ setActiveTab, setSelectedMatchId }) {
  const [tournaments, setTournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const [tourneysRes, matchesRes] = await Promise.all([
          api.getTournaments(),
          api.getMatches()
        ]);
        setTournaments(tourneysRes.data || []);
        setMatches(matchesRes.data || []);
      } catch (err) {
        console.error('Error fetching tournaments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredTournaments = tournaments.filter(t => {
    if (statusFilter === 'ALL') return true;
    return t.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              Official BGMI Tournament Circuits
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official BGIS & BMPS championship seasons, grassroots open qualifiers, and daily competitive scrims.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 bg-[#0c0f17] p-1 rounded-xl border border-krafton-border self-start md:self-auto">
          {['ALL', 'Ongoing', 'Upcoming', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-krafton-gold text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-krafton-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 mt-3 font-mono">Loading tournament schedule...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTournaments.map((tourney) => {
            const tournamentMatches = matches.filter(m => m.tournament_id === tourney.tournament_id);

            return (
              <div
                key={tourney.tournament_id}
                className="bg-krafton-card rounded-2xl border border-krafton-border hover:border-krafton-gold/40 p-6 transition-all duration-300 shadow-card-dark"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-krafton-border">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black uppercase tracking-wider ${
                        tourney.tier === 'Tier 1'
                          ? 'bg-amber-950 text-krafton-gold border border-amber-800'
                          : tourney.tier === 'Tier 2'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {tourney.tier}
                      </span>
                      <h2 className="text-xl font-black text-white uppercase">{tourney.title}</h2>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 flex-wrap font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>{tourney.start_date} to {tourney.end_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-slate-500" />
                        <span>Format: {tourney.format}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#0b0e15] px-4 py-2 rounded-xl border border-krafton-border text-right">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block font-bold">Prize Pool</span>
                      <span className="text-lg font-mono font-black text-emerald-400">
                        ₹{Number(tourney.prize_pool).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${
                      tourney.status === 'Ongoing'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : tourney.status === 'Upcoming'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tourney.status}
                    </span>
                  </div>
                </div>

                {/* Associated Matches */}
                <div className="mt-5">
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Scheduled Fixtures & Map Scorecards
                  </h4>

                  {tournamentMatches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {tournamentMatches.map((match) => (
                        <div
                          key={match.match_id}
                          className="p-3.5 rounded-xl bg-[#0c0f17] border border-krafton-border hover:border-slate-700 transition-all flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">
                                Match #{match.match_number}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-krafton-gold font-bold">
                                {match.map_name}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{match.stage_name}</p>
                          </div>

                          <button
                            onClick={() => {
                              if (setSelectedMatchId) setSelectedMatchId(match.match_id);
                              setActiveTab('scorecard');
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-krafton-gold text-krafton-gold hover:text-slate-950 border border-amber-500/30 text-xs font-black font-mono uppercase transition-all"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Scorecard</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Fixtures will be published after the qualifier round closes.</p>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
