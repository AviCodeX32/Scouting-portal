import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Send,
  X,
  Shield,
  FileCheck2
} from 'lucide-react';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function Tryouts({ selectedTeamForTryout, currentUser, onOpenAuth }) {
  const [tryouts, setTryouts] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Form State
  const [form, setForm] = useState({
    team_id: selectedTeamForTryout || '',
    player_id: '',
    role_applied: 'Entry Fragger',
    submission_notes: ''
  });

  useEffect(() => {
    async function loadTryoutData() {
      try {
        const [tryoutsRes, teamsRes, playersRes] = await Promise.all([
          api.getTryouts(),
          api.getTeams(),
          api.getPlayers()
        ]);
        setTryouts(tryoutsRes.data || []);
        setTeams(teamsRes.data || []);
        setPlayers(playersRes.data || []);

        if (teamsRes.data?.length > 0) {
          setForm(prev => ({
            ...prev,
            team_id: selectedTeamForTryout || teamsRes.data[0].team_id,
            player_id: currentUser?.player_id || playersRes.data?.[0]?.player_id || ''
          }));
        }
      } catch (err) {
        console.error('Error loading tryouts data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTryoutData();
  }, [selectedTeamForTryout, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.team_id || !form.player_id || !form.role_applied) {
      setFeedback({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await api.applyTryout({
        team_id: Number(form.team_id),
        player_id: Number(form.player_id),
        role_applied: form.role_applied,
        submission_notes: form.submission_notes
      });

      setFeedback({ type: 'success', message: 'Application submitted directly to team management!' });
      
      const updated = await api.getTryouts();
      setTryouts(updated.data || []);

      setTimeout(() => {
        setIsModalOpen(false);
        setFeedback({ type: '', message: '' });
      }, 1500);
    } catch (err) {
      console.error('Tryout application failed:', err);
      setFeedback({ type: 'error', message: err.response?.data?.error || 'Failed to submit application.' });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Trial Offered':
        return 'bg-amber-950 text-krafton-gold border-amber-800 shadow-krafton-gold font-black';
      case 'Rejected':
        return 'bg-red-950 text-red-400 border-red-800';
      default:
        return 'bg-blue-950 text-blue-400 border-blue-800';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              Competitive Tryouts & Recruitment Portal
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official BGIS squad trial applications, academy openings, and talent audition statuses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-krafton-gold transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for Tryout</span>
        </button>
      </div>

      {/* Applications Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-krafton-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400 mt-3 font-mono">Loading tryout applications...</p>
        </div>
      ) : tryouts.length === 0 ? (
        <div className="py-16 text-center bg-krafton-card rounded-2xl border border-krafton-border">
          <UserCheck className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base font-bold text-slate-300 mt-3">No active tryout applications</p>
          <p className="text-xs text-slate-500 mt-1">Submit the first grassroots application above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tryouts.map((app) => (
            <div
              key={app.application_id}
              className="bg-krafton-card rounded-2xl border border-krafton-border hover:border-krafton-gold/40 p-5 transition-all duration-300 flex flex-col justify-between shadow-card-dark"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0a0d14] border border-krafton-border flex items-center justify-center p-1">
                      <TeamLogo tag={app.team_tag} teamName={app.team_name} className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">
                        {app.ign}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">
                        Target: <strong className="text-krafton-gold">{app.team_name}</strong>
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase tracking-wider border ${getStatusBadge(app.application_status)}`}>
                    {app.application_status}
                  </span>
                </div>

                {/* Role Applied */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Role Applied:</span>
                  <span className="px-2 py-0.5 rounded bg-[#0a0d14] text-krafton-gold text-xs font-mono font-bold border border-krafton-border">
                    {app.role_applied}
                  </span>
                </div>

                {/* Submission Notes */}
                <div className="mt-3 p-3 rounded-xl bg-[#0a0d14] border border-krafton-border/80">
                  <p className="text-xs text-slate-300 italic">
                    "{app.submission_notes || 'BGMI candidate seeking competitive scrim trial.'}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-krafton-border flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Application #{app.application_id}</span>
                <span>{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'Active'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111622] border border-krafton-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-krafton-border">
              <FileCheck2 className="w-5 h-5 text-krafton-gold" />
              <h2 className="text-lg font-black text-white uppercase font-sans">
                Apply for BGMI Roster Trial
              </h2>
            </div>

            {/* Feedback Message */}
            {feedback.message && (
              <div className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                feedback.type === 'success' 
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' 
                  : 'bg-red-950/80 border border-red-500/50 text-red-300'
              }`}>
                {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* Select Team */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Target Team Roster
                </label>
                <select
                  value={form.team_id}
                  onChange={(e) => setForm({ ...form, team_id: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  required
                >
                  {teams.map(t => (
                    <option key={t.team_id} value={t.team_id}>
                      {t.team_name} ({t.team_tag}) - {t.tier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Player Profile */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Candidate Athlete Profile
                </label>
                <select
                  value={form.player_id}
                  onChange={(e) => setForm({ ...form, player_id: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  required
                >
                  {players.map(p => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.ign} — {p.primary_role} (UID: {p.game_uid})
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Applied */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Role Applied For
                </label>
                <select
                  value={form.role_applied}
                  onChange={(e) => setForm({ ...form, role_applied: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Entry Fragger">Entry Fragger</option>
                  <option value="Assaulter">Assaulter</option>
                  <option value="IGL">IGL (In-Game Leader)</option>
                  <option value="Sniper">Sniper</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Audition Notes & Scrim Availability
                </label>
                <textarea
                  rows="3"
                  value={form.submission_notes}
                  onChange={(e) => setForm({ ...form, submission_notes: e.target.value })}
                  placeholder="Detail daily scrim availability, past tournament finishes, or device specs..."
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-krafton-gold transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Send Application'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
