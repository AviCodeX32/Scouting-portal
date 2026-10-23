import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Smartphone, 
  Crosshair, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Award,
  IdCard
} from 'lucide-react';
import api from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    player_id: '',
    password: ''
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    real_name: '',
    ign: '',
    game_uid: '',
    username: '',
    email: '',
    password: '',
    role: 'player',
    primary_role: 'Assaulter',
    device_type: 'iPhone 15 Pro Max',
    bio: ''
  });

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.player_id.trim() || !loginForm.password) {
      setErrorMessage('Please enter your Player ID / Username and Password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await api.login({
        player_id: loginForm.player_id.trim(),
        password: loginForm.password
      });

      setSuccessMessage('Welcome back, ' + (res.data.user.ign || res.data.user.username) + '!');
      localStorage.setItem('bgmi_user', JSON.stringify(res.data.user));
      localStorage.setItem('bgmi_token', res.data.token);

      setTimeout(() => {
        onAuthSuccess(res.data.user);
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Invalid credentials. Try Jonathan or Manya.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupForm.ign.trim() || !signupForm.email.trim() || !signupForm.password) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        username: signupForm.username.trim() || signupForm.ign.toLowerCase().replace(/\s+/g, '_'),
        real_name: signupForm.real_name.trim(),
        ign: signupForm.ign.trim(),
        game_uid: signupForm.game_uid.trim() || Math.floor(5100000000 + Math.random() * 4800000000).toString(),
        email: signupForm.email.trim(),
        password: signupForm.password,
        role: signupForm.role,
        primary_role: signupForm.primary_role,
        device_type: signupForm.device_type,
        bio: signupForm.bio || 'Verified BGMI grassroots contender.'
      };

      const res = await api.signup(payload);
      setSuccessMessage('BGMI Profile registered! Logging you in...');
      
      const loggedUser = {
        ...res.data.user,
        ...res.data.player
      };

      localStorage.setItem('bgmi_user', JSON.stringify(loggedUser));

      setTimeout(() => {
        onAuthSuccess(loggedUser);
        onClose();
      }, 900);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Signup failed. Please check information.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for testing
  const quickFillPlayer = (ign, uid) => {
    setLoginForm({
      player_id: uid || ign,
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111622] border border-krafton-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-krafton-border">
          <div className="w-8 h-8 rounded-lg bg-krafton-gold flex items-center justify-center text-slate-950 font-black text-sm">
            K
          </div>
          <div>
            <h2 className="text-lg font-black tracking-wider text-white uppercase font-sans">
              KRAFTON ESPORTS <span className="text-krafton-gold">PORTAL</span>
            </h2>
            <p className="text-xs text-slate-400">Battlegrounds Mobile India Competitive ID</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 bg-[#0a0d14] p-1 rounded-xl mt-5 border border-krafton-border">
          <button
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-krafton-gold text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In (Player ID)
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMessage(''); }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-krafton-gold text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Player Sign Up
          </button>
        </div>

        {/* Feedback Alert */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ================= LOGIN FORM ================= */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Player ID / Game UID / Username
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. 5124829104, Jonathan, or Manya"
                  value={loginForm.player_id}
                  onChange={(e) => setLoginForm({ ...loginForm, player_id: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter your account password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Quick Login Test Chips */}
            <div className="pt-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1.5">
                Demo Quick Fill (Click to Test):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => quickFillPlayer('Jonathan', '5124829104')}
                  className="px-2.5 py-1 rounded bg-[#182030] hover:bg-slate-700 text-[11px] font-mono text-krafton-gold border border-krafton-border"
                >
                  ⚡ Jonathan (UID: 5124829104)
                </button>
                <button
                  type="button"
                  onClick={() => quickFillPlayer('Manya', '5284910382')}
                  className="px-2.5 py-1 rounded bg-[#182030] hover:bg-slate-700 text-[11px] font-mono text-emerald-400 border border-krafton-border"
                >
                  ⚡ Manya (UID: 5284910382)
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-krafton-gold transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to BGMI Portal'}
            </button>
          </form>
        ) : (
          /* ================= SIGNUP FORM ================= */
          <form onSubmit={handleSignupSubmit} className="mt-5 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  In-Game Name (IGN) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. ApexHunter"
                  value={signupForm.ign}
                  onChange={(e) => setSignupForm({ ...signupForm, ign: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  BGMI Game UID *
                </label>
                <input
                  type="text"
                  placeholder="10-digit UID (e.g. 5183920194)"
                  value={signupForm.game_uid}
                  onChange={(e) => setSignupForm({ ...signupForm, game_uid: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Full Real Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohan Sharma"
                  value={signupForm.real_name}
                  onChange={(e) => setSignupForm({ ...signupForm, real_name: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Primary Role
                </label>
                <select
                  value={signupForm.primary_role}
                  onChange={(e) => setSignupForm({ ...signupForm, primary_role: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Assaulter">Assaulter</option>
                  <option value="Entry Fragger">Entry Fragger</option>
                  <option value="IGL">IGL (In-Game Leader)</option>
                  <option value="Support">Support</option>
                  <option value="Sniper">Sniper</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Device Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 15 Pro Max, iQOO 12"
                  value={signupForm.device_type}
                  onChange={(e) => setSignupForm({ ...signupForm, device_type: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                  Account Type
                </label>
                <select
                  value={signupForm.role}
                  onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="player">Competitive Player</option>
                  <option value="scout">Official Scout</option>
                  <option value="team_manager">Team Manager</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                Password *
              </label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-krafton-gold transition-all disabled:opacity-50"
            >
              {loading ? 'Creating Profile...' : 'Complete Player Registration'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
