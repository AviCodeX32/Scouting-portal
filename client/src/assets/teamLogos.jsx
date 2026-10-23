import React from 'react';

// Crisp, high-resolution SVG team crests for famous BGMI teams
export const TeamLogos = {
  // Team Soul
  soul: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="soulGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <polygon points="50,4 92,25 92,75 50,96 8,75 8,25" fill="#0b1712" stroke="#10b981" strokeWidth="4" />
      <path d="M50 18 C38 32, 28 45, 36 65 C40 75, 48 80, 50 82 C52 80, 60 75, 64 65 C72 45, 62 32, 50 18 Z" fill="url(#soulGrad)" />
      <path d="M50 35 C44 44, 40 52, 45 64 C47 69, 50 72, 50 72 C50 72, 53 69, 55 64 C60 52, 56 44, 50 35 Z" fill="#ecfdf5" />
      <text x="50" y="91" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="900" fontFamily="sans-serif">SOUL</text>
    </svg>
  ),

  // GodLike Esports
  godl: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="godlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#181308" stroke="#f59e0b" strokeWidth="4" />
      <path d="M20 38 Q35 25 50 48 Q65 25 80 38 Q65 52 50 48 Q35 52 20 38 Z" fill="url(#godlGrad)" opacity="0.8" />
      <path d="M68 36 C64 30, 56 26, 48 26 C36 26, 28 36, 28 50 C28 64, 36 74, 50 74 C62 74, 69 66, 71 56 L50 56 L50 47 L78 47 C78 68, 66 82, 49 82 C31 82, 19 68, 19 50 C19 32, 31 18, 49 18 C59 18, 69 23, 76 32 L68 36 Z" fill="url(#godlGrad)" />
      <polygon points="50,12 53,19 61,19 55,24 57,31 50,27 43,31 45,24 39,19 47,19" fill="#fbbf24" />
    </svg>
  ),

  // Team XSpark
  tx: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="txGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <polygon points="50,6 90,20 90,80 50,94 10,80 10,20" fill="#1c0b0b" stroke="#f97316" strokeWidth="4" />
      <path d="M30 25 L50 50 L30 75 L42 75 L56 56 L70 75 L82 75 L62 50 L82 25 L70 25 L56 44 L42 25 Z" fill="url(#txGrad)" />
      <polygon points="54,20 44,46 54,46 46,78 66,48 56,48" fill="#fef08a" />
      <text x="50" y="90" textAnchor="middle" fill="#f97316" fontSize="9" fontWeight="900" fontFamily="sans-serif">XSPARK</text>
    </svg>
  ),

  // Carnival Gaming
  cg: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <polygon points="50,5 92,28 92,72 50,95 8,72 8,28" fill="#130b1c" stroke="#ec4899" strokeWidth="4" />
      <path d="M22 36 Q50 30 78 36 C80 50, 70 68, 50 74 C30 68, 20 50, 22 36 Z" fill="url(#cgGrad)" />
      <ellipse cx="38" cy="46" rx="7" ry="4" fill="#130b1c" transform="rotate(-10 38 46)" />
      <ellipse cx="62" cy="46" rx="7" ry="4" fill="#130b1c" transform="rotate(10 62 46)" />
      <circle cx="50" cy="30" r="3" fill="#fef08a" />
      <text x="50" y="89" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="900" fontFamily="sans-serif">CARNIVAL</text>
    </svg>
  ),

  // Global Esports
  ge: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="geGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#08101e" stroke="#3b82f6" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="26" ry="45" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
      <path d="M38 32 C30 32, 24 38, 24 50 C24 62, 30 68, 38 68 C44 68, 48 64, 49 59 L38 59 L38 52 L56 52 C56 65, 48 74, 38 74 C24 74, 16 64, 16 50 C16 36, 24 26, 38 26 C46 26, 52 30, 56 36 L48 40 C46 36, 42 32, 38 32 Z" fill="#ffffff" />
      <path d="M60 27 L84 27 L84 34 L68 34 L68 46 L80 46 L80 53 L68 53 L68 67 L84 67 L84 74 L60 74 Z" fill="#3b82f6" />
    </svg>
  ),

  // Revenant Esports
  rnt: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="rntGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
      <polygon points="50,6 92,28 92,72 50,94 8,72 8,28" fill="#170909" stroke="#ef4444" strokeWidth="4" />
      <path d="M30 24 L56 24 C68 24, 76 30, 76 42 C76 52, 69 57, 60 59 L76 76 L62 76 L48 60 L42 60 L42 76 L30 76 Z M42 35 L42 49 L55 49 C60 49, 64 47, 64 42 C64 37, 60 35, 55 35 Z" fill="url(#rntGrad)" />
      <text x="50" y="89" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="900" fontFamily="sans-serif">REVENANT</text>
    </svg>
  ),

  // Orangutan Esports
  og: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#1c0f06" stroke="#ea580c" strokeWidth="4" />
      <path d="M32 30 Q50 20 68 30 Q80 45 74 65 Q50 82 26 65 Q20 45 32 30 Z" fill="url(#ogGrad)" />
      <circle cx="42" cy="48" r="4" fill="#ffffff" />
      <circle cx="58" cy="48" r="4" fill="#ffffff" />
      <polygon points="47,56 53,56 50,61" fill="#1c0f06" />
      <text x="50" y="90" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="900" fontFamily="sans-serif">ORANGUTAN</text>
    </svg>
  ),

  // Reckoning Underdogs
  rck: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="rckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <polygon points="50,6 90,24 82,78 50,95 18,78 10,24" fill="#081418" stroke="#06b6d4" strokeWidth="4" />
      <text x="50" y="58" textAnchor="middle" fill="url(#rckGrad)" fontSize="26" fontWeight="900" fontFamily="sans-serif">RCK</text>
      <text x="50" y="74" textAnchor="middle" fill="#67e8f9" fontSize="8" fontWeight="800" fontFamily="sans-serif">RECKONING</text>
    </svg>
  ),

  // Blind Esports
  blind: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="blindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      <polygon points="50,4 95,50 50,96 5,50" fill="#181406" stroke="#eab308" strokeWidth="4" />
      <path d="M22 50 Q50 32 78 50 Q50 68 22 50 Z" fill="none" stroke="url(#blindGrad)" strokeWidth="4" />
      <circle cx="50" cy="50" r="9" fill="#eab308" />
      <line x1="22" y1="28" x2="78" y2="72" stroke="#fef08a" strokeWidth="3" />
      <text x="50" y="85" textAnchor="middle" fill="#eab308" fontSize="8" fontWeight="900" fontFamily="sans-serif">BLIND</text>
    </svg>
  ),

  // Medal Esports
  medal: ({ className = "w-10 h-10" }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="medalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#161006" stroke="#f59e0b" strokeWidth="4" />
      <polygon points="50,22 58,38 76,38 62,49 68,66 50,55 32,66 38,49 24,38 42,38" fill="url(#medalGrad)" stroke="#fef3c7" strokeWidth="2" />
      <text x="50" y="85" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="900" fontFamily="sans-serif">MEDAL</text>
    </svg>
  )
};

// Helper component that renders the SVG for any team tag or team name
export function TeamLogo({ tag, teamName, logoKey, className = "w-10 h-10" }) {
  const normalizedKey = (logoKey || tag || teamName || '').toLowerCase().trim();

  if (normalizedKey.includes('soul')) return <TeamLogos.soul className={className} />;
  if (normalizedKey.includes('godl') || normalizedKey.includes('godlike')) return <TeamLogos.godl className={className} />;
  if (normalizedKey.includes('tx') || normalizedKey.includes('xspark')) return <TeamLogos.tx className={className} />;
  if (normalizedKey.includes('cg') || normalizedKey.includes('carnival')) return <TeamLogos.cg className={className} />;
  if (normalizedKey.includes('ge') || normalizedKey.includes('global')) return <TeamLogos.ge className={className} />;
  if (normalizedKey.includes('rnt') || normalizedKey.includes('revenant')) return <TeamLogos.rnt className={className} />;
  if (normalizedKey.includes('og') || normalizedKey.includes('orangutan')) return <TeamLogos.og className={className} />;
  if (normalizedKey.includes('rck') || normalizedKey.includes('reckoning')) return <TeamLogos.rck className={className} />;
  if (normalizedKey.includes('blind')) return <TeamLogos.blind className={className} />;
  if (normalizedKey.includes('medal')) return <TeamLogos.medal className={className} />;

  // Default Krafton style crest fallback
  const initials = (tag || teamName || 'BGMI').slice(0, 3).toUpperCase();
  return (
    <div className={`${className} bg-slate-900 border border-amber-500/40 rounded-xl flex items-center justify-center font-mono font-black text-amber-400 text-xs shadow-md`}>
      {initials}
    </div>
  );
}

export default TeamLogo;
