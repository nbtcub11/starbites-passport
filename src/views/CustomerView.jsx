import { TIERS, getTwiGreeting } from '../data/customers';
import PassportCard from '../components/PassportCard';
import PointsDashboard from '../components/PointsDashboard';
import TransactionHistory from '../components/TransactionHistory';
import RewardsCatalog from '../components/RewardsCatalog';
import TierPerks from '../components/TierPerks';

export default function CustomerView({ customer, flipKey }) {
  const tier = TIERS[customer.tier];
  const twiGreeting = getTwiGreeting();

  return (
    <div key={customer.id} className="pb-40">
      {/* Welcome greeting */}
      <div className="px-5 mb-5 animate-fade-in">
        <div className="text-[13px] text-[#6B645C]">{twiGreeting} — Welcome back,</div>
        <div className="font-serif text-[26px] text-[#1A1612] -mt-0.5">{customer.name.split(' ')[0]}</div>
      </div>

      {/* Passport Card */}
      <div className="px-4 mb-6">
        <PassportCard customer={customer} flipKey={flipKey} />
      </div>

      {/* Points Dashboard */}
      <div className="px-4 mb-5">
        <PointsDashboard customer={customer} />
      </div>

      {/* How it works (Bronze only) */}
      {customer.tier === 'red' && (
        <div className="px-4 mb-5 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="bg-[#C41E3A] rounded-2xl p-5 relative overflow-hidden shadow-warm-lg">
            {/* Keep kente subtle and behind content */}
            <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="font-serif text-[18px] text-white mb-4">How it works</div>
              <div className="space-y-3.5">
                {[
                  { icon: '📱', text: '"Number for receipt?" — that\'s all it takes' },
                  { icon: '⭐', text: 'Earn 1 point per GHS spent + 10 bonus per visit' },
                  { icon: '🎁', text: 'Get dashed free pies, drinks & entrees' },
                  { icon: '🏆', text: 'Level up for bigger discounts & VIP treatment' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{step.icon}</span>
                    <span className="text-[14px] text-white font-medium leading-snug">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Catalog — horizontal carousel */}
      <div className="px-4 mb-5">
        <RewardsCatalog customer={customer} />
      </div>

      {/* Recent Activity — timeline */}
      <div className="px-4 mb-5">
        <TransactionHistory customer={customer} />
      </div>

      {/* Tier Journey — stepper */}
      <div className="px-4 mb-5">
        <TierPerks customer={customer} />
      </div>

      {/* Refer a friend */}
      <div className="px-4 mb-5 animate-slide-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
        <div className="bg-[#C41E3A] rounded-2xl p-5 relative overflow-hidden shadow-warm-lg">
          <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-36 h-36 opacity-10 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, white, transparent)' }} />
          <div className="relative z-10">
            <div className="font-serif text-[20px] leading-tight text-white">Dash a friend</div>
            <div className="text-[13px] text-white/90 mt-2 leading-relaxed">
              Share the love — you both get <span className="font-bold text-[#E0BC5A]">200 points</span> when they complete their first order at any Starbites
            </div>
            <button className="mt-4 bg-white text-[#C41E3A] text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-warm">
              Dash an Invite →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
