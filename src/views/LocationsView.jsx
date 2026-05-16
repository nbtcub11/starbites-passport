import { useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { FORMATS } from '../data/customers';
import { OrnAdinkrahene, IconPin, IconClock, IconHeart } from '../components/Icons';

/* --- MAP PANEL --- illustrated, branded --- */
function MapPanel() {
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      background: 'linear-gradient(155deg, #14110D 0%, #2A241D 100%)',
      border: '1px solid var(--hairline)',
      position: 'relative', height: 188,
    }}>
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
      }}/>

      {/* Compass rose ornament -- top right */}
      <div style={{ position: 'absolute', top: 12, right: 12, opacity: 0.3 }}>
        <OrnAdinkrahene size={48} color="var(--gold-light)"/>
      </div>

      {/* Title overlay */}
      <div style={{ position: 'absolute', top: 14, left: 16, color: 'var(--paper)' }}>
        <div className="label" style={{ fontSize: 8, color: 'var(--gold-light)', letterSpacing: '0.3em' }}>
          GREATER ACCRA
        </div>
        <div className="numeral" style={{ fontSize: 16, lineHeight: 1, marginTop: 4, color: 'var(--paper)' }}>
          10 Houses
        </div>
      </div>

      {/* SVG map */}
      <svg viewBox="0 0 320 180" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,239,227,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Grid */}
        <rect width="320" height="180" fill="url(#grid)"/>

        {/* Land shape */}
        <path d="M 10 60 Q 60 30, 130 38 T 250 35 Q 290 38, 305 60 Q 315 90, 290 130 L 30 130 Q 8 110, 10 60 Z"
          fill="rgba(184,137,58,0.06)" stroke="rgba(220,182,107,0.18)" strokeWidth="0.8"/>

        {/* Coastline */}
        <path d="M 20 132 Q 80 140, 150 138 T 305 132"
          fill="none" stroke="rgba(43,91,123,0.55)" strokeWidth="1.4" strokeDasharray="2 3"/>

        {/* Ocean label */}
        <text x="160" y="158" textAnchor="middle"
          fill="rgba(43,91,123,0.7)" fontSize="7" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="2">
          GULF OF GUINEA
        </text>

        {/* Pins */}
        {[
          { x: 200, y: 60, label: 'East Legon', main: true, fmt: 'Signature' },
          { x: 160, y: 65, label: 'Westlands', fmt: 'Signature' },
          { x: 140, y: 78, label: 'Osu', fmt: 'To-Go' },
          { x: 115, y: 70, label: 'Tesano', fmt: 'Express' },
          { x: 178, y: 78, label: 'Airport', fmt: 'Express' },
          { x: 90, y: 60, label: 'Achimota', fmt: 'Express' },
          { x: 240, y: 78, label: 'Spintex', fmt: 'To-Go' },
          { x: 130, y: 92, label: 'Labone', fmt: 'To-Go' },
          { x: 270, y: 92, label: 'Tema', fmt: 'Express' },
          { x: 50, y: 80, label: 'Kumasi', far: true, fmt: 'Signature' },
        ].map((pin, i) => {
          const fmt = FORMATS[pin.fmt];
          return (
            <g key={i}>
              {pin.main && (
                <circle cx={pin.x} cy={pin.y} r="9" fill="none" stroke={fmt.color} strokeWidth="0.8" opacity="0.5">
                  <animate attributeName="r" values="6;14;6" dur="2.2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle cx={pin.x} cy={pin.y} r={pin.main ? 4 : 3}
                fill={fmt.color} stroke="rgba(245,239,227,0.7)" strokeWidth="0.8"/>
              <text x={pin.x} y={pin.y - (pin.main ? 8 : 6)} textAnchor="middle"
                fill={pin.far ? 'rgba(245,239,227,0.35)' : 'rgba(245,239,227,0.78)'}
                fontSize={pin.main ? '8' : '6.5'} fontWeight={pin.main ? '700' : '600'}
                fontFamily="Plus Jakarta Sans">
                {pin.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 8, right: 12, display: 'flex', gap: 8,
        padding: '4px 8px', borderRadius: 6, background: 'rgba(20,17,13,0.5)',
        backdropFilter: 'blur(8px)',
      }}>
        {Object.entries(FORMATS).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: v.color }}/>
            <span style={{ fontSize: 8.5, color: 'rgba(245,239,227,0.7)', fontWeight: 600, letterSpacing: '0.04em' }}>
              {k}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LocationsView() {
  const [favs, setFavs] = useState([1, 3]);
  const [filter, setFilter] = useState('all');

  function toggleFav(id) {
    setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const list = LOCATIONS.filter(l => filter === 'all' || l.format === filter);
  const sorted = [...list].sort((a, b) => {
    const af = favs.includes(a.id) ? 0 : 1;
    const bf = favs.includes(b.id) ? 0 : 1;
    return af - bf;
  });

  return (
    <div className="paper-grain" style={{ minHeight: '100%', paddingBottom: 130 }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)' }}>THE ATLAS</div>
        <div className="numeral" style={{ fontSize: 36, lineHeight: 1, color: 'var(--ink)', marginTop: 4 }}>
          Locations
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 6 }}>
          {LOCATIONS.length} houses across Ghana
        </div>
      </div>

      {/* Illustrated map */}
      <div style={{ padding: '12px 20px 0' }}>
        <MapPanel/>
      </div>

      {/* Format filter */}
      <div className="hide-scrollbar" style={{
        display: 'flex', gap: 6, padding: '16px 20px 0', overflowX: 'auto',
      }}>
        {['all', 'Signature', 'To-Go', 'Express'].map(f => {
          const isAll = f === 'all';
          const fmt = isAll ? null : FORMATS[f];
          const active = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 100,
              background: active ? 'var(--ink)' : 'var(--card-2)',
              color: active ? 'var(--paper)' : 'var(--ink-2)',
              border: active ? '1px solid var(--ink)' : '1px solid var(--hairline)',
              fontSize: 11.5, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              whiteSpace: 'nowrap',
            }}>
              {fmt && (
                <span style={{
                  width: 6, height: 6, borderRadius: 3, background: active ? 'var(--paper)' : fmt.color,
                }}/>
              )}
              {isAll ? 'All formats' : f}
            </button>
          );
        })}
      </div>

      {/* Location list */}
      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map((loc, i) => {
          const fmt = FORMATS[loc.format];
          const isFav = favs.includes(loc.id);
          return (
            <div key={loc.id} className="anim-slide" style={{
              background: 'var(--card-2)', border: '1px solid var(--hairline)',
              borderRadius: 14, padding: 14,
              display: 'flex', gap: 12, alignItems: 'flex-start',
              animationDelay: `${i * 40}ms`,
            }}>
              {/* Format crest */}
              <div style={{
                width: 44, height: 56, borderRadius: 8,
                background: fmt.soft, color: fmt.color,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 3, flexShrink: 0,
              }}>
                <IconPin size={20} color={fmt.color}/>
                <span className="label" style={{ fontSize: 7, letterSpacing: '0.2em', color: fmt.color }}>
                  {fmt.tag}
                </span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{loc.name}</span>
                  {loc.popular && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700,
                      padding: '1.5px 5px', borderRadius: 4,
                      background: 'rgba(184,137,58,0.15)', color: 'var(--gold)', letterSpacing: '0.06em',
                    }}>POPULAR</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3, fontSize: 11, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                  <span>{loc.format}</span>
                  <span style={{ width: 2, height: 2, borderRadius: 1, background: 'var(--ink-4)' }}/>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{loc.area}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4, fontSize: 10.5, color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <IconClock size={10} color="var(--ink-4)"/> {loc.hours}
                  </span>
                  <span style={{ width: 2, height: 2, borderRadius: 1, background: 'var(--ink-4)' }}/>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{loc.distance}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                  {loc.features.map((f, j) => (
                    <span key={j} style={{
                      fontSize: 9.5, padding: '2.5px 7px', borderRadius: 4,
                      background: 'var(--paper)', color: 'var(--ink-3)', fontWeight: 600,
                      border: '1px solid var(--hairline)',
                      whiteSpace: 'nowrap',
                    }}>{f}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => toggleFav(loc.id)} style={{
                width: 32, height: 32, borderRadius: 16, border: 'none',
                background: isFav ? 'rgba(181,23,46,0.1)' : 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <IconHeart size={15} color={isFav ? 'var(--red)' : 'var(--ink-4)'} filled={isFav}/>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
