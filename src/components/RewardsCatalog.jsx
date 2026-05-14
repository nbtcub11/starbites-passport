import { TIERS, getNextTier } from '../data/customers';

const PERK_ICONS = {
  'Sign-up gift': '🧃',
  'Welcome gift': '🧃',
  'Earn 1x': '⭐',
  'Earn 1.25x': '⭐',
  'Earn 1.5x': '⭐',
  'Earn 2x': '⭐',
  'Double bites': '🔥',
  'Seasonal': '🌟',
  '200 bites': '🤝',
  'Birthday': '🎂',
  'Free side': '🍟',
  'Free item': '🍟',
  '5% off': '💰',
  '10% off': '💰',
  '2 free deliveries': '🚗',
  'GHS 500': '🎁',
};

function getPerkIcon(perkText) {
  for (const [key, icon] of Object.entries(PERK_ICONS)) {
    if (perkText.includes(key)) return icon;
  }
  return '✦';
}

export default function RewardsCatalog({ customer }) {
  const tier = TIERS[customer.tier];
  const nextTierKey = getNextTier(customer.tier);
  const nextTier = nextTierKey ? TIERS[nextTierKey] : null;

  // All perks the customer currently has (flatten inherited tiers)
  const TIER_ORDER = ['red', 'silver', 'gold', 'platinum'];
  const currentIdx = TIER_ORDER.indexOf(customer.tier);
  const allActivePerks = [];
  for (let i = 0; i <= currentIdx; i++) {
    const t = TIERS[TIER_ORDER[i]];
    t.perks.filter(p => !p.startsWith('Everything')).forEach(p => {
      if (!allActivePerks.includes(p)) allActivePerks.push(p);
    });
  }

  // Perks from next tier the customer doesn't have yet
  const nextPerks = nextTier
    ? nextTier.perks.filter(p => !p.startsWith('Everything') && !allActivePerks.includes(p))
    : [];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-serif text-[17px] text-[#1A1612]">Your Perks</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
          {tier.name}
        </span>
      </div>

      {/* Active perks — horizontal carousel */}
      <div className="flex gap-2.5 overflow-x-auto scroll-snap-x hide-scrollbar pb-2 -mx-1 px-1">
        {allActivePerks.map((perk, i) => (
          <div key={i}
            className="shrink-0 w-[145px] rounded-2xl p-3.5 shadow-warm-sm border border-[#EDE8E2] flex flex-col items-center text-center"
            style={{ backgroundColor: '#FFFCF8' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-2"
              style={{ backgroundColor: `${tier.color}10` }}>
              {getPerkIcon(perk)}
            </div>
            <div className="text-[11px] font-bold text-[#1A1612] leading-tight flex-1">{perk}</div>
            <div className="mt-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold"
                style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
                ✓ Active
              </div>
            </div>
          </div>
        ))}

        {/* Next tier perks — locked */}
        {nextPerks.map((perk, i) => (
          <div key={`next-${i}`}
            className="shrink-0 w-[145px] rounded-2xl p-3.5 border border-[#EDE8E2] flex flex-col items-center text-center opacity-45"
            style={{ backgroundColor: '#F5F0EB' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-2 bg-[#EDE8E2] grayscale">
              {getPerkIcon(perk)}
            </div>
            <div className="text-[11px] font-bold text-[#8B8278] leading-tight flex-1">{perk}</div>
            <div className="mt-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE8E2] text-[8px] font-bold text-[#8B8278]">
                🔒 {nextTier.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
