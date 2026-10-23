import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  User, 
  AlertCircle,
  Crosshair,
  Award,
  Sparkles,
  BookmarkCheck
} from 'lucide-react';
import RatingSlider from '../components/RatingSlider';
import TeamLogo from '../assets/teamLogos';
import api from '../services/api';

export default function ScoutHub({ selectedPlayerId, currentUser, onOpenAuth }) {
  const [players, setPlayers] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [form, setForm] = useState({
    player_id: selectedPlayerId || '',
    aim_rating: 8,
    game_sense_rating: 8,
    communication_rating: 7,
    discipline_rating: 8,
    overall_potential: 'High',
    scout_verdict: ''
  });

  useEffect(() => {
    async function loadScoutData() {
      try {
        const [playersRes, watchRes, reportsRes] = await Promise.all([
          api.getPlayers(),
          api.getWatchlist(),
          api.getReports().catch(() => ({ data: [] }))
        ]);
        setPlayers(playersRes.data || []);
        setWatchlist(watchRes.data || []);
        setReports(reportsRes.data || []);

        if (playersRes.data?.length > 0 && !form.player_id) {
          setForm(prev => ({ ...prev, player_id: selectedPlayerId || playersRes.data[0].player_id }));
        }
      } catch (err) {
        console.error('Error loading scout data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadScoutData();
  }, [selectedPlayerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.player_id || !form.scout_verdict.trim()) {
      setErrorMessage('Please select an athlete and provide a detailed scout verdict.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        scout_id: currentUser?.user_id || 1,
        player_id: Number(form.player_id),
        aim_rating: form.aim_rating,
        game_sense_rating: form.game_sense_rating,
        communication_rating: form.communication_rating,
        discipline_rating: form.discipline_rating,
        overall_potential: form.overall_potential,
        scout_verdict: form.scout_verdict.trim()
      };

      const res = await api.createReport(payload);
      setSuccessMessage('Official Scouting Report submitted and recorded in the database!');
      
      const updatedReports = await api.getReports();
      setReports(updatedReports.data || []);

      setForm(prev => ({
        ...prev,
        scout_verdict: ''
      }));

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(err.response?.data?.error || 'Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPlayer = players.find(p => Number(p.player_id) === Number(form.player_id));
  const compositeScore = ((form.aim_rating + form.game_sense_rating + form.communication_rating + form.discipline_rating) / 4).toFixed(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-krafton-border">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-krafton-gold" />
            <h1 className="text-2xl font-black text-white tracking-tight uppercase font-sans">
              BGMI Talent Evaluation & Scouting Hub
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Standardized Krafton India scouting rubric: 1–10 metrics for Aim, Tactical Sense, Comms & Composure.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0c0f17] px-4 py-2 rounded-xl border border-krafton-border">
          <BookmarkCheck className="w-4 h-4 text-krafton-gold" />
          <span className="text-xs text-slate-300 font-mono">
            Active Watchlist: <strong className="text-krafton-gold">{watchlist.length} Prospects</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-krafton-card rounded-2xl border border-krafton-border p-6 shadow-card-dark">
            <div className="flex items-center justify-between pb-4 border-b border-krafton-border">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-krafton-gold" />
                <h2 className="text-sm font-black text-white uppercase tracking-wider font-sans">
                  New Player Assessment Report
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Composite Grade</span>
                <span className="text-base font-mono font-black text-krafton-gold">{compositeScore} / 10</span>
              </div>
            </div>

            {/* Alert Messages */}
            {successMessage && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              
              {/* Select Player */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Candidate Athlete
                </label>
                <select
                  value={form.player_id}
                  onChange={(e) => setForm({ ...form, player_id: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="" disabled>Choose an athlete...</option>
                  {players.map((p) => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.ign} — {p.primary_role} ({p.team_name || 'Free Agent'} | UID: {p.game_uid})
                    </option>
                  ))}
                </select>

                {selectedPlayer && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#0a0d14] border border-krafton-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <TeamLogo tag={selectedPlayer.team_tag} teamName={selectedPlayer.team_name} className="w-6 h-6" />
                      <div>
                        <span className="text-white font-bold">{selectedPlayer.real_name}</span>
                        <span className="text-slate-400 ml-2 font-mono">Device: {selectedPlayer.device_type}</span>
                      </div>
                    </div>
                    <span className="text-krafton-gold font-mono font-bold">Avg ADR: {selectedPlayer.avg_damage}</span>
                  </div>
                )}
              </div>

              {/* Sliders */}
              <div className="space-y-3 pt-2">
                <RatingSlider
                  name="aim_rating"
                  label="1. Aim & Crosshair Placement"
                  description="First-bullet accuracy, DMR tap rate, recoil spray control at 100m+, and hip-fire CQB."
                  value={form.aim_rating}
                  onChange={(val) => setForm({ ...form, aim_rating: val })}
                />

                <RatingSlider
                  name="game_sense_rating"
                  label="2. Tactical Game Sense & Rotations"
                  description="Zone predict, late-circle compound crunches, split defense, and vehicle scouting."
                  value={form.game_sense_rating}
                  onChange={(val) => setForm({ ...form, game_sense_rating: val })}
                />

                <RatingSlider
                  name="communication_rating"
                  label="3. Communication & Callouts"
                  description="Clutch silence discipline, micro-directives, utility timing, and knock callouts."
                  value={form.communication_rating}
                  onChange={(val) => setForm({ ...form, communication_rating: val })}
                />

                <RatingSlider
                  name="discipline_rating"
                  label="4. Composure & Mental Fortitude"
                  description="Adherence to IGL directives under pressure, hot-drop stability, and tournament tilt resistance."
                  value={form.discipline_rating}
                  onChange={(val) => setForm({ ...form, discipline_rating: val })}
                />
              </div>

              {/* Potential */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Overall Potential Assessment
                </label>
                <select
                  value={form.overall_potential}
                  onChange={(e) => setForm({ ...form, overall_potential: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="High">High (Immediate Tier 1 Franchise Candidate)</option>
                  <option value="Moderate">Moderate (Tier 2 Challenger, Needs Strategic Coaching)</option>
                  <option value="Development Needed">Development Needed (Grassroots Academy Stage)</option>
                </select>
              </div>

              {/* Verdict Text */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Scout Verdict & Key Observations
                </label>
                <textarea
                  rows="3"
                  value={form.scout_verdict}
                  onChange={(e) => setForm({ ...form, scout_verdict: e.target.value })}
                  placeholder="Detail observations on rotation choices, 1v1 duels, composure in hot-drops, and fit for competitive team roster..."
                  className="w-full bg-[#0a0d14] border border-krafton-border focus:border-krafton-gold rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-krafton-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-krafton-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Saving Report to Database...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Evaluation</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Right Column: Watchlist & Recent Reports */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Watchlist */}
          <div className="bg-krafton-card rounded-2xl border border-krafton-border p-5 space-y-3 shadow-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-krafton-border">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-krafton-gold" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider font-sans">
                  Scout Watchlist
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">T2/T3 Prospects</span>
            </div>

            <div className="space-y-3">
              {watchlist.map((item) => (
                <div 
                  key={item.watchlist_id}
                  className="p-3.5 rounded-xl bg-[#0a0d14] border border-krafton-border hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">{item.ign}</span>
                      <span className="text-xs text-slate-400 ml-2 font-mono font-semibold">({item.primary_role})</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#111622] text-krafton-gold border border-krafton-border">
                      {item.team_name || 'Free Agent'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 bg-[#121622] p-2.5 rounded-lg italic border border-krafton-border/60">
                    "{item.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-krafton-card rounded-2xl border border-krafton-border p-5 space-y-3 shadow-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-krafton-border">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider font-sans">
                  Recent Verified Evaluations
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{reports.length} Filed</span>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <div 
                  key={report.report_id}
                  className="p-3.5 rounded-xl bg-[#0a0d14] border border-krafton-border hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">{report.ign}</span>
                      <span className="text-xs text-slate-400 ml-2 font-mono">Role: {report.primary_role}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded ${
                      report.overall_potential === 'High'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : report.overall_potential === 'Moderate'
                        ? 'bg-amber-950 text-krafton-gold border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {report.overall_potential} Potential
                    </span>
                  </div>

                  {/* Rating chips */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                    <div className="bg-[#111622] p-1 rounded border border-krafton-border">
                      <span className="text-slate-400 block font-bold">Aim</span>
                      <strong className="text-krafton-gold">{report.aim_rating}/10</strong>
                    </div>
                    <div className="bg-[#111622] p-1 rounded border border-krafton-border">
                      <span className="text-slate-400 block font-bold">Sense</span>
                      <strong className="text-emerald-400">{report.game_sense_rating}/10</strong>
                    </div>
                    <div className="bg-[#111622] p-1 rounded border border-krafton-border">
                      <span className="text-slate-400 block font-bold">Comms</span>
                      <strong className="text-blue-400">{report.communication_rating}/10</strong>
                    </div>
                    <div className="bg-[#111622] p-1 rounded border border-krafton-border">
                      <span className="text-slate-400 block font-bold">Discip</span>
                      <strong className="text-amber-400">{report.discipline_rating}/10</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic pt-1">
                    "{report.scout_verdict}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
