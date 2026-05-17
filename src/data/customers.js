/* ─── Refined data layer ─── */

export const TIERS = {
  red: {
    key: 'red', name: 'Red', ordinal: 'I', threshold: 0,
    color: '#7B1A2B', inkColor: '#FBF6EC',
    cardBg: 'linear-gradient(155deg, #9B2535 0%, #7B1A2B 28%, #5A0F1A 70%, #7B1A2B 100%)',
    accent: '#E0B6BD', discount: 0, multiplier: 1,
    signature: 'Free pastry or drink on sign-up',
    perks: ['Free pastry or drink on sign-up', 'Earn 1\u00d7 stars on every order', 'Double Star days', 'Referral bonus (50 stars)'],
  },
  silver: {
    key: 'silver', name: 'Silver', ordinal: 'II', threshold: 1500,
    color: '#6F7A82', inkColor: '#FBF6EC',
    cardBg: 'linear-gradient(155deg, #A9B2B8 0%, #8B949B 26%, #5E6970 70%, #8B949B 100%)',
    accent: '#D6DCE0', discount: 0, multiplier: 1.1,
    signature: 'Birthday gift + free side on GH\u20B5500+ orders',
    perks: ['Free pastry or drink on sign-up', 'Earn 1.1\u00d7 stars', 'Double Star days', 'Referral bonus (50 stars)', 'Birthday gift \u2014 free pastry or drink', 'Free side on GH\u20B5500+ orders'],
  },
  gold: {
    key: 'gold', name: 'Gold', ordinal: 'III', threshold: 3000,
    color: '#B8893A', inkColor: '#1A1410',
    cardBg: 'linear-gradient(155deg, #E8C97A 0%, #C99D45 22%, #A07626 56%, #C99D45 82%, #E5C677 100%)',
    accent: '#F4E2B0', discount: 5, multiplier: 1.25,
    signature: '5% off everything + 1 free delivery / quarter',
    perks: ['Free pastry or drink on sign-up', 'Earn 1.25\u00d7 stars', 'Double Star days', 'Referral bonus (50 stars)', 'Birthday gift \u2014 free pastry or drink', '5% off everything', '1 free delivery per quarter'],
  },
  platinum: {
    key: 'platinum', name: 'Platinum', ordinal: 'IV', threshold: 6000,
    color: '#1B1A2A', inkColor: '#E8DDC8',
    cardBg: 'linear-gradient(155deg, #2C2940 0%, #1B1A2A 30%, #07060F 58%, #1B1A2A 78%, #2A2842 100%)',
    accent: '#B8893A', discount: 10, multiplier: 1.5,
    signature: '10% off everything + 1 free delivery / month',
    perks: ['Free pastry or drink on sign-up', 'Earn 1.5\u00d7 stars', 'Double Star days', 'Referral bonus (50 stars)', 'Birthday gift \u2014 free pastry or drink', '10% off everything', '1 free delivery per month', 'GH\u20B5500 Starbites gift card (annual)'],
  },
};

export const TIER_ORDER = ['red', 'silver', 'gold', 'platinum'];

export const CUSTOMERS = [
  {
    id: 1, name: 'Naomi Mensah', firstName: 'Naomi',
    phone: '024 555 1234', tier: 'red',
    points: 85, lifetimePoints: 85,
    memberSince: '2026-04-20', memberNumber: 'SB-2026-0847', avatar: 'NM',
    birthday: '1998-08-14',
    transactions: [
      { date: '2026-05-11', location: 'Osu To-Go', format: 'To-Go', items: ['Meat Pie', 'Club Beer'], amount: 55, points: 65 },
      { date: '2026-05-08', location: 'Osu To-Go', format: 'To-Go', items: ['Chicken Pie', 'Coffee'], amount: 50, points: 60 },
      { date: '2026-05-03', location: 'Osu To-Go', format: 'To-Go', items: ['Sandwich', 'Matcha Latte'], amount: 70, points: 80 },
    ],
  },
  {
    id: 2, name: 'Jed Yeboah', firstName: 'Jed',
    phone: '020 333 7890', tier: 'silver',
    points: 1820, lifetimePoints: 1820,
    memberSince: '2026-01-15', memberNumber: 'SB-2026-0213', avatar: 'JY',
    birthday: '1995-03-22',
    transactions: [
      { date: '2026-05-12', location: 'Tesano Express', format: 'Express', items: ['Matcha Latte', 'Croissant'], amount: 65, points: 75 },
      { date: '2026-05-10', location: 'Tesano Express', format: 'Express', items: ['American Breakfast', 'Fresh Juice'], amount: 95, points: 105 },
      { date: '2026-05-07', location: 'Westlands', format: 'To-Go', items: ['Rice Box', 'Pineapple Juice'], amount: 80, points: 90 },
      { date: '2026-05-04', location: 'Tesano Express', format: 'Express', items: ['Matcha Latte', 'Meat Pie'], amount: 55, points: 65 },
    ],
  },
  {
    id: 3, name: 'Gloria Nortey', firstName: 'Gloria',
    phone: '027 888 4567', tier: 'gold',
    points: 3200, lifetimePoints: 3200,
    memberSince: '2025-08-10', memberNumber: 'SB-2025-0156', avatar: 'GN',
    birthday: '1990-11-05',
    transactions: [
      { date: '2026-05-11', location: 'East Legon Signature', format: 'Signature', items: ['Fantastic Jollof', 'Grilled Tilapia', 'Kids Burger'], amount: 380, points: 390 },
      { date: '2026-05-05', location: 'East Legon Signature', format: 'Signature', items: ['Rich Palava', 'Fufu', 'Pizza'], amount: 310, points: 320 },
      { date: '2026-04-28', location: 'East Legon Signature', format: 'Signature', items: ['English Breakfast', 'Pancakes'], amount: 280, points: 290 },
    ],
  },
  {
    id: 4, name: 'Eric Andoh', firstName: 'Eric',
    phone: '024 111 0000', tier: 'platinum',
    points: 12500, lifetimePoints: 12500,
    memberSince: '2021-03-01', memberNumber: 'SB-2021-0003', avatar: 'EA',
    birthday: '1985-06-30',
    transactions: [
      { date: '2026-05-12', location: 'East Legon Signature', format: 'Signature', items: ['Jollof Cocktail', 'Grilled Chicken'], amount: 185, points: 195 },
      { date: '2026-05-11', location: 'East Legon Signature', format: 'Signature', items: ['English Breakfast', 'Fresh Juice'], amount: 120, points: 130 },
      { date: '2026-05-10', location: 'East Legon Signature', format: 'Signature', items: ['Burger', 'Fries', 'Club Beer'], amount: 150, points: 160 },
      { date: '2026-05-09', location: 'East Legon Signature', format: 'Signature', items: ['Carbonara', 'Cocktail', 'Dessert'], amount: 200, points: 210 },
      { date: '2026-05-08', location: 'Osu To-Go', format: 'To-Go', items: ['Meat Pie \u00d73', 'Coffee \u00d73'], amount: 180, points: 190 },
    ],
  },
];

export const REWARDS = [
  { id: 1, points: 100, name: 'Meat Pie', kind: 'Pastry', icon: 'pie' },
  { id: 2, points: 150, name: 'Coffee or Tea', kind: 'Drink', icon: 'coffee' },
  { id: 3, points: 250, name: 'Juice / Soft Drink', kind: 'Drink', icon: 'juice' },
  { id: 4, points: 400, name: 'Side Dish', kind: 'Side', desc: 'Fries \u00b7 Plantain \u00b7 Salad', icon: 'side' },
  { id: 5, points: 600, name: 'Signature Cocktail', kind: 'Bar', icon: 'cocktail' },
  { id: 6, points: 1000, name: 'Starter', kind: 'Course', icon: 'plate' },
  { id: 7, points: 2000, name: 'Main Entr\u00e9e', kind: 'Course', icon: 'entree' },
  { id: 8, points: 3000, name: 'Dessert + Drinks for Two', kind: 'Indulgence', icon: 'cake' },
];

export const FORMATS = {
  Signature: { color: '#2F4E3A', soft: '#E2EBE0', tag: 'SIG' },
  'To-Go':   { color: '#2B5B7B', soft: '#DDE8EF', tag: 'T-G' },
  Express:   { color: '#C76A3A', soft: '#F3E2D2', tag: 'EXP' },
};

export function getNextTier(tier) {
  const i = TIER_ORDER.indexOf(tier);
  return i < TIER_ORDER.length - 1 ? TIER_ORDER[i + 1] : null;
}

export function progressTo(points, tier) {
  const next = getNextTier(tier);
  if (!next) return { pct: 100, need: 0, nextName: null };
  const a = TIERS[tier].threshold;
  const b = TIERS[next].threshold;
  return {
    pct: Math.min(100, Math.max(0, ((points - a) / (b - a)) * 100)),
    need: Math.max(0, b - points),
    nextName: TIERS[next].name,
  };
}

export function twiGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Maakye';
  if (h < 17) return 'Maaha';
  return 'Maadwo';
}

export function twiGreetingLong() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function relDate(d) {
  const date = new Date(d);
  const now = new Date('2026-05-12');
  const diff = Math.floor((now - date) / (1000*60*60*24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function formatYearJoined(d) {
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
