import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import PlayersDirectory from './pages/PlayersDirectory';
import TeamsDirectory from './pages/TeamsDirectory';
import Tournaments from './pages/Tournaments';
import MatchScorecard from './pages/MatchScorecard';
import ScoutHub from './pages/ScoutHub';
import Tryouts from './pages/Tryouts';
import { ShieldCheck, Flame, Shield, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedMatchId, setSelectedMatchId] = useState(1);
  const [selectedTeamForTryout, setSelectedTeamForTryout] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bgmi_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login'
  });

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('bgmi_user');
    localStorage.removeItem('bgmi_token');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Background subtle tactical grid */}
      <div className="fixed inset-0 bg-krafton-grid opacity-70 pointer-events-none" />

      {/* Persistent Single-Line Krafton Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab}
            setSelectedPlayerId={setSelectedPlayerId}
            setSelectedMatchId={setSelectedMatchId}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'tournaments' && (
          <Tournaments 
            setActiveTab={setActiveTab}
            setSelectedMatchId={setSelectedMatchId}
          />
        )}

        {activeTab === 'scorecard' && (
          <MatchScorecard 
            selectedMatchId={selectedMatchId}
            setSelectedMatchId={setSelectedMatchId}
          />
        )}

        {activeTab === 'teams' && (
          <TeamsDirectory 
            setActiveTab={setActiveTab}
            setSelectedTeamForTryout={setSelectedTeamForTryout}
          />
        )}

        {activeTab === 'players' && (
          <PlayersDirectory 
            setActiveTab={setActiveTab}
            setSelectedPlayerId={setSelectedPlayerId}
          />
        )}

        {activeTab === 'scouthub' && (
          <ScoutHub 
            selectedPlayerId={selectedPlayerId}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'tryouts' && (
          <Tryouts 
            selectedTeamForTryout={selectedTeamForTryout}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      {/* Auth Modal (Login & Signup) */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuth}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Official Krafton Esports Footer */}
      <footer className="relative z-10 bg-[#06080c] border-t border-krafton-border py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-krafton-border/60">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-lg tracking-tight text-white">
                KRAFTON
              </span>
              <div className="h-4 w-px bg-slate-700" />
              <span className="font-display font-black text-xs uppercase tracking-widest text-krafton-gold">
                BATTLEGROUNDS MOBILE INDIA
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">RULEBOOK</span>
              <span className="hover:text-white cursor-pointer transition-colors">ANTI-CHEAT POLICY</span>
              <span className="hover:text-white cursor-pointer transition-colors">BGIS 2026</span>
              <span className="hover:text-white cursor-pointer transition-colors">BMPS 2026</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© 2026 KRAFTON, Inc. All rights reserved. BATTLEGROUNDS MOBILE INDIA is a registered trademark of KRAFTON, Inc.</p>
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="text-slate-400">Official BGMI Competitive Network</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
