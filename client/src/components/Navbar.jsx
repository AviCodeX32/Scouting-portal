import React from 'react';
import { 
  Trophy, 
  Users, 
  UserCheck, 
  Crosshair, 
  FileText, 
  LayoutDashboard, 
  User,
  LogOut,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onOpenAuth, 
  onLogout 
}) {
  const navItems = [
    { id: 'dashboard', label: 'HOME', icon: LayoutDashboard },
    { id: 'tournaments', label: 'TOURNAMENTS', icon: Trophy },
    { id: 'scorecard', label: 'STANDINGS', icon: Award },
    { id: 'teams', label: 'TEAMS', icon: Users },
    { id: 'players', label: 'PLAYERS', icon: Crosshair },
    { id: 'scouthub', label: 'SCOUT HUB', icon: FileText },
    { id: 'tryouts', label: 'TRYOUTS', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080a0f]/95 backdrop-blur-md border-b border-krafton-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Krafton Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Krafton Bold Box */}
            <div className="flex items-center">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-krafton-gold transition-colors">
                KRAFTON
              </span>
              <div className="h-4 w-px bg-slate-700 mx-2.5" />
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xs uppercase tracking-widest text-krafton-gold">
                  BGMI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/10 text-krafton-gold border border-amber-500/30 px-1.5 py-0.5 rounded">
                  ESPORTS
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-xs font-black tracking-wider transition-all relative ${
                    isActive
                      ? 'text-krafton-gold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-krafton-gold rounded-full shadow-krafton-gold" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Auth Controls */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-[#111622] border border-krafton-border px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-krafton-gold text-slate-950 font-black text-xs flex items-center justify-center">
                  {(currentUser.ign || currentUser.username || 'P')[0].toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white leading-none">
                      {currentUser.ign || currentUser.username}
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-slate-800 text-krafton-gold px-1 rounded">
                      {currentUser.role || 'Player'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    UID: {currentUser.game_uid || 'Verified'}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase text-slate-300 hover:text-white border border-krafton-border hover:border-slate-600 transition-all"
                >
                  LOG IN
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase bg-krafton-gold hover:bg-amber-400 text-slate-950 shadow-krafton-gold transition-all"
                >
                  SIGN UP
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Horizontal Sub-bar */}
        <div className="flex xl:hidden overflow-x-auto py-2 border-t border-krafton-border gap-2 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-bold transition-all ${
                  isActive
                    ? 'bg-krafton-gold text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
