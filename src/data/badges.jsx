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
  { id: 'streak_3',       name: '3-Week Streak',   desc: 'Visited 3 weeks in a row',     icon: 'flame3',     bg: 'linear-gradient(155deg, #FFA94C 0%, #E84A5F 60%, #B5172E 100%)', accent: '#FFE3CF' },
  { id: 'streak_7',       name: 'Week Warrior',    desc: '7-week visit streak',          icon: 'flame7',     bg: 'linear-gradient(155deg, #FF4C4C 0%, #B5172E 50%, #7E0E1F 100%)', accent: '#FFD9D9' },
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

/* ─── Badge icon set — bold, filled, instantly recognizable ─── */
export const BADGE_ICONS = {
  /* Star with sparkle — first purchase */
  firstBite: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L 18.8 12.2 L 27.5 12.2 L 20.4 17.4 L 23 26 L 16 21 L 9 26 L 11.6 17.4 L 4.5 12.2 L 13.2 12.2 Z" fill={color}/>
      <circle cx="25" cy="7" r="2" fill={color} opacity="0.6"/>
      <circle cx="27" cy="5" r="1" fill={color} opacity="0.4"/>
    </svg>
  ),
  /* Coffee cup — regular customer */
  regular: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M7 12 H 21 V 22 A 4 4 0 0 1 17 26 H 11 A 4 4 0 0 1 7 22 Z" fill={color} opacity="0.9"/>
      <path d="M21 14 H 24 A 3 3 0 0 1 24 20 H 21" stroke={color} strokeWidth="2"/>
      <path d="M11 6 C 10 8, 12 9, 11 11 M 14 5 C 13 7, 15 8, 14 10 M 17 6 C 16 8, 18 9, 17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  /* Sunrise — early bird */
  earlyBird: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 22 H 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 22 A 7 7 0 0 1 9 22" fill={color} opacity="0.3"/>
      <path d="M16 22 A 7 7 0 0 0 23 22" fill={color} opacity="0.3"/>
      <circle cx="16" cy="22" r="7" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M16 9 V 5 M 8 12 L 5.5 9.5 M 24 12 L 26.5 9.5 M 6 17 H 3 M 29 17 H 26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  /* Crescent moon + stars — night owl */
  nightOwl: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M22 5 A 11 11 0 1 0 27 22 A 8.5 8.5 0 0 1 22 5 Z" fill={color} opacity="0.85"/>
      <circle cx="10" cy="12" r="1.5" fill={color} opacity="0.3"/>
      <circle cx="14" cy="8" r="1" fill={color} opacity="0.3"/>
    </svg>
  ),
  /* Two people with heart — social/referral */
  social: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="10" r="4.5" fill={color} opacity="0.85"/>
      <path d="M3 26 C 4 20, 7 18, 11 18 C 15 18, 18 20, 19 26" fill={color} opacity="0.6"/>
      <circle cx="22" cy="10" r="3.5" fill={color} opacity="0.7"/>
      <path d="M16 26 C 17 21, 19 19, 22 19 C 25 19, 27 21, 28 26" fill={color} opacity="0.5"/>
      <path d="M16 7 C 16 5.5, 17.2 4.5, 18.5 5 C 19.2 5.3, 19.5 6, 19.5 6.5 C 19.5 6, 19.8 5.3, 20.5 5 C 21.8 4.5, 23 5.5, 23 7 C 23 9, 19.5 11, 19.5 11 C 19.5 11, 16 9, 16 7 Z" fill={color}/>
    </svg>
  ),
  /* Compass — explorer */
  explorer: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2"/>
      <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="0.8" opacity="0.3"/>
      <path d="M12 12 L 14.5 19.5 L 16 16 L 19.5 14.5 Z" fill={color}/>
      <path d="M20 20 L 17.5 12.5 L 16 16 L 12.5 17.5 Z" fill={color} opacity="0.5"/>
      <circle cx="16" cy="16" r="1.5" fill={color}/>
    </svg>
  ),
  /* Fire with 3 — streak */
  flame3: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 C 18 8, 23 10, 23 16 C 23 16, 25.5 14, 25.5 11 C 27 15, 27 18, 27 20 C 27 25, 22 29, 16 29 C 10 29, 5 25, 5 20 C 5 16, 8 13, 9.5 9 C 10 12, 12 13, 12 16.5 C 12 14, 13 11, 16 3 Z"
        fill={color}/>
      <text x="16" y="23" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FBF6EC" fontFamily="Plus Jakarta Sans, sans-serif">3</text>
    </svg>
  ),
  /* Fire with 7 — week warrior */
  flame7: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 C 18 8, 23 10, 23 16 C 23 16, 25.5 14, 25.5 11 C 27 15, 27 18, 27 20 C 27 25, 22 29, 16 29 C 10 29, 5 25, 5 20 C 5 16, 8 13, 9.5 9 C 10 12, 12 13, 12 16.5 C 12 14, 13 11, 16 3 Z"
        fill={color}/>
      <text x="16" y="23" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FBF6EC" fontFamily="Plus Jakarta Sans, sans-serif">7</text>
    </svg>
  ),
  /* Steaming bowl — jollof lover */
  jollof: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="18" rx="12" ry="4" fill={color} opacity="0.9"/>
      <path d="M4 18 C 4 12, 9 8, 16 8 C 23 8, 28 12, 28 18" fill={color} opacity="0.7"/>
      <path d="M4 18 L 6 26 H 26 L 28 18" fill={color} opacity="0.5"/>
      <path d="M11 4 C 10 6, 12 7, 11 8 M 16 3 C 15 5, 17 6, 16 8 M 21 4 C 20 6, 22 7, 21 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  /* Shield with S — silver */
  tierSilver: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29 C 10 27, 5 23, 5 17 V 8 Z" fill={color} opacity="0.85"/>
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29" fill={color} opacity="0.6"/>
      <path d="M12.5 12 L 16 12 A 2 2 0 0 1 16 16 L 12.5 16 M 12.5 16 L 19.5 16 A 2 2 0 0 1 19.5 20 L 12.5 20" stroke="#FBF6EC" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  /* Shield with G — gold */
  tierGold: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29 C 10 27, 5 23, 5 17 V 8 Z" fill={color}/>
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29" fill={color} opacity="0.7"/>
      <text x="16" y="20" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FBF6EC" fontFamily="Plus Jakarta Sans, sans-serif">G</text>
    </svg>
  ),
  /* Shield with crown — platinum */
  tierPlat: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29 C 10 27, 5 23, 5 17 V 8 Z" fill={color}/>
      <path d="M16 3 L 27 8 V 17 C 27 23, 22 27, 16 29" fill={color} opacity="0.7"/>
      <path d="M10 18 L 12 13 L 16 16 L 20 13 L 22 18 Z" fill="#FBF6EC"/>
      <rect x="10" y="18" width="12" height="3" rx="0.5" fill="#FBF6EC"/>
    </svg>
  ),
  /* Laurel wreath — founding member */
  founding: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M8 24 C 6 20, 6 15, 8 11 C 9 9, 10 8, 11 7" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M24 24 C 26 20, 26 15, 24 11 C 23 9, 22 8, 21 7" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M6 20 C 8 19, 9 17, 9 15 M 7 16 C 9 16, 10 14, 10 12 M 9 13 C 10 13, 11 11, 11 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <path d="M26 20 C 24 19, 23 17, 23 15 M 25 16 C 23 16, 22 14, 22 12 M 23 13 C 22 13, 21 11, 21 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <path d="M16 8 L 17.8 13.5 L 23.5 13.5 L 18.8 17 L 20.6 22.5 L 16 19 L 11.4 22.5 L 13.2 17 L 8.5 13.5 L 14.2 13.5 Z" fill={color}/>
    </svg>
  ),
  /* Gift box with ribbon — dasher/referrer */
  dasher: ({ size = 28, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="14" width="22" height="13" rx="2" fill={color} opacity="0.8"/>
      <rect x="3" y="10" width="26" height="6" rx="2" fill={color}/>
      <rect x="14.5" y="10" width="3" height="17" fill={color} opacity="0.5"/>
      <path d="M16 10 C 16 10, 12 4, 9 6 C 7 8, 10 10, 16 10" fill={color}/>
      <path d="M16 10 C 16 10, 20 4, 23 6 C 25 8, 22 10, 16 10" fill={color}/>
    </svg>
  ),
};

export function isFoundingMember(memberSince) {
  const years = (new Date('2026-05-12') - new Date(memberSince)) / (365.25*24*60*60*1000);
  return years >= 3;
}
