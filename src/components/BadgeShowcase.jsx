import { useState } from 'react';
import { getEarnedBadges, getLockedBadges, getStreak } from '../data/badges';
import { TIERS } from '../data/customers';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export default function BadgeShowcase({ customer }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earned = getEarnedBadges(customer);
  const locked = getLockedBadges(customer);
  const streak = getStreak(customer);
  const tier = TIERS[customer.tier];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
      {/* Streak banner */}
      {streak >= 2 && (
        <div className="mb-4 flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-2xl p-4 shadow-warm text-white">
          <div className="text-3xl">🔥</div>
          <div className="flex-1">
            <div className="text-[15px] font-bold">{streak}-day streak!</div>
            <div className="text-[11px] opacity-80">
              {streak >= 7 ? "You're on fire! Week Warrior status 💪" :
               streak >= 5 ? "Almost a Week Warrior — keep going!" :
               "Keep visiting to build your streak"}
            </div>
          </div>
          <div className="text-3xl font-bold font-mono">{streak}</div>
        </div>
      )}

      {/* Badges section */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-serif text-[17px] text-[#1A1612]">Badges</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${tier.color}10`, color: tier.color }}>
          {earned.length}/{earned.length + locked.length}
        </span>
      </div>

      {/* Earned badges — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1 mb-3">
        {earned.map((badge, i) => (
          <button
            key={badge.id}
            onClick={() => { setSelectedBadge(badge); hapticLight(); }}
            className="shrink-0 w-[72px] flex flex-col items-center gap-1 p-2.5 rounded-xl bg-sb-cream border border-[#EDE8E2] shadow-warm-sm transition-all active:scale-90 hover:shadow-warm"
            style={{ animationDelay: `${0.4 + i * 0.05}s` }}
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-[8px] font-bold text-[#1A1612] text-center leading-tight truncate w-full">{badge.name}</span>
          </button>
        ))}
      </div>

      {/* Locked badges — dimmed */}
      {locked.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
          {locked.slice(0, 6).map(badge => (
            <button
              key={badge.id}
              onClick={() => { setSelectedBadge(badge); hapticLight(); }}
              className="shrink-0 w-[72px] flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#F5F0EB] border border-[#EDE8E2] opacity-40 transition-all active:scale-90"
            >
              <span className="text-2xl grayscale">{badge.icon}</span>
              <span className="text-[8px] font-bold text-[#8B8278] text-center leading-tight truncate w-full">???</span>
            </button>
          ))}
        </div>
      )}

      {/* Badge detail modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-6 modal-overlay"
          onClick={() => setSelectedBadge(null)}>
          <div className="bg-sb-cream rounded-3xl p-6 w-full max-w-[280px] text-center modal-content"
            onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">{selectedBadge.icon}</div>
            <div className="font-serif text-[20px] text-[#1A1612]">{selectedBadge.name}</div>
            <div className="text-[13px] text-[#6B645C] mt-1">{selectedBadge.desc}</div>
            {earned.find(b => b.id === selectedBadge.id) ? (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: tier.color }}>
                ✓ Earned
              </div>
            ) : (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDE8E2] text-[11px] font-bold text-[#8B8278]">
                🔒 Keep going!
              </div>
            )}
            <button onClick={() => setSelectedBadge(null)}
              className="mt-4 w-full py-2.5 bg-[#EDE8E2] text-[#6B645C] rounded-xl text-[12px] font-semibold">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
