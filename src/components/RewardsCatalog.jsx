import { TIERS, getNextTier } from '../data/customers';

const PERK_ICONS = {
  'Welcome gift': '🧃',
  'Earn': '⭐',
  'Double bites': '🔥',
  'Seasonal': '🌟',
  '200 bites': '🤝',
  'Everything': '✓',
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

  // Get perks for current tier (excluding "Everything in X" lines)
  const activePerks = tier.perks.filter(p => !p.startsWith('Everything'));

  // Get perks from next tier that customer doesn't have yet
  const nextPerks = nextTier
    ? nextTier.perks.filter(p => !p.startsWith('Everything') && !tier.perks.includes(p))
    : [];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-serif text-[17px] text-[#1A1612]">Your Perks</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
          {tier.name} tier
        </span>
      </div>

      {/* Active perks — horizontal carousel */}
      <div className="flex gap-3 overflow-x-auto scroll-snap-x hide-scrollbar pb-2 -mx-1 px-1">
        {activePerks.map((perk, i) => (
          <div key={i}
            className="shrink-0 w-[155px] rounded-2xl p-4 shadow-warm-sm border border-[#EDE8E2] flex flex-col items-center text-center"
            style={{ backgroundColor: '#FFFCF8' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2"
              style={{ backgroundColor: `${tier.color}10` }}>
              {getPerkIcon(perk)}
            </div>
            <div className="text-[12px] font-bold text-[#1A1612] leading-tight">{perk}</div>
            <div className="mt-auto pt-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
                ✓ Active
              </div>
            </div>
          </div>
        ))}

        {/* Preview of next tier perks — locked */}
        {nextPerks.slice(0, 3).map((perk, i) => (
          <div key={`next-${i}`}
            className="shrink-0 w-[155px] rounded-2xl p-4 border border-[#EDE8E2] flex flex-col items-center text-center opacity-50"
            style={{ backgroundColor: '#F5F0EB' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 bg-[#EDE8E2] grayscale">
              {getPerkIcon(perk)}
            </div>
            <div className="text-[12px] font-bold text-[#8B8278] leading-tight">{perk}</div>
            <div className="mt-auto pt-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE8E2] text-[9px] font-bold text-[#8B8278]">
                🔒 {nextTier.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
