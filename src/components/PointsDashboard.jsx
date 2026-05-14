import { useEffect, useState } from 'react';
import { TIERS, getProgressToNextTier, getNextAffordableReward } from '../data/customers';

export default function PointsDashboard({ customer }) {
  const tier = TIERS[customer.tier];
  const { progress, pointsNeeded, nextTierName } = getProgressToNextTier(customer.points, customer.tier);
  const nextReward = getNextAffordableReward(customer.points);
  const [displayPoints, setDisplayPoints] = useState(0);

  // Animated counter
  useEffect(() => {
    setDisplayPoints(0);
    const target = customer.points;
    const duration = 1000;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic
      setDisplayPoints(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [customer.points]);

  const ringSize = 100;
  const strokeWidth = 7;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
      <div className="bg-sb-cream rounded-2xl p-5 shadow-warm border border-[#EDE8E2]">
        <div className="flex items-center gap-5">
          {/* Circular progress ring */}
          <div className="relative shrink-0" style={{ width: ringSize, height: ringSize }}>
            <svg width={ringSize} height={ringSize} className="block">
              {/* Background track */}
              <circle
                cx={ringSize / 2} cy={ringSize / 2} r={radius}
                fill="none" stroke="#E8E2DA" strokeWidth={strokeWidth}
              />
              {/* Progress arc */}
              <circle
                cx={ringSize / 2} cy={ringSize / 2} r={radius}
                fill="none"
                stroke={tier.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="progress-ring-circle"
                style={{ '--ring-circumference': circumference }}
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-serif text-[22px] font-bold leading-none" style={{ color: tier.color }}>
                {displayPoints.toLocaleString()}
              </div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mt-0.5">bites</div>
            </div>
          </div>

          {/* Info column */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tier.multiplier > 1 && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                  style={{ backgroundColor: `${tier.color}10`, color: tier.color, border: `1px solid ${tier.color}15` }}>
                  ⚡ {tier.multiplier}x bites
                </div>
              )}
              {tier.discount > 0 && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                  style={{ backgroundColor: `${tier.color}10`, color: tier.color, border: `1px solid ${tier.color}15` }}>
                  {tier.discount}% off
                </div>
              )}
            </div>

            {nextTierName ? (
              <div className="text-[13px] text-[#6B645C]">
                <span className="font-bold" style={{ color: tier.color }}>{pointsNeeded.toLocaleString()}</span>
                {' '}bites to <span className="font-semibold">{nextTierName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#C8993E]">
                <span>👑</span> Highest tier reached
              </div>
            )}

            {nextReward && (
              <div className="mt-2 text-[11px] text-[#8B8278]">
                Next reward: <span className="font-semibold text-[#1A1612]">{nextReward.icon} {nextReward.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
