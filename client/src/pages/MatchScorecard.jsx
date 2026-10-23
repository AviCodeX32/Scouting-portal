import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Award, 
  Crosshair, 
  Clock, 
  MapPin, 
  Shield, 
  Sparkles,
  Zap
} from 'lucide-react';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function MatchScorecard({ selectedMatchId, setSelectedMatchId }) {
  const [matchId, setMatchId] = useState(selectedMatchId || 1);
  const [matches, setMatches] = useState([]);
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedMatchId) {
      setMatchId(selectedMatchId);
    }
  }, [selectedMatchId]);

  useEffect(() => {
    async function loadMatchesList() {
      try {
        const res = await api.getMatches();
        setMatches(res.data || []);
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    }
    loadMatchesList();
  }, []);

  useEffect(() => {
    async function fetchScorecard() {
      setLoading(true);
      try {
        const res = await api.getMatchScorecard(matchId);
        setScorecard(res.data);
      } catch (err) {
        console.error('Error fetching scorecard:', err);
      } finally {
        setLoading(false);
      }
    }
    if (matchId) {
      fetchScorecard();
    }
  }, [matchId]);

  const handleMatchSelect = (id) => {
    setMatchId(id);
    if (setSelectedMatchId) setSelectedMatchId(id);
  };

  const standings = scorecard?.standings || [];
  const matchInfo = scorecard?.match || {};
  const mvp = scorecard?.mvp;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header and Match Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              BGIS Official Match Standings & Scorecard
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official Krafton 10-Point Scoring Matrix: Placement Points + Kill Points = Total Points.
          </p>
        </div>

        {/* Match Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0c0f17] p-1.5 rounded-xl border border-krafton-border">
          <span className="text-xs font-mono font-bold text-slate-400 px-2 uppercase">Select Map:</span>
          {matches.map((m) => (
            <button
              key={m.match_id}
              onClick={() => handleMatchSelect(m.match_id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase transition-all ${
                Number(matchId) === Number(m.match_id)
                  ? 'bg-krafton-gold text-slate-950 shadow-krafton-gold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              #{m.match_number} {m.map_name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-krafton-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 mt-3 font-mono">Calibrating official points matrix...</p>
        </div>
      ) : (
        <>
          {/* Match Stage & Map Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-krafton-card rounded-2xl border border-krafton-border p-5 shadow-card-dark">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Championship Stage</span>
              <p className="text-base font-bold text-white mt-0.5">{matchInfo.stage_name || 'Grand Finals'}</p>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">Match #{matchInfo.match_number || 1}</p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Battleground Map</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-krafton-gold" />
                <span className="text-base font-bold text-krafton-gold uppercase">{matchInfo.map_name || 'Erangel'}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">Mode: TPP Squad</p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Match Status</span>
              <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{matchInfo.status || 'Finished'}</span>
              </span>
            </div>
          </div>

          {/* MVP Spotlight Banner */}
          {mvp && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#211604] via-[#141926] to-[#0c0f17] border border-amber-500/40 p-5 shadow-krafton-gold">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-krafton-gold text-slate-950 flex items-center justify-center font-black shadow-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded bg-krafton-gold text-slate-950">
                        OFFICIAL MATCH MVP
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-300">Team: {mvp.team_tag}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {mvp.ign} <span className="text-sm font-normal text-slate-400">({mvp.primary_role})</span>
                    </h3>
                  </div>
                </div>

                {/* MVP Stats */}
                <div className="grid grid-cols-3 gap-3 text-center sm:text-right">
                  <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Finishes</span>
                    <span className="text-xl font-mono font-black text-red-400">{mvp.kills}</span>
                  </div>
                  <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Damage</span>
                    <span className="text-xl font-mono font-black text-krafton-gold">{mvp.damage_dealt}</span>
                  </div>
                  <div className="bg-[#0b0e15] p-2.5 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Headshots</span>
                    <span className="text-xl font-mono font-black text-amber-400">{mvp.headshots}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Standings Table with Real Team Logos */}
          <div className="bg-krafton-card rounded-2xl border border-krafton-border overflow-hidden shadow-card-dark">
            <div className="p-4 bg-[#0c0f17] border-b border-krafton-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-krafton-gold" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Overall Match Standings (Official Points Table)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">#1 WWCD: 10 Pts • Finish: 1 Pt</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#0a0d14] text-slate-400 text-xs font-mono uppercase border-b border-krafton-border">
                    <th className="py-3 px-4 text-center w-16">Rank</th>
                    <th className="py-3 px-4">Franchise / Squad</th>
                    <th className="py-3 px-4 text-center">Placement</th>
                    <th className="py-3 px-4 text-center">Position Pts</th>
                    <th className="py-3 px-4 text-center">Finish Pts</th>
                    <th className="py-3 px-4 text-right pr-6">Total Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-krafton-border/60">
                  {standings.map((team, idx) => {
                    const isWinner = team.placement === 1;

                    return (
                      <tr 
                        key={team.result_id || idx} 
                        className={`transition-colors ${
                          isWinner 
                            ? 'bg-gradient-to-r from-amber-500/10 via-[#131823] to-[#131823] font-semibold' 
                            : 'hover:bg-slate-800/20'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-mono text-xs font-black ${
                            idx === 0 
                              ? 'bg-krafton-gold text-slate-950 shadow-krafton-gold' 
                              : idx === 1 
                              ? 'bg-slate-300 text-slate-950' 
                              : idx === 2 
                              ? 'bg-amber-700 text-white' 
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            #{idx + 1}
                          </span>
                        </td>

                        {/* Team Name with Official Logo */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0a0d14] border border-krafton-border flex items-center justify-center p-0.5">
                              <TeamLogo tag={team.team_tag} teamName={team.team_name} className="w-7 h-7" />
                            </div>
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#0a0d14] text-krafton-gold border border-krafton-border">
                              {team.team_tag}
                            </span>
                            <span className="font-bold text-white text-sm">
                              {team.team_name}
                            </span>
                            {isWinner && (
                              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-krafton-gold text-slate-950 shadow-krafton-gold">
                                <Sparkles className="w-3 h-3" />
                                <span>WWCD #1</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Placement */}
                        <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                          #{team.placement}
                        </td>

                        {/* Placement Points */}
                        <td className="py-3.5 px-4 text-center font-mono font-semibold text-emerald-400">
                          {team.placement_points}
                        </td>

                        {/* Kill Points */}
                        <td className="py-3.5 px-4 text-center font-mono font-semibold text-red-400">
                          {team.kill_points}
                        </td>

                        {/* Total Points */}
                        <td className="py-3.5 px-4 text-right pr-6">
                          <span className="text-base font-mono font-black text-white bg-[#0b0e15] px-3.5 py-1 rounded-xl border border-krafton-border">
                            {team.total_points}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
