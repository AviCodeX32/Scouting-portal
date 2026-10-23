import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Crosshair, 
  Smartphone, 
  Shield, 
  Flame, 
  Award, 
  UserPlus,
  MapPin,
  IdCard
} from 'lucide-react';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function PlayersDirectory({ setActiveTab, setSelectedPlayerId }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await api.getPlayers();
        setPlayers(res.data || []);
      } catch (err) {
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  const roles = ['ALL', 'Assaulter', 'Entry Fragger', 'IGL', 'Support', 'Sniper'];

  const filteredPlayers = players.filter(p => {
    const matchesSearch = 
      p.ign?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.real_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.game_uid?.includes(searchTerm);
    const matchesRole = roleFilter === 'ALL' || p.primary_role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              BGMI Player & Talent Directory
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Verified BGMI athletes, official game UIDs, and competitive performance statistics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by IGN, Real Name, UID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Role Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-bold uppercase font-mono mr-2">
          Filter Role:
        </span>
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              roleFilter === role
                ? 'bg-krafton-gold text-slate-950 shadow-sm font-black'
                : 'bg-[#0a0d14] text-slate-400 hover:text-white border border-krafton-border'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Player Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-krafton-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 mt-3 font-mono">Loading player roster data...</p>
        </div>
      ) : filteredPlayers.length === 0 ? (
        <div className="py-16 text-center bg-krafton-card rounded-2xl border border-krafton-border">
          <Crosshair className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base font-bold text-slate-300 mt-3">No athletes match your query</p>
          <p className="text-xs text-slate-500 mt-1">Try searching by official Game UID or IGN.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlayers.map((player) => (
            <div
              key={player.player_id}
              className="bg-krafton-card rounded-2xl border border-krafton-border hover:border-krafton-gold/50 p-5 transition-all duration-200 flex flex-col justify-between shadow-card-dark group"
            >
              <div>
                {/* Header: IGN, Team Tag, Role */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0a0d14] border border-krafton-border flex items-center justify-center p-1">
                      <TeamLogo tag={player.team_tag} teamName={player.team_name} className="w-9 h-9" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white group-hover:text-krafton-gold transition-colors">
                          {player.ign}
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#0a0d14] text-krafton-gold border border-krafton-border">
                          {player.team_tag || 'FA'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {player.real_name} • <span className="font-mono text-slate-500 font-semibold">UID: {player.game_uid}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase bg-[#0a0d14] text-slate-200 border border-krafton-border">
                    {player.primary_role}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed italic bg-[#0a0d14] p-3 rounded-xl border border-krafton-border/80">
                  "{player.bio || 'Verified BGMI competitive athlete.'}"
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-krafton-border text-center">
                  <div className="bg-[#0b0e15] p-2 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Avg ADR</span>
                    <span className="text-sm font-mono font-black text-krafton-gold">{player.avg_damage || '0.0'}</span>
                  </div>
                  <div className="bg-[#0b0e15] p-2 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Finishes</span>
                    <span className="text-sm font-mono font-black text-red-400">{player.total_kills || '0'}</span>
                  </div>
                  <div className="bg-[#0b0e15] p-2 rounded-xl border border-krafton-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Headshots</span>
                    <span className="text-sm font-mono font-black text-amber-400">{player.total_headshots || '0'}</span>
                  </div>
                </div>

                {/* Secondary Meta */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{player.device_type || 'iPhone 15 Pro Max'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{player.country || 'India'}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-krafton-border flex items-center gap-2">
                <button
                  onClick={() => {
                    if (setSelectedPlayerId) setSelectedPlayerId(player.player_id);
                    setActiveTab('scouthub');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wider uppercase shadow-krafton-gold transition-all flex items-center justify-center gap-1.5"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Evaluate Player</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
