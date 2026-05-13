export const TIERS = {
  bronze: {
    name: 'Bronze',
    threshold: 0,
    color: '#8B6A42',
    textColor: '#FFF5EA',
    cardBg: 'linear-gradient(145deg, #A88058 0%, #8B6A42 28%, #6B4D2A 62%, #553B1E 100%)',
    cardAccent: '#C8993E',
    discount: 0,
    emoji: '🥉',
    signature: 'Birthday free pastry',
    perks: [
      'Points accrual on every purchase',
      'Access to full rewards catalog',
      'Birthday free pastry at any format',
    ],
  },
  silver: {
    name: 'Silver',
    threshold: 500,
    color: '#6B767B',
    textColor: '#F5F7F8',
    cardBg: 'linear-gradient(145deg, #9AA3A8 0%, #838E94 26%, #6B767B 54%, #5C666B 100%)',
    cardAccent: '#B8C4CA',
    discount: 5,
    emoji: '🥈',
    signature: '5% off everything',
    perks: [
      'All Bronze perks',
      '5% discount on full menu',
      'Skip-the-line at To-Go during peak',
    ],
  },
  gold: {
    name: 'Gold',
    threshold: 2500,
    color: '#C8993E',
    textColor: '#1A1612',
    cardBg: 'linear-gradient(145deg, #E8D08A 0%, #D4AF5A 18%, #C8993E 38%, #A67A24 62%, #C8993E 78%, #E0BC5A 100%)',
    cardAccent: '#FFF0CC',
    discount: 10,
    emoji: '🥇',
    signature: 'Free welcome drink at Signature',
    perks: [
      'All Silver perks',
      '10% discount on full menu',
      'Free welcome drink at Signature',
      'Early access to events & karaoke',
      'Dedicated WhatsApp delivery line',
    ],
  },
  platinum: {
    name: 'Platinum',
    threshold: 10000,
    color: '#1A1625',
    textColor: '#E8DDD0',
    cardBg: 'linear-gradient(145deg, #2D2840 0%, #1A1625 30%, #0F0D18 58%, #1A1625 78%, #2A2644 100%)',
    cardAccent: '#C8993E',
    discount: 15,
    emoji: '💎',
    signature: 'Priority seating + personal WhatsApp manager',
    perks: [
      'All Gold perks',
      '15% discount on full menu',
      'Complimentary appetizer at Signature',
      'Priority seating (skip the waitlist)',
      'Birthday meal for two, on the house',
      'Quarterly founder\'s table invitation',
      'Personal WhatsApp account manager',
    ],
  },
};

export const REWARDS = [
  { id: 1, points: 100, name: 'Free Meat Pie', where: 'Express, To-Go', icon: '🥧' },
  { id: 2, points: 150, name: 'Free Coffee or Tea', where: 'All formats', icon: '☕' },
  { id: 3, points: 250, name: 'Free Juice or Soft Drink', where: 'All formats', icon: '🍹' },
  { id: 4, points: 400, name: 'Free Side Dish', where: 'All formats', desc: 'Fries, plantains, or salad', icon: '🍟' },
  { id: 5, points: 600, name: 'Free Cocktail', where: 'Signature', desc: 'Any specialty drink', icon: '🍸' },
  { id: 6, points: 1000, name: 'Free Starter', where: 'Signature', icon: '🥗' },
  { id: 7, points: 2000, name: 'Free Entree', where: 'Signature', desc: 'Any main course', icon: '🍽️' },
  { id: 8, points: 3000, name: 'Dessert + Drinks for Two', where: 'Signature', icon: '🎂' },
];

export const CUSTOMERS = [
  {
    id: 1,
    name: 'Kwame Asante',
    phone: '024 555 1234',
    tier: 'bronze',
    points: 85,
    lifetimePoints: 85,
    memberSince: '2026-04-20',
    memberNumber: 'SB-2026-0847',
    avatar: 'KA',
    transactions: [
      { date: '2026-05-11', location: 'Osu To-Go', format: 'To-Go', items: ['Meat Pie', 'Club Beer'], amount: 55, points: 65 },
      { date: '2026-05-08', location: 'Osu To-Go', format: 'To-Go', items: ['Chicken & Mushroom Pie', 'Coffee'], amount: 50, points: 60 },
      { date: '2026-05-03', location: 'Osu To-Go', format: 'To-Go', items: ['Sandwich', 'Matcha Latte'], amount: 70, points: 80 },
    ],
    preferences: {
      favorites: ['Meat Pie', 'Chicken & Mushroom Pie'],
      allergies: [],
      notes: 'Morning commuter, usually visits 7-8am.',
    },
  },
  {
    id: 2,
    name: 'Ama Mensah',
    phone: '020 333 7890',
    tier: 'silver',
    points: 620,
    lifetimePoints: 620,
    memberSince: '2026-01-15',
    memberNumber: 'SB-2026-0213',
    avatar: 'AM',
    transactions: [
      { date: '2026-05-12', location: 'Tesano Express', format: 'Express', items: ['Matcha Latte', 'Croissant'], amount: 65, points: 75 },
      { date: '2026-05-10', location: 'Tesano Express', format: 'Express', items: ['American Breakfast', 'Fresh Juice'], amount: 95, points: 105 },
      { date: '2026-05-07', location: 'Westlands', format: 'To-Go', items: ['Rice Box', 'Pineapple Juice'], amount: 80, points: 90 },
      { date: '2026-05-04', location: 'Tesano Express', format: 'Express', items: ['Matcha Latte', 'Meat Pie'], amount: 55, points: 65 },
      { date: '2026-05-01', location: 'Tesano Express', format: 'Express', items: ['Chai Latte', 'Sandwich'], amount: 60, points: 70 },
    ],
    preferences: {
      favorites: ['Matcha Latte', 'Croissant', 'American Breakfast'],
      allergies: ['Peanuts'],
      notes: 'Prefers Express. Visits 3-4x per week.',
    },
  },
  {
    id: 3,
    name: 'Nana Adjei',
    phone: '027 888 4567',
    tier: 'gold',
    points: 3200,
    lifetimePoints: 3200,
    memberSince: '2025-08-10',
    memberNumber: 'SB-2025-0156',
    avatar: 'NA',
    transactions: [
      { date: '2026-05-11', location: 'East Legon Signature', format: 'Signature', items: ['Fantastic Jollof', 'Grilled Tilapia', 'Kids Burger x2', 'Cocktails x2'], amount: 380, points: 390 },
      { date: '2026-05-05', location: 'East Legon Signature', format: 'Signature', items: ['Rich Palava Sauce', 'Fufu', 'Pizza', 'Kids Menu'], amount: 310, points: 320 },
      { date: '2026-04-28', location: 'East Legon Signature', format: 'Signature', items: ['English Breakfast x2', 'Pancakes', 'Fresh Juice x3'], amount: 280, points: 290 },
    ],
    preferences: {
      favorites: ['Fantastic Jollof', 'Rich Palava Sauce', 'Grilled Tilapia'],
      allergies: [],
      notes: 'Family of 4. Mom loves local dishes, kids want burgers + pizza. Weekend regulars.',
      seating: 'Family table near garden',
    },
  },
  {
    id: 4,
    name: 'Robert Mensah-Bonsu',
    phone: '024 111 0000',
    tier: 'platinum',
    points: 12500,
    lifetimePoints: 12500,
    memberSince: '2021-03-01',
    memberNumber: 'SB-2021-0003',
    avatar: 'RM',
    transactions: [
      { date: '2026-05-12', location: 'East Legon Signature', format: 'Signature', items: ['Fantastic Jollof Cocktail', 'Grilled Chicken', 'Sweet Potato Mash'], amount: 185, points: 195 },
      { date: '2026-05-11', location: 'East Legon Signature', format: 'Signature', items: ['English Breakfast', 'Fresh Juice', 'Coffee'], amount: 120, points: 130 },
      { date: '2026-05-10', location: 'East Legon Signature', format: 'Signature', items: ['Burger', 'Fries', 'Club Beer x2'], amount: 150, points: 160 },
      { date: '2026-05-09', location: 'East Legon Signature', format: 'Signature', items: ['Pasta Carbonara', 'Cocktail', 'Dessert'], amount: 200, points: 210 },
      { date: '2026-05-08', location: 'Osu To-Go', format: 'To-Go', items: ['Meat Pie x3', 'Coffee x3'], amount: 180, points: 190 },
    ],
    preferences: {
      favorites: ['Fantastic Jollof Cocktail', 'English Breakfast', 'Grilled Chicken'],
      allergies: [],
      notes: '"Mr. Rob" — Daily regular for 5+ years. Everyone at East Legon knows him. Tips generously. Helps new staff.',
      seating: 'Window seat, right side',
    },
  },
];

export function getJoinYears(memberSince) {
  const years = (new Date() - new Date(memberSince)) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(years);
}

export function isFoundingMember(memberSince) {
  return getJoinYears(memberSince) >= 3;
}

export function getNextTier(currentTier) {
  const order = ['bronze', 'silver', 'gold', 'platinum'];
  const idx = order.indexOf(currentTier);
  return idx < order.length - 1 ? order[idx + 1] : null;
}

export function getProgressToNextTier(points, currentTier) {
  const next = getNextTier(currentTier);
  if (!next) return { progress: 100, pointsNeeded: 0, nextTierName: null };
  const currentThreshold = TIERS[currentTier].threshold;
  const nextThreshold = TIERS[next].threshold;
  const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return {
    progress: Math.min(progress, 100),
    pointsNeeded: nextThreshold - points,
    nextTierName: TIERS[next].name,
  };
}

export function getNextAffordableReward(points) {
  return REWARDS.filter(r => points >= r.points).pop() || null;
}

export function getTwiGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Maakye';      // Good morning
  if (hour < 17) return 'Maaha';       // Good afternoon
  return 'Maadwo';                      // Good evening
}

export function relativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date('2026-05-12'); // Demo date
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
