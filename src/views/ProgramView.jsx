import { TIERS } from '../data/customers';

const TIER_ORDER = ['red', 'silver', 'gold', 'platinum'];

const DETAILED_PERKS = {
  red: {
    subtitle: 'Everyone starts here — just download the app',
    perks: [
      { name: 'Welcome dash — free juice', type: 'gift', desc: 'Your first reward, on us. Redeem at any location.' },
      { name: 'Earn 1x points on every purchase', type: 'earn', desc: 'Scan your QR or share your number to earn' },
      { name: 'Redeem points for free food & drinks', type: 'redeem', desc: 'Meat pies, coffees, entrees, cocktails and more' },
      { name: 'Double points on special days', type: 'earn', desc: 'Starbites picks the days — watch for announcements' },
      { name: 'Seasonal spotlight discounts', type: 'discount', desc: 'Limited-time prices on featured items' },
      { name: '200 points for every referral', type: 'earn', desc: 'Dash a friend — you both earn 200 points' },
    ],
  },
  silver: {
    subtitle: 'For regulars — visit 2-3x per week',
    perks: [
      { name: 'Everything in Red', type: 'inherit' },
      { name: 'Earn 1.25x points', type: 'earn', desc: '25% more points on every purchase' },
      { name: 'Birthday gift', type: 'gift', desc: 'Free pastry or drink on your special day 🎂' },
      { name: 'Free item on orders over GHS 100', type: 'gift', desc: 'Spend GHS 100+ and get a free side dish added to your order' },
      { name: 'Bonus reward tiers unlocked', type: 'redeem', desc: 'Access to cocktails and breakfast combo rewards' },
    ],
  },
  gold: {
    subtitle: 'For loyal families & dedicated regulars',
    perks: [
      { name: 'Everything in Silver', type: 'inherit' },
      { name: 'Earn 1.5x points', type: 'earn', desc: '50% more points on every purchase' },
      { name: '5% off select items', type: 'discount', desc: 'Savings on your favourite dishes, applied automatically' },
      { name: '2 free deliveries per month', type: 'gift', desc: 'No delivery fee on 2 orders each month' },
      { name: 'Early access to events', type: 'service', desc: 'Book karaoke nights, brunches & special menus 48hrs early' },
      { name: 'Birthday upgraded — free main course', type: 'gift', desc: 'Pick any entree on the menu, on the house' },
    ],
  },
  platinum: {
    subtitle: 'Our most valued members',
    perks: [
      { name: 'Everything in Gold', type: 'inherit' },
      { name: 'Earn 2x points', type: 'earn', desc: 'Double points on every single purchase' },
      { name: '10% off everything', type: 'discount', desc: 'The entire menu, every time — applied automatically' },
      { name: 'GHS 500 StarbiteX gift card', type: 'gift', desc: 'Annual gift card to our premium StarbiteX experience' },
      { name: 'Priority seating at Signature', type: 'service', desc: 'Walk straight in — never wait for a table' },
      { name: 'Birthday meal for two', type: 'gift', desc: '2 mains, 2 drinks, and dessert — celebrate on us' },
      { name: 'Exclusive menu previews', type: 'service', desc: 'Be the first to try new dishes before they launch' },
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
              { icon: '📱', text: 'Scan your QR code or share your number', sub: 'Open the app and tap your card, or just say your phone number' },
              { icon: '⭐', text: '1 point for every GHS you spend', sub: 'Plus 10 bonus points per visit — higher tiers earn up to 2x!' },
              { icon: '🎁', text: 'Redeem points for free food & drinks', sub: 'Meat pies, coffees, entrees, cocktails and more' },
              { icon: '🏆', text: 'Level up for multiplied points & perks', sub: 'Red → Silver 1.25x → Gold 1.5x → Platinum 2x' },
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

      {/* Points never expire + general rewards */}
      <div className="px-4 mb-5 space-y-3">
        <div className="bg-gradient-to-r from-[#C8993E] to-[#E0BC5A] rounded-2xl p-4 flex items-center gap-3 shadow-warm">
          <span className="text-2xl">♾️</span>
          <div>
            <div className="text-[14px] font-bold text-[#1A1612]">Your points never expire</div>
            <div className="text-[12px] text-[#5D4037]">Take your time — they'll always be there</div>
          </div>
        </div>
      </div>

      {/* General Rewards — all tiers */}
      <div className="px-4 mb-5">
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <div className="font-serif text-[17px] text-[#1A1612] mb-3">Rewards for Everyone</div>
          <div className="space-y-3">
            {[
              { icon: '🔥', title: 'Double Points Days', desc: 'Earn 2x points on Starbites-specified days. Watch the app for announcements!' },
              { icon: '🌟', title: 'Seasonal Spotlight', desc: 'Special discounts on featured seasonal items — new picks every month' },
              { icon: '🤝', title: 'Referral Points', desc: 'Dash a friend — you both earn 200 points when they make their first purchase' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F5F0EB] last:border-0">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[14px] font-bold text-[#1A1612]">{item.title}</div>
                  <div className="text-[12px] text-[#6B645C] mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
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
                  {tier.multiplier > 1 && (
                    <div className="mt-3 px-3 py-1.5 rounded-lg text-[12px] font-bold inline-block"
                      style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: tier.textColor }}>
                      ⚡ {tier.multiplier}x points on every purchase
                    </div>
                  )}
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
            <div className="text-[13px] text-white/80 mt-1">Scan your QR or say your phone number at any Starbites</div>
            <div className="text-[11px] text-white/50 mt-3">Yɛ da mo ase — We thank you for choosing Starbites</div>
          </div>
        </div>
      </div>
    </div>
  );
}
