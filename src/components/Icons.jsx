/* ─── Custom SVG ornament + icon library ───
   Adinkra-inspired symbols + crisp UI icons.
   Replaces emoji throughout the app for an editorial feel.
*/

/* ─── ADINKRA-INSPIRED ORNAMENTS ─── */

export function OrnAdinkrahene({ size = 24, color = 'currentColor', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1"/>
      <circle cx="12" cy="12" r="7.5"  stroke={color} strokeWidth="1"/>
      <circle cx="12" cy="12" r="4.5"  stroke={color} strokeWidth="1"/>
      <circle cx="12" cy="12" r="1.5"  fill={color}/>
    </svg>
  );
}

export function OrnSankofa({ size = 24, color = 'currentColor', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <path d="M12 3 C 7 3, 3 6.5, 3 11.5 C 3 16, 7 19, 12 19 C 16 19, 19 17, 20 14"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M20 14 L 17 12 M 20 14 L 18 17"
        stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="12" cy="11.5" r="2.5" stroke={color} strokeWidth="1.2" fill="none"/>
      <circle cx="12" cy="11.5" r="0.8" fill={color}/>
    </svg>
  );
}

export function OrnGyeNyame({ size = 24, color = 'currentColor', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <path d="M12 4 C 8 4, 5 7, 5 11 C 5 15, 8 18, 12 18 C 15 18, 17 16, 17 13.5 C 17 11.5, 15.5 10, 13.5 10 C 12 10, 11 11, 11 12.5"
        stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <circle cx="11" cy="12.5" r="1" fill={color}/>
    </svg>
  );
}

export function OrnDuafe({ size = 24, color = 'currentColor', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <rect x="4" y="5"  width="16" height="3" rx="1" stroke={color} strokeWidth="1.2"/>
      <line x1="6"  y1="8" x2="6"  y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="8" x2="10" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="8" x2="14" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="18" y1="8" x2="18" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function OrnStar({ size = 16, color = 'currentColor', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
      <path d="M12 2 L 14.5 9.5 L 22 12 L 14.5 14.5 L 12 22 L 9.5 14.5 L 2 12 L 9.5 9.5 Z" fill={color}/>
    </svg>
  );
}

export function MarkS({ size = 40, color = 'currentColor', background = 'transparent' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="9" fill={background}/>
      <path
        d="M27 11 C 24 9, 19 8.5, 16 10 C 12 11.8, 11 16, 14 18.5 C 17 21, 24 20.5, 26 23.5 C 28 26.5, 24 30, 19 30 C 16 30, 13.5 29, 11 27"
        stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none"
      />
      <circle cx="14" cy="9.5" r="1.4" fill={color}/>
      <circle cx="27" cy="30.5" r="1.4" fill={color}/>
    </svg>
  );
}

/* ─── STARBITES BRAND LOGO ─── Star above STARBITES wordmark */
export function StarbitesLogo({ height = 32, color = 'currentColor' }) {
  // Aspect ratio ~2.4:1 (width:height) for star + wordmark
  const w = height * 2.4;
  return (
    <svg width={w} height={height} viewBox="0 0 120 50" fill="none">
      {/* Star */}
      <path d="M60 2 L 63.5 14.5 L 76 14.5 L 65.8 22 L 69.5 34.5 L 60 27 L 50.5 34.5 L 54.2 22 L 44 14.5 L 56.5 14.5 Z" fill={color}/>
      {/* STARBITES wordmark — bold slab-serif style */}
      <text x="60" y="47" textAnchor="middle"
        fontFamily="'DM Serif Display', Georgia, serif"
        fontSize="14" fontWeight="400" letterSpacing="3.5"
        fill={color}>
        STARBITES
      </text>
    </svg>
  );
}

/* ─── TAB / UI ICONS ─── */

export function IconPassport({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2.5" stroke={color} strokeWidth={stroke}/>
      <circle cx="12" cy="10" r="2.8" stroke={color} strokeWidth={stroke}/>
      <path d="M7.5 16.5 C 8.5 15, 10 14, 12 14 C 14 14, 15.5 15, 16.5 16.5"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconBag({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 8 L 19 8 L 18 21 L 6 21 Z" stroke={color} strokeWidth={stroke} strokeLinejoin="round"/>
      <path d="M9 8 V 6.5 A 3 3 0 0 1 15 6.5 V 8" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconPin({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21 C 12 21, 5 14, 5 10 A 7 7 0 0 1 19 10 C 19 14, 12 21, 12 21 Z"
        stroke={color} strokeWidth={stroke} strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="2.6" stroke={color} strokeWidth={stroke}/>
    </svg>
  );
}

export function IconUser({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.8" stroke={color} strokeWidth={stroke}/>
      <path d="M4.5 20 C 5.5 16, 8.5 14.5, 12 14.5 C 15.5 14.5, 18.5 16, 19.5 20"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconQR({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
      <rect x="5.5" y="5.5" width="2" height="2" fill={color}/>
      <rect x="16.5" y="5.5" width="2" height="2" fill={color}/>
      <rect x="5.5" y="16.5" width="2" height="2" fill={color}/>
      <rect x="14" y="14" width="2" height="2" fill={color}/>
      <rect x="19" y="14" width="2" height="2" fill={color}/>
      <rect x="14" y="19" width="2" height="2" fill={color}/>
      <rect x="19" y="19" width="2" height="2" fill={color}/>
      <rect x="16.5" y="16.5" width="2" height="2" fill={color}/>
    </svg>
  );
}

export function IconArrowRight({ size = 16, color = 'currentColor', stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconChevron({ size = 14, color = 'currentColor', dir = 'right', stroke = 2 }) {
  const rotMap = { right: 0, left: 180, down: 90, up: -90 };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rotMap[dir]}deg)` }}>
      <path d="M9 5 L 16 12 L 9 19" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconSearch({ size = 16, color = 'currentColor', stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth={stroke}/>
      <path d="M16 16 L 20 20" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconFlame({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3 C 13 7, 16 8, 16 12 C 16 12, 18 11, 18 9 C 19 12, 19.5 14, 19.5 15.5 C 19.5 19, 16 21.5, 12 21.5 C 8 21.5, 4.5 19, 4.5 15.5 C 4.5 12.5, 7 11, 8 8 C 8.5 10, 10 10.5, 10 13 C 10 11, 11 9, 12 3 Z"
        fill={color}/>
    </svg>
  );
}

export function IconHeart({ size = 18, color = 'currentColor', filled = false, stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <path d="M12 20 C 12 20, 3.5 14, 3.5 8.5 A 4.5 4.5 0 0 1 12 6.5 A 4.5 4.5 0 0 1 20.5 8.5 C 20.5 14, 12 20, 12 20 Z"
        stroke={color} strokeWidth={stroke} strokeLinejoin="round"/>
    </svg>
  );
}

export function IconClock({ size = 14, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={stroke}/>
      <path d="M12 7 V 12 L 15.5 14" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconPlus({ size = 16, color = 'currentColor', stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5 V 19 M 5 12 H 19" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconMinus({ size = 16, color = 'currentColor', stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12 H 19" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

export function IconLock({ size = 14, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke={color} strokeWidth={stroke}/>
      <path d="M8 11 V 8 A 4 4 0 0 1 16 8 V 11" stroke={color} strokeWidth={stroke}/>
    </svg>
  );
}

export function IconCheck({ size = 14, color = 'currentColor', stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5 L 10 17.5 L 19 7.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconClose({ size = 16, color = 'currentColor', stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6 L 18 18 M 18 6 L 6 18" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
  );
}

/* ─── REWARD GLYPHS ─── */

export function GlyphPie({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 13 C 3 9, 7 6.5, 12 6.5 C 17 6.5, 21 9, 21 13 L 20.5 14 L 3.5 14 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M3.5 14 L 4 18 H 20 L 20.5 14" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8 10 L 9 11 M 12 9 L 12 10.5 M 16 10 L 15 11" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function GlyphCoffee({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 8 H 17 V 16 A 4 4 0 0 1 13 20 H 9 A 4 4 0 0 1 5 16 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M17 10 H 19 A 2.5 2.5 0 0 1 19 15 H 17" stroke={color} strokeWidth="1.4"/>
      <path d="M9 3 C 8 4.5, 10 5.5, 9 7 M 12 3 C 11 4.5, 13 5.5, 12 7 M 15 3 C 14 4.5, 16 5.5, 15 7"
        stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function GlyphJuice({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 7 H 17 L 16 21 H 8 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="7.5" y1="11" x2="16.5" y2="11" stroke={color} strokeWidth="1.4"/>
      <path d="M10 3 L 10 7 M 14 3 L 14 7" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function GlyphSide({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9 L 18 9 L 16.5 19 H 7.5 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M9 6 V 9 M 12 5 V 9 M 15 6 V 9" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function GlyphCocktail({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 5 H 20 L 12 14 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="12" y1="14" x2="12" y2="20" stroke={color} strokeWidth="1.4"/>
      <line x1="9" y1="20" x2="15" y2="20" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="16" cy="6.5" r="1" fill={color}/>
    </svg>
  );
}

export function GlyphPlate({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="1.2" fill={color}/>
    </svg>
  );
}

export function GlyphEntree({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 14 A 9 5 0 0 1 21 14 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="3" y1="14" x2="21" y2="14" stroke={color} strokeWidth="1.4"/>
      <path d="M12 14 V 8 M 12 8 H 14" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="3" y1="17" x2="21" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function GlyphCake({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="11" width="16" height="9" rx="1" stroke={color} strokeWidth="1.4"/>
      <line x1="4" y1="15" x2="20" y2="15" stroke={color} strokeWidth="1.4"/>
      <path d="M9 11 V 6 M 12 11 V 5 M 15 11 V 6" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="9" cy="5.5" r="0.8" fill={color}/>
      <circle cx="12" cy="4.5" r="0.8" fill={color}/>
      <circle cx="15" cy="5.5" r="0.8" fill={color}/>
    </svg>
  );
}

export const REWARD_GLYPHS = {
  pie: GlyphPie, coffee: GlyphCoffee, juice: GlyphJuice, side: GlyphSide,
  cocktail: GlyphCocktail, plate: GlyphPlate, entree: GlyphEntree, cake: GlyphCake,
};

/* ─── DECORATIVE LINEWORK ─── */

export function RuleOrnament({ color = 'var(--ink-3)', ornament = 'star', width = 'auto' }) {
  const O = ornament === 'star' ? OrnStar : OrnAdinkrahene;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width }}>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.25 }}/>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.6, transform: 'translateY(-2px)' }}/>
      <O size={10} color={color}/>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.6, transform: 'translateY(-2px)' }}/>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.25 }}/>
    </div>
  );
}

/* ─── MONEY FORMATTER ─── */

export function Money({ n, sign = '', size = 'inherit', muted = 0.6, sans = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, whiteSpace: 'nowrap' }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: typeof size === 'number' ? size * 0.66 : '0.66em',
        letterSpacing: '0.02em',
        opacity: muted,
        lineHeight: 1,
      }}>
        {sign}GH&#8373;
      </span>
      <span style={{ fontFamily: sans ? 'var(--font-body)' : 'inherit', fontSize: size }}>
        {Math.abs(n).toLocaleString()}
      </span>
    </span>
  );
}
