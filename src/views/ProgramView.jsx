import { TIERS } from '../data/customers';

const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum'];

const DETAILED_PERKS = {
  bronze: {
    subtitle: 'Everyone starts here — just give your number',
    earnRate: '1 pt per GHS + 10 bonus per visit',
    perks: [
      { name: 'Earn points on every purchase', type: 'earn', desc: 'At any Starbites — Signature, To-Go, or Express' },
      { name: 'Redeem for free food & drinks', type: 'redeem', desc: 'Use points for free meat pies, coffees, entrees and more' },
      { name: 'Birthday dash', type: 'gift', desc: 'Free pastry on your birthday — our treat 🎂' },
      { name: 'Points updates via SMS', type: 'service', desc: 'Stay in the loop even without the app' },
    ],
  },
  silver: {
    subtitle: 'For regulars — visit 2-3x per week',
    earnRate: '1 pt per GHS + 10 bonus per visit',
    perks: [
      { name: 'All Bronze perks', type: 'inherit' },
      { name: '5% discount on food', type: 'discount', desc: 'Applied automatically when you order' },
      { name: 'Free drink upsize', type: 'gift', desc: 'Regular → Large on any hot or cold drink, every visit' },
      { name: 'Bonus rewards unlocked', type: 'redeem', desc: 'Access to cocktails and breakfast combo rewards' },
    ],
  },
  gold: {
    subtitle: 'For loyal families & dedicated regulars',
    earnRate: '1 pt per GHS + 10 bonus per visit + 5% bonus',
    perks: [
      { name: 'All Silver perks', type: 'inherit' },
      { name: '10% discount on food', type: 'discount', desc: 'Even more savings on every meal' },
      { name: 'Free welcome drink at Signature', type: 'gift', desc: 'Complimentary drink when you dine in at any Signature restaurant' },
      { name: 'Early access to events', type: 'service', desc: 'Book karaoke nights, brunches & special menus 48hrs before everyone else' },
      { name: 'Birthday free main course', type: 'gift', desc: 'Upgrade from pastry to any main dish on your birthday' },
      { name: 'Premium rewards unlocked', type: 'redeem', desc: 'Access to free starters and date night cocktail rewards' },
    ],
  },
  platinum: {
    subtitle: 'Our most valued members',
    earnRate: '1 pt per GHS + 10 bonus per visit + 10% bonus',
    perks: [
      { name: 'All Gold perks', type: 'inherit' },
      { name: '15% discount on food', type: 'discount', desc: 'The best savings at any Starbites location' },
      { name: 'Complimentary appetizer at Signature', type: 'gift', desc: 'Free starter with every Signature meal' },
      { name: 'Priority seating at Signature', type: 'service', desc: 'Never wait for a table — walk straight in' },
      { name: 'Birthday meal for two', type: 'gift', desc: '2 mains, 2 drinks, and dessert — celebrate on us' },
      { name: 'Quarterly StarbiteX credit', type: 'gift', desc: 'GHS 100 credit at StarbiteX each quarter — our premium dining experience' },
      { name: 'Exclusive menu previews', type: 'service', desc: 'Be the first to try new dishes before they launch' },
      { name: 'Exclusive Platinum rewards', type: 'redeem', desc: 'Free entrees and dinner-for-two rewards' },
    ],
  },
};

const PERK_TYPE_STYLES = {
  earn: { bg: '#E8F5E9', text: '#2E7D32', label: '⭐ EARN' },
  redeem: { bg: '#FFF3E0', text: '#E65100', label: '🎁 UNLOCK' },
  gift: { bg: '#FCE4EC', text: '#C62828', label: '🆓 FREE' },
  discount: { bg: '#FFF8E1', text: '#F57F17', label: '💰 SAVE' },
  service: { bg: '#E3F2FD', text: '#1565C0', label: '✨ PERK' },
  inherit: { bg: '#F5F0EB', text: '#8B8278', label: '✓' },
};

export default function ProgramView() {
  return (
    <div className="pb-40 -mt-5">
      {/* Header */}
      <div className="bg-[#C41E3A] text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-warm-lg mb-5 relative overflow-hidden">
        <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="font-serif text-[26px]">Starbites Rewards</div>
          <p className="text-[14px] text-white/80 mt-1 leading-relaxed">
            Earn points every time you eat. Level up for bigger perks. Your points never expire.
          </p>
        </div>
      </div>

      {/* How to earn */}
      <div className="px-4 mb-5">
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <div className="font-serif text-[17px] text-[#1A1612] mb-3">How You Earn</div>
          <div className="space-y-3">
            {[
              { icon: '📱', text: 'Give your phone number at any Starbites', sub: '"Number for receipt?" — that\'s it' },
              { icon: '⭐', text: '1 point for every GHS you spend', sub: 'Plus 10 bonus points per visit' },
              { icon: '🎁', text: 'Redeem points for free food & drinks', sub: 'Meat pies, coffees, entrees, cocktails and more' },
              { icon: '🏆', text: 'Level up for discounts & VIP perks', sub: 'The more you visit, the better it gets' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-[14px] font-bold text-[#1A1612]">{item.text}</div>
                  <div className="text-[12px] text-[#8B8278] mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points never expire callout */}
      <div className="px-4 mb-5">
        <div className="bg-gradient-to-r from-[#C8993E] to-[#E0BC5A] rounded-2xl p-4 flex items-center gap-3 shadow-warm">
          <span className="text-2xl">♾️</span>
          <div>
            <div className="text-[14px] font-bold text-[#1A1612]">Your points never expire</div>
            <div className="text-[12px] text-[#5D4037]">Take your time — they'll always be there</div>
          </div>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="px-4 mb-3">
        <div className="font-serif text-[17px] text-[#1A1612] px-1">The Tiers</div>
        <div className="text-[12px] text-[#8B8278] px-1 mt-0.5">Level up as you earn more points</div>
      </div>

      <div className="px-4 space-y-4">
        {TIER_ORDER.map(tierKey => {
          const tier = TIERS[tierKey];
          const details = DETAILED_PERKS[tierKey];
          return (
            <div key={tierKey} className="bg-sb-cream rounded-2xl shadow-warm border border-[#EDE8E2] overflow-hidden">
              {/* Tier header */}
              <div className="p-5 text-white relative overflow-hidden" style={{ background: tier.cardBg }}>
                <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{tier.emoji}</span>
                        <span className="font-serif text-[22px]">{tier.name}</span>
                      </div>
                      <div className="text-[13px] mt-1" style={{ color: tier.textColor, opacity: 0.8 }}>
                        {details.subtitle}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-bold font-mono" style={{ color: tier.textColor }}>
                        {tier.threshold === 0 ? 'Free' : tier.threshold.toLocaleString()}
                      </div>
                      {tier.threshold > 0 && (
                        <div className="text-[9px] uppercase tracking-wider" style={{ color: tier.textColor, opacity: 0.5 }}>pts to qualify</div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1.5 rounded-lg text-[11px] font-semibold inline-block"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: tier.textColor }}>
                    {details.earnRate}
                  </div>
                </div>
              </div>

              {/* Perks list */}
              <div className="p-4 space-y-2">
                {details.perks.map((perk, i) => {
                  const style = PERK_TYPE_STYLES[perk.type];
                  return (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F5F0EB] last:border-0">
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider mt-0.5"
                        style={{ backgroundColor: style.bg, color: style.text }}>
                        {style.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-[#1A1612]">{perk.name}</div>
                        {perk.desc && <div className="text-[12px] text-[#6B645C] mt-0.5 leading-relaxed">{perk.desc}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-4 mt-6">
        <div className="bg-[#C41E3A] rounded-2xl p-5 text-center relative overflow-hidden shadow-warm-lg">
          <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <div className="font-serif text-[22px] text-white">Ready to start earning?</div>
            <div className="text-[13px] text-white/80 mt-1">Just say "number for receipt" at any Starbites</div>
            <div className="text-[11px] text-white/50 mt-3">Yɛ da mo ase — We thank you for choosing Starbites</div>
          </div>
        </div>
      </div>
    </div>
  );
}
