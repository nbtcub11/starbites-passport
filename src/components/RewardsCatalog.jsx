import { useState } from 'react';
import { TIERS } from '../data/customers';

// Rewards are tier-gated: higher tiers unlock better rewards AND get discounted point costs
const ALL_REWARDS = [
  // Bronze+ rewards
  { id: 1, points: 100, name: 'Free Meat Pie', where: 'Express, To-Go', icon: '🥧', minTier: 'red' },
  { id: 2, points: 150, name: 'Free Coffee or Tea', where: 'All formats', icon: '☕', minTier: 'red' },
  { id: 3, points: 250, name: 'Free Juice or Soft Drink', where: 'All formats', icon: '🍹', minTier: 'red' },
  { id: 4, points: 400, name: 'Free Side Dish', where: 'All formats', desc: 'Fries, plantains, or salad', icon: '🍟', minTier: 'red' },
  // Silver+ rewards
  { id: 5, points: 500, name: 'Free Cocktail', where: 'Signature', desc: 'Any specialty drink', icon: '🍸', minTier: 'silver' },
  { id: 6, points: 400, name: 'Breakfast Combo', where: 'All formats', desc: 'Any breakfast + drink', icon: '🍳', minTier: 'silver' },
  // Gold+ rewards
  { id: 7, points: 800, name: 'Free Starter', where: 'Signature', icon: '🥗', minTier: 'gold' },
  { id: 8, points: 600, name: 'Date Night Cocktails', where: 'Signature', desc: '2 cocktails of choice', icon: '🥂', minTier: 'gold' },
  // Platinum exclusive
  { id: 9, points: 1500, name: 'Free Entree', where: 'Signature', desc: 'Any main course', icon: '🍽️', minTier: 'platinum' },
  { id: 10, points: 2500, name: 'Dinner for Two', where: 'Signature', desc: '2 entrees + drinks + dessert', icon: '🎂', minTier: 'platinum' },
];

const TIER_ORDER = ['red', 'silver', 'gold', 'platinum'];
const TIER_DISCOUNT = { red: 0, silver: 0.05, gold: 0.10, platinum: 0.20 }; // Points cost reduction

function getRewardsForTier(tierKey) {
  const idx = TIER_ORDER.indexOf(tierKey);
  return ALL_REWARDS.filter(r => TIER_ORDER.indexOf(r.minTier) <= idx);
}

function getDiscountedPoints(basePoints, tierKey) {
  const discount = TIER_DISCOUNT[tierKey] || 0;
  return Math.round(basePoints * (1 - discount));
}

export default function RewardsCatalog({ customer }) {
  const [redeemedId, setRedeemedId] = useState(null);
  const tier = TIERS[customer.tier];
  const rewards = getRewardsForTier(customer.tier);
  const pointsDiscount = TIER_DISCOUNT[customer.tier];

  function handleRedeem(rewardId) {
    setRedeemedId(rewardId);
    setTimeout(() => setRedeemedId(null), 2800);
  }

  const affordable = rewards.filter(r => customer.points >= getDiscountedPoints(r.points, customer.tier));

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
      <div className="flex items-center justify-between mb-1 px-1">
        <h3 className="font-serif text-[17px] text-[#1A1612]">Your Dashes</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
          {affordable.length} available
        </span>
      </div>

      {/* Tier bonus callout */}
      {pointsDiscount > 0 && (
        <div className="px-1 mb-3">
          <div className="text-[11px] font-medium" style={{ color: tier.color }}>
            {tier.name} perk: {Math.round(pointsDiscount * 100)}% fewer bites on all rewards ✨
          </div>
        </div>
      )}

      {/* Horizontal carousel */}
      <div className="flex gap-3 overflow-x-auto scroll-snap-x hide-scrollbar pb-2 -mx-1 px-1">
        {rewards.map((reward) => {
          const effectivePoints = getDiscountedPoints(reward.points, customer.tier);
          const canAfford = customer.points >= effectivePoints;
          const isRedeemed = redeemedId === reward.id;
          const isNewTierReward = reward.minTier === customer.tier && reward.minTier !== 'red';

          return (
            <div key={reward.id}
              className={`shrink-0 w-[165px] rounded-2xl overflow-hidden transition-all duration-300 relative ${
                canAfford ? 'shadow-warm' : 'opacity-50'
              }`}
              style={{
                backgroundColor: isRedeemed ? '#10B981' : '#FFFCF8',
                border: `1px solid ${isRedeemed ? '#10B981' : '#EDE8E2'}`,
              }}
            >
              {/* "NEW" badge for tier-unlocked rewards */}
              {isNewTierReward && !isRedeemed && (
                <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded-md text-[8px] font-extrabold text-white tracking-wider"
                  style={{ backgroundColor: tier.color }}>
                  NEW
                </div>
              )}

              {/* Redemption success overlay */}
              {isRedeemed && (
                <div className="absolute inset-0 bg-[#10B981] z-10 flex flex-col items-center justify-center text-white animate-fade-in rounded-2xl">
                  <div className="text-3xl mb-1">✓</div>
                  <div className="text-[12px] font-bold">Dashed!</div>
                  <div className="text-[10px] opacity-80 font-mono mt-1">SB-{Math.floor(1000 + Math.random() * 9000)}</div>
                </div>
              )}

              <div className="p-4 flex flex-col items-center text-center h-full">
                <div className="text-3xl mb-2">{reward.icon}</div>
                <div className="text-[12px] font-bold text-[#1A1612] leading-tight">{reward.name}</div>
                <div className="text-[10px] text-[#8B8278] mt-1">{reward.where}</div>
                {reward.desc && <div className="text-[9px] text-[#A89E94] mt-0.5">{reward.desc}</div>}

                <div className="mt-auto pt-3">
                  {pointsDiscount > 0 && effectivePoints < reward.points ? (
                    <div>
                      <span className="text-[11px] text-[#C8C0B6] line-through">{reward.points}</span>
                      <div className="font-serif text-[18px] font-bold" style={{ color: canAfford ? tier.color : '#C8C0B6' }}>
                        {effectivePoints.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="font-serif text-[18px] font-bold" style={{ color: canAfford ? tier.color : '#C8C0B6' }}>
                      {effectivePoints.toLocaleString()}
                    </div>
                  )}
                  <div className="text-[8px] text-[#8B8278] uppercase tracking-wider font-semibold -mt-0.5">bites</div>
                </div>

                {canAfford && !isRedeemed && (
                  <button
                    onClick={() => handleRedeem(reward.id)}
                    className="mt-2.5 w-full py-2 rounded-xl text-[11px] font-bold text-white transition-all active:scale-95"
                    style={{ background: tier.cardBg }}>
                    Claim Dash
                  </button>
                )}

                {!canAfford && (
                  <div className="mt-2.5 w-full py-2 rounded-xl text-[10px] font-semibold text-[#A89E94] bg-[#F5F0EB] text-center">
                    {(effectivePoints - customer.points).toLocaleString()} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
