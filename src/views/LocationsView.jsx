import { useState } from 'react';
import { LOCATIONS, FORMAT_INFO } from '../data/locations';

export default function LocationsView() {
  const [favorites, setFavorites] = useState([1, 3]); // East Legon + Osu default favorites
  const [filter, setFilter] = useState('all');

  function toggleFav(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const formats = ['all', 'Signature', 'To-Go', 'Express'];
  const filtered = LOCATIONS.filter(loc => filter === 'all' || loc.format === filter);
  const sorted = [...filtered].sort((a, b) => {
    const aFav = favorites.includes(a.id) ? 0 : 1;
    const bFav = favorites.includes(b.id) ? 0 : 1;
    return aFav - bFav;
  });

  return (
    <div className="pb-40 -mt-5">
      {/* Header with illustrated map */}
      <div className="bg-gradient-to-b from-[#2C2420] to-[#3D342E] text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-warm-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 kente-pattern opacity-5 pointer-events-none" />
        <div className="relative z-10">
          <div className="font-serif text-[22px]">Locations</div>
          <div className="text-[12px] text-white/50 mt-0.5">{LOCATIONS.length} locations across Ghana</div>

          {/* Mini illustrated map */}
          <div className="mt-4 bg-white/[0.06] rounded-2xl p-4 border border-white/[0.06]">
            <svg viewBox="0 0 300 120" className="w-full h-auto">
              {/* Simplified Accra area outline */}
              <path d="M 20 80 Q 40 30, 100 40 T 180 35 Q 220 30, 260 50 Q 290 65, 280 90 L 20 90 Z"
                fill="rgba(196,30,58,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              {/* Ocean at bottom */}
              <rect x="0" y="90" width="300" height="30" fill="rgba(59,130,246,0.06)" rx="0"/>
              <text x="150" y="108" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="Plus Jakarta Sans">Gulf of Guinea</text>
              {/* Location pins */}
              {[
                { x: 180, y: 42, label: 'East Legon', main: true },
                { x: 140, y: 50, label: 'West Legon' },
                { x: 120, y: 60, label: 'Osu' },
                { x: 100, y: 55, label: 'Tesano' },
                { x: 160, y: 62, label: 'Airport' },
                { x: 70, y: 48, label: 'Achimota' },
                { x: 220, y: 58, label: 'Spintex' },
                { x: 200, y: 70, label: 'Tema' },
                { x: 110, y: 68, label: 'Labone' },
                { x: 40, y: 65, label: 'Kumasi →', far: true },
              ].map((pin, i) => (
                <g key={i}>
                  <circle cx={pin.x} cy={pin.y} r={pin.main ? 5 : 3.5}
                    fill={pin.main ? '#C41E3A' : pin.far ? 'rgba(255,255,255,0.2)' : 'rgba(200,153,62,0.8)'}
                    stroke="rgba(255,255,255,0.3)" strokeWidth={pin.main ? 1.5 : 0.5}/>
                  {pin.main && <circle cx={pin.x} cy={pin.y} r="9" fill="none" stroke="rgba(196,30,58,0.3)" strokeWidth="1">
                    <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                  </circle>}
                  <text x={pin.x} y={pin.y - (pin.main ? 10 : 7)} textAnchor="middle"
                    fill={pin.far ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)'}
                    fontSize={pin.main ? '8' : '6'} fontWeight={pin.main ? '700' : '500'}
                    fontFamily="Plus Jakarta Sans">
                    {pin.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Format filter */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto hide-scrollbar">
        {formats.map(f => {
          const info = f === 'all' ? null : FORMAT_INFO[f];
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                filter === f
                  ? 'bg-[#1A1612] text-white shadow-warm'
                  : 'bg-sb-cream text-[#6B645C] border border-[#EDE8E2]'
              }`}>
              {info && <span>{info.icon}</span>}
              {f === 'all' ? 'All' : f}
            </button>
          );
        })}
      </div>

      {/* Location list */}
      <div className="px-4 space-y-2.5">
        {sorted.map(loc => {
          const info = FORMAT_INFO[loc.format];
          const isFav = favorites.includes(loc.id);
          return (
            <div key={loc.id} className="bg-sb-cream rounded-2xl p-4 shadow-warm-sm border border-[#EDE8E2] transition-all hover:shadow-warm">
              <div className="flex items-start gap-3">
                {/* Format icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: info.bg }}>
                  {info.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-[#1A1612] truncate">{loc.name}</span>
                    {isFav && <span className="text-[#C41E3A] text-[12px]">♥</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                      style={{ backgroundColor: info.bg, color: info.color }}>
                      {loc.format}
                    </span>
                    <span className="text-[11px] text-[#8B8278]">{loc.area}</span>
                  </div>
                  <div className="text-[11px] text-[#8B8278] mt-1.5">{loc.hours}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {loc.features.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#F5F0EB] text-[9px] text-[#6B645C] font-medium">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Favorite toggle */}
                <button onClick={() => toggleFav(loc.id)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-90 ${
                    isFav ? 'bg-[#C41E3A]/10' : 'bg-[#F5F0EB]'
                  }`}>
                  <span className={`text-[16px] ${isFav ? '' : 'grayscale opacity-30'}`}>
                    {isFav ? '❤️' : '🤍'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
