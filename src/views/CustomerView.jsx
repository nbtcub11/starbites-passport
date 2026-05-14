import { TIERS, getTwiGreeting } from '../data/customers';
import PassportCard from '../components/PassportCard';
import PointsDashboard from '../components/PointsDashboard';
import TransactionHistory from '../components/TransactionHistory';
import RewardsCatalog from '../components/RewardsCatalog';
import TierPerks from '../components/TierPerks';
import BadgeShowcase from '../components/BadgeShowcase';

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

      {/* How it works (Red tier only) */}
      {customer.tier === 'red' && (
        <div className="px-4 mb-5 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="bg-[#C41E3A] rounded-2xl p-5 relative overflow-hidden shadow-warm-lg">
            <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="font-serif text-[18px] text-white mb-4">How it works</div>
              <div className="space-y-3.5">
                {[
                  { icon: '📱', text: 'Order online or scan your QR in-store' },
                  { icon: '⭐', text: 'Earn bites on every order — higher tiers earn up to 2x' },
                  { icon: '🎁', text: 'Unlock perks like free items, discounts & deliveries' },
                  { icon: '🏆', text: 'Level up from Red → Silver → Gold → Platinum' },
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

      {/* Badges & Streak */}
      <div className="px-4 mb-5">
        <BadgeShowcase customer={customer} />
      </div>

      {/* Rewards Catalog */}
      <div className="px-4 mb-5">
        <RewardsCatalog customer={customer} />
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-5">
        <TransactionHistory customer={customer} />
      </div>

      {/* Tier Journey */}
      <div className="px-4 mb-5">
        <TierPerks customer={customer} />
      </div>

      {/* Dash a friend */}
      <div className="px-4 mb-5 animate-slide-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
        <div className="bg-[#C41E3A] rounded-2xl p-5 relative overflow-hidden shadow-warm-lg">
          <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-36 h-36 opacity-10 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, white, transparent)' }} />
          <div className="relative z-10">
            <div className="font-serif text-[20px] leading-tight text-white">Dash a friend</div>
            <div className="text-[13px] text-white/90 mt-2 leading-relaxed">
              Share the love — you both get <span className="font-bold text-[#E0BC5A]">200 bites</span> when they complete their first order at any Starbites
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
