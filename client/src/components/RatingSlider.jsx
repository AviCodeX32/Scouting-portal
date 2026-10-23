import React from 'react';

export default function RatingSlider({ 
  label, 
  value, 
  onChange, 
  description,
  name 
}) {
  const getBadgeColor = (val) => {
    if (val >= 9) return 'bg-amber-500/20 text-krafton-gold border-amber-500/50 shadow-krafton-gold';
    if (val >= 7) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    if (val >= 5) return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    return 'bg-red-500/20 text-red-300 border-red-500/40';
  };

  const getTierLabel = (val) => {
    if (val >= 9) return 'Tier 1 Pro Spec';
    if (val >= 7) return 'BGIS Contender';
    if (val >= 5) return 'Grassroots Solid';
    return 'Development Stage';
  };

  return (
    <div className="bg-[#0e121a] p-4 rounded-xl border border-krafton-border hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <label htmlFor={name} className="block text-xs font-bold text-slate-200 uppercase tracking-wide">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-slate-400">
            {getTierLabel(value)}
          </span>
          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-black border ${getBadgeColor(value)}`}>
            {value}/10
          </span>
        </div>
      </div>

      <div className="relative pt-2">
        <input
          id={name}
          type="range"
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-[#1a2233] rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1 px-1">
          <span>1 (Grassroots)</span>
          <span>5 (Average)</span>
          <span>10 (Elite Pro)</span>
        </div>
      </div>
    </div>
  );
}
