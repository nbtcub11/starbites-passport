// Achievement badges — gamification layer
export const BADGES = [
  { id: 'first_bite', name: 'First Bite', icon: '🍽️', desc: 'Made your first purchase', condition: (c) => c.transactions.length >= 1 },
  { id: 'regular', name: 'Regular', icon: '🔁', desc: '10+ visits', condition: (c) => c.lifetimePoints >= 300 },
  { id: 'big_spender', name: 'Big Spender', icon: '💰', desc: 'Spent GHS 500+ in a single order', condition: (c) => c.transactions.some(t => t.amount >= 200) },
  { id: 'early_bird', name: 'Early Bird', icon: '🌅', desc: 'Ordered before 8am', condition: (c) => true }, // demo: always true for simplicity
  { id: 'night_owl', name: 'Night Owl', icon: '🦉', desc: 'Ordered after 8pm', condition: (c) => c.tier !== 'red' },
  { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', desc: 'Referred a friend', condition: (c) => c.lifetimePoints >= 500 },
  { id: 'format_explorer', name: 'Explorer', icon: '🗺️', desc: 'Visited all 3 formats', condition: (c) => {
    const formats = new Set(c.transactions.map(t => t.format));
    return formats.size >= 2; // relaxed for demo
  }},
  { id: 'streak_3', name: '3-Day Streak', icon: '🔥', desc: 'Visited 3 days in a row', condition: (c) => c.transactions.length >= 3 },
  { id: 'streak_7', name: 'Week Warrior', icon: '⚡', desc: '7-day visit streak', condition: (c) => c.transactions.length >= 5 },
  { id: 'jollof_lover', name: 'Jollof Lover', icon: '🍚', desc: 'Ordered Fantastic Jollof 5+ times', condition: (c) => c.tier === 'gold' || c.tier === 'platinum' },
  { id: 'silver_status', name: 'Silver Status', icon: '🥈', desc: 'Reached Silver tier', condition: (c) => ['silver', 'gold', 'platinum'].includes(c.tier) },
  { id: 'gold_status', name: 'Gold Member', icon: '🥇', desc: 'Reached Gold tier', condition: (c) => ['gold', 'platinum'].includes(c.tier) },
  { id: 'platinum_status', name: 'Platinum Elite', icon: '💎', desc: 'Reached Platinum tier', condition: (c) => c.tier === 'platinum' },
  { id: 'founding', name: 'Founding Member', icon: '⭐', desc: 'Member for 3+ years', condition: (c) => {
    const years = (new Date() - new Date(c.memberSince)) / (365.25 * 24 * 60 * 60 * 1000);
    return years >= 3;
  }},
  { id: 'dasher', name: 'Dasher', icon: '🤝', desc: 'Referred 3+ friends', condition: (c) => c.tier === 'platinum' },
];

export function getEarnedBadges(customer) {
  return BADGES.filter(b => b.condition(customer));
}

export function getLockedBadges(customer) {
  return BADGES.filter(b => !b.condition(customer));
}

// Streak calculation (demo: based on consecutive transaction dates)
export function getStreak(customer) {
  if (!customer.transactions.length) return 0;
  const dates = [...new Set(customer.transactions.map(t => t.date))].sort().reverse();
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i - 1]) - new Date(dates[i])) / (1000 * 60 * 60 * 24);
    if (diff <= 2) streak++; // allow 1-day gap
    else break;
  }
  return streak;
}
