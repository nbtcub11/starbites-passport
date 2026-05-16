/* ─── Badges: gamification layer ───
   Each badge has its own playful gradient palette (no emoji).
   Filled, vibrant tiles — meant to feel like sticker pulls. */

export const BADGES = [
  { id: 'first_bite',     name: 'First Star',      desc: 'Made your first purchase',     icon: 'firstBite',  bg: 'linear-gradient(155deg, #FF8A4C 0%, #E84A5F 100%)', accent: '#FFE3CF' },
  { id: 'regular',        name: 'Regular',         desc: '10+ visits',                   icon: 'regular',    bg: 'linear-gradient(155deg, #6CC6FF 0%, #2B5B7B 100%)', accent: '#DDF1FF' },
  { id: 'early_bird',     name: 'Early Bird',      desc: 'Ordered before 8am',           icon: 'earlyBird',  bg: 'linear-gradient(155deg, #FFD36C 0%, #E89C3F 70%, #C76A3A 100%)', accent: '#FFF1CC' },
  { id: 'night_owl',      name: 'Night Owl',       desc: 'Ordered after 8pm',            icon: 'nightOwl',   bg: 'linear-gradient(155deg, #4A4480 0%, #1B1A2A 100%)', accent: '#E0D3FF' },
  { id: 'social',         name: 'Social',          desc: 'Referred a friend',            icon: 'social',     bg: 'linear-gradient(155deg, #FF6FB5 0%, #B5172E 100%)', accent: '#FFDEED' },
  { id: 'explorer',       name: 'Explorer',        desc: 'Visited 2+ formats',           icon: 'explorer',   bg: 'linear-gradient(155deg, #4FBF8A 0%, #2F4E3A 100%)', accent: '#D6F1E0' },
  { id: 'streak_3',       name: '3-Day Streak',    desc: 'Visited 3 days in a row',      icon: 'flame3',     bg: 'linear-gradient(155deg, #FFA94C 0%, #E84A5F 60%, #B5172E 100%)', accent: '#FFE3CF' },
  { id: 'streak_7',       name: 'Week Warrior',    desc: '7-day visit streak',           icon: 'flame7',     bg: 'linear-gradient(155deg, #FF4C4C 0%, #B5172E 50%, #7E0E1F 100%)', accent: '#FFD9D9' },
  { id: 'jollof',         name: 'Jollof Lover',    desc: 'Ordered Jollof 5+ times',      icon: 'jollof',     bg: 'linear-gradient(155deg, #FF7A45 0%, #C76A3A 100%)', accent: '#FFE3CF' },
  { id: 'silver',         name: 'Silver Status',   desc: 'Reached Silver tier',          icon: 'tierSilver', bg: 'linear-gradient(155deg, #C5CDD2 0%, #6F7A82 100%)', accent: '#E8ECEE' },
  { id: 'gold',           name: 'Gold Member',     desc: 'Reached Gold tier',            icon: 'tierGold',   bg: 'linear-gradient(155deg, #F0CC6A 0%, #B8893A 100%)', accent: '#FFF1CC' },
  { id: 'platinum',       name: 'Platinum Elite',  desc: 'Reached Platinum tier',        icon: 'tierPlat',   bg: 'linear-gradient(155deg, #4F4E70 0%, #1B1A2A 100%)', accent: '#DCB66B' },
  { id: 'founding',       name: 'Founding Member', desc: '3+ years a member',            icon: 'founding',   bg: 'linear-gradient(155deg, #DCB66B 0%, #B8893A 100%)', accent: '#FBF6EC' },
  { id: 'dasher',         name: 'Dasher',          desc: 'Referred 3+ friends',          icon: 'dasher',     bg: 'linear-gradient(155deg, #76E0A8 0%, #2F4E3A 100%)', accent: '#D6F1E0' },
];

export function badgeEarned(b, customer) {
  switch (b.id) {
    case 'first_bite':    return customer.transactions.length >= 1;
    case 'regular':       return customer.lifetimePoints >= 300;
    case 'early_bird':    return customer.lifetimePoints >= 50;
    case 'night_owl':     return customer.tier !== 'red';
    case 'social':        return customer.lifetimePoints >= 500;
    case 'explorer':      return new Set(customer.transactions.map(t => t.format)).size >= 2;
    case 'streak_3':      return customer.transactions.length >= 3;
    case 'streak_7':      return customer.transactions.length >= 5;
    case 'jollof':        return customer.tier === 'gold' || customer.tier === 'platinum';
    case 'silver':        return ['silver','gold','platinum'].includes(customer.tier);
    case 'gold':          return ['gold','platinum'].includes(customer.tier);
    case 'platinum':      return customer.tier === 'platinum';
    case 'founding':      {
      const years = (new Date('2026-05-12') - new Date(customer.memberSince)) / (365.25*24*60*60*1000);
      return years >= 3;
    }
    case 'dasher':        return customer.tier === 'platinum';
    default: return false;
  }
}

export function getStreak(customer) {
  if (!customer.transactions.length) return 0;
  const dates = [...new Set(customer.transactions.map(t => t.date))].sort().reverse();
  let s = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i-1]) - new Date(dates[i])) / (1000*60*60*24);
    if (diff <= 2) s++; else break;
  }
  return s;
}

/* ─── Badge icon set — all custom SVG, no emoji ─── */
export const BADGE_ICONS = {
  firstBite: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.6"/>
      <path d="M16 25 C 10 25, 7 21, 7 16 C 7 16, 11 19, 13 17 C 14 16, 14 13, 13 12 C 11 10, 7 11, 7 11 C 8 7, 12 5, 16 5"
        fill={color} opacity="0.85"/>
    </svg>
  ),
  regular: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M9 16 A 7 7 0 0 1 23 14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M23 14 L 26 12 L 26 16" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M23 16 A 7 7 0 0 1 9 18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M9 18 L 6 20 L 6 16" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  earlyBird: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Sun rising over horizon */}
      <path d="M4 21 H 28" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="16" cy="21" r="6" stroke={color} strokeWidth="1.6" fill="none"/>
      <path d="M16 9 V 6 M 10 11 L 8 9 M 22 11 L 24 9" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  nightOwl: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M22 6 A 10 10 0 1 0 26 21 A 8 8 0 0 1 22 6 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="22" cy="10" r="1" fill={color}/>
      <circle cx="15" cy="14" r="1" fill={color} opacity="0.5"/>
    </svg>
  ),
  social: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="11" r="4" stroke={color} strokeWidth="1.6"/>
      <path d="M5 24 C 6 19, 9 17, 12 17 C 15 17, 18 19, 19 24" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="22" cy="9" r="3" stroke={color} strokeWidth="1.6"/>
      <path d="M20 22 C 21 18, 23 17, 25 17 C 27 17, 28 18, 28 19" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  explorer: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.6"/>
      <path d="M11 11 L 21 13 L 19 21 L 13 19 Z" fill={color} opacity="0.85"/>
      <circle cx="16" cy="16" r="1" fill="#FBF6EC"/>
    </svg>
  ),
  flame3: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 C 18 9, 22 11, 22 16 C 22 16, 24.5 14, 24.5 11.5 C 26 15, 26 18, 26 20 C 26 24.5, 21.5 28, 16 28 C 10.5 28, 6 24.5, 6 20 C 6 16, 9 14, 10.5 10 C 11 13, 13 14, 13 17 C 13 14, 14 12, 16 4 Z"
        fill={color}/>
      <text x="16" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FBF6EC" fontFamily="Plus Jakarta Sans">3</text>
    </svg>
  ),
  flame7: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 C 18 9, 22 11, 22 16 C 22 16, 24.5 14, 24.5 11.5 C 26 15, 26 18, 26 20 C 26 24.5, 21.5 28, 16 28 C 10.5 28, 6 24.5, 6 20 C 6 16, 9 14, 10.5 10 C 11 13, 13 14, 13 17 C 13 14, 14 12, 16 4 Z"
        fill={color}/>
      <text x="16" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FBF6EC" fontFamily="Plus Jakarta Sans">7</text>
    </svg>
  ),
  jollof: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="19" rx="11" ry="3.5" stroke={color} strokeWidth="1.6"/>
      <path d="M5 19 C 5 13, 10 9, 16 9 C 22 9, 27 13, 27 19" stroke={color} strokeWidth="1.6" fill="none"/>
      {/* Rice grains */}
      <ellipse cx="11" cy="14" rx="1.3" ry="0.7" fill={color} transform="rotate(20 11 14)"/>
      <ellipse cx="15" cy="12" rx="1.3" ry="0.7" fill={color}/>
      <ellipse cx="19" cy="14" rx="1.3" ry="0.7" fill={color} transform="rotate(-20 19 14)"/>
      <ellipse cx="14" cy="16" rx="1.3" ry="0.7" fill={color} transform="rotate(45 14 16)"/>
      <ellipse cx="18" cy="16" rx="1.3" ry="0.7" fill={color} transform="rotate(-45 18 16)"/>
    </svg>
  ),
  tierSilver: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L 20 8 L 28 12 L 24 17 L 26 25 L 16 23 L 6 25 L 8 17 L 4 12 L 12 8 Z" fill={color} opacity="0.85"/>
      <text x="16" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FBF6EC" fontFamily="DM Serif Display">II</text>
    </svg>
  ),
  tierGold: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L 20 8 L 28 12 L 24 17 L 26 25 L 16 23 L 6 25 L 8 17 L 4 12 L 12 8 Z" fill={color}/>
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FBF6EC" fontFamily="DM Serif Display">III</text>
    </svg>
  ),
  tierPlat: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L 20 8 L 28 12 L 24 17 L 26 25 L 16 23 L 6 25 L 8 17 L 4 12 L 12 8 Z" fill={color}/>
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FBF6EC" fontFamily="DM Serif Display">IV</text>
    </svg>
  ),
  founding: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Star with laurel suggestion */}
      <path d="M16 5 L 18.5 12.5 L 26.5 12.5 L 20 17 L 22.5 25 L 16 20 L 9.5 25 L 12 17 L 5.5 12.5 L 13.5 12.5 Z" fill={color}/>
      <text x="16" y="29" textAnchor="middle" fontSize="6" fontWeight="700" fill={color} fontFamily="Plus Jakarta Sans" letterSpacing="0.2em">EST</text>
    </svg>
  ),
  dasher: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 16 L 22 16 M 17 11 L 22 16 L 17 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="26" cy="16" r="3" stroke={color} strokeWidth="1.6"/>
    </svg>
  ),
};

export function isFoundingMember(memberSince) {
  const years = (new Date('2026-05-12') - new Date(memberSince)) / (365.25*24*60*60*1000);
  return years >= 3;
}
