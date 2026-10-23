import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  accent = 'gold', 
  trend 
}) {
  const accentStyles = {
    gold: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      iconBg: 'bg-amber-500/10 text-krafton-gold border-amber-500/20',
      text: 'text-krafton-gold'
    },
    red: {
      border: 'border-red-500/30 hover:border-red-500/60',
      iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
      text: 'text-red-400'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'text-emerald-400'
    },
    blue: {
      border: 'border-blue-500/30 hover:border-blue-500/60',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      text: 'text-blue-400'
    }
  };

  const style = accentStyles[accent] || accentStyles.gold;

  return (
    <div className={`relative bg-krafton-card rounded-xl p-5 border transition-all duration-200 hover:-translate-y-0.5 shadow-card-dark ${style.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-mono">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3.5 flex items-center justify-between text-xs text-slate-400 border-t border-krafton-border pt-2.5">
          <span>{subtitle}</span>
          {trend && (
            <span className={`font-mono font-bold ${style.text}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
