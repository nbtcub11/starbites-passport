import { TIERS } from '../data/customers';

const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum'];

// Realistic perks designed to protect margins
// Key principle: most perks are zero-cost (recognition, priority) or high-margin (drinks, pastries)
// Discounts are capped and exclude alcohol
const DETAILED_PERKS = {
  bronze: {
    subtitle: 'Auto on enrollment — every customer starts here',
    earnRate: '1 pt per GHS + 10 bonus per visit',
    perks: [
      { name: 'Points on every purchase', cost: 'Zero cost', type: 'earn', desc: 'Accrues automatically via phone number' },
      { name: 'Full rewards catalog access', cost: 'Zero cost', type: 'redeem', desc: 'Redeem points for free items (see rewards)' },
      { name: 'Birthday free pastry', cost: '~GHS 3 COGS', type: 'gift', desc: 'Any pastry at any format. Once per year. SMS auto-sent.' },
      { name: 'SMS point updates', cost: '~GHS 0.05/msg', type: 'service', desc: 'Quarterly balance + tier progress' },
    ],
    marginNote: 'Zero ongoing cost. Birthday pastry COGS ~GHS 3/year per member. At scale (5,000 Bronze members), annual cost: ~GHS 15,000.',
  },
  silver: {
    subtitle: '500 pts — a regular who visits 2-3x per week for 2 months',
    earnRate: '1 pt per GHS + 10 bonus per visit',
    perks: [
      { name: 'All Bronze perks', cost: 'Included', type: 'inherit' },
      { name: '5% menu discount', cost: '~GHS 4 avg', type: 'discount', desc: 'Excludes alcohol & already-discounted combos. Average ticket GHS 80 → saves GHS 4.' },
      { name: 'Skip-the-line at To-Go', cost: 'Zero cost', type: 'service', desc: 'During peak hours (7-9am). Staff directs Silver+ to express counter.' },
      { name: 'Free upsize on drinks', cost: '~GHS 2 COGS', type: 'gift', desc: 'Regular → Large on any hot or cold drink. Once per visit.' },
    ],
    marginNote: '5% discount is the main cost. At avg GHS 80 ticket, 3x/week: ~GHS 12/week discount. Annual cost per Silver member: ~GHS 625. Offset by 20%+ visit frequency increase.',
  },
  gold: {
    subtitle: '2,500 pts — a loyal family or dedicated regular (~6 months)',
    earnRate: '1 pt per GHS + 10 bonus per visit + 5% bonus multiplier',
    perks: [
      { name: 'All Silver perks', cost: 'Included', type: 'inherit' },
      { name: '10% menu discount', cost: '~GHS 10 avg', type: 'discount', desc: 'Excludes alcohol & promotions. Customer picks best deal (no stacking).' },
      { name: 'Free welcome drink at Signature', cost: '~GHS 5 COGS', type: 'gift', desc: 'Soft drink, juice, or house cocktail when dining in at Signature. High-margin item.' },
      { name: 'Early access to events', cost: 'Zero cost', type: 'service', desc: 'Karaoke nights, brunches, special menus — 48hr early booking via app.' },
      { name: 'Dedicated WhatsApp line', cost: 'Zero cost', type: 'service', desc: 'Direct ordering via WhatsApp. Faster than call center. Same team manages it.' },
      { name: 'Birthday free main course', cost: '~GHS 15 COGS', type: 'gift', desc: 'Upgrade from pastry to any main. Once per year.' },
    ],
    marginNote: '10% discount on avg GHS 150 Signature ticket = GHS 15 per visit. Welcome drink COGS ~GHS 5. But Gold members visit more and bring guests. Target: 8% of members. Net positive from increased frequency + party bookings.',
  },
  platinum: {
    subtitle: '10,000 pts — daily regulars, families who dine weekly for 1+ year',
    earnRate: '1 pt per GHS + 10 bonus per visit + 10% bonus multiplier',
    perks: [
      { name: 'All Gold perks', cost: 'Included', type: 'inherit' },
      { name: '15% menu discount', cost: '~GHS 22 avg', type: 'discount', desc: 'Excludes alcohol. Does NOT stack with promotions — customer picks the better deal.' },
      { name: 'Complimentary appetizer at Signature', cost: '~GHS 8 COGS', type: 'gift', desc: 'Spring rolls, soup, or salad with any Signature meal.' },
      { name: 'Priority seating', cost: 'Zero cost', type: 'service', desc: 'Skip the waitlist at Signature. Hostess seats Platinum first.' },
      { name: 'Birthday meal for two', cost: '~GHS 40 COGS', type: 'gift', desc: '2 mains + 2 drinks + dessert. Once per year. The "Mr. Rob" experience.' },
      { name: 'Quarterly founder\'s table', cost: '~GHS 50 COGS', type: 'gift', desc: 'Invitation to dine with Eric/Deb. Chef\'s tasting menu. Max 8 Platinums per quarter.' },
      { name: 'Personal WhatsApp manager', cost: 'Staff time', type: 'service', desc: 'Dedicated contact for catering, reservations, special requests.' },
      { name: 'Exclusive menu previews', cost: 'Zero cost', type: 'service', desc: 'First to try new dishes before public launch.' },
    ],
    marginNote: 'Platinum is ~2% of members (target: 100 customers max in year 1). 15% discount is the biggest cost but these are your highest-LTV customers (GHS 200+ avg ticket, 4-5x/week). Annual discount cost per Platinum: ~GHS 8,000. But each Platinum brings GHS 40,000+ revenue. Net margin positive.',
  },
};

const PERK_TYPE_COLORS = {
  earn: { bg: '#E8F5E9', text: '#2E7D32', label: 'EARN' },
  redeem: { bg: '#FFF3E0', text: '#E65100', label: 'REDEEM' },
  gift: { bg: '#FCE4EC', text: '#C62828', label: 'FREE ITEM' },
  discount: { bg: '#FFF8E1', text: '#F57F17', label: 'DISCOUNT' },
  service: { bg: '#E3F2FD', text: '#1565C0', label: 'SERVICE' },
  inherit: { bg: '#F5F0EB', text: '#8B8278', label: 'INCLUDED' },
};

export default function ProgramView() {
  return (
    <div className="pb-40 -mt-5">
      {/* Header */}
      <div className="bg-[#1A1612] text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-warm-lg mb-5 relative overflow-hidden">
        <div className="absolute inset-0 kente-pattern opacity-5 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#C8993E]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B8278] font-bold">For the Team</span>
          </div>
          <div className="font-serif text-[24px]">Program Overview</div>
          <p className="text-[13px] text-white/50 mt-1 leading-relaxed">
            Tier structure, perks, and margin impact. Designed to cost under 3% of revenue.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-sb-cream rounded-xl p-3.5 shadow-warm-sm border border-[#EDE8E2] text-center">
            <div className="font-serif text-[22px] text-[#C41E3A] font-bold">&lt;3%</div>
            <div className="text-[9px] text-[#8B8278] uppercase tracking-wider font-bold mt-0.5">Revenue Cost</div>
          </div>
          <div className="bg-sb-cream rounded-xl p-3.5 shadow-warm-sm border border-[#EDE8E2] text-center">
            <div className="font-serif text-[22px] text-[#C8993E] font-bold">+20%</div>
            <div className="text-[9px] text-[#8B8278] uppercase tracking-wider font-bold mt-0.5">Repeat Visits</div>
          </div>
          <div className="bg-sb-cream rounded-xl p-3.5 shadow-warm-sm border border-[#EDE8E2] text-center">
            <div className="font-serif text-[22px] text-[#2E7D32] font-bold">60%</div>
            <div className="text-[9px] text-[#8B8278] uppercase tracking-wider font-bold mt-0.5">ID Capture</div>
          </div>
        </div>
      </div>

      {/* Distribution target */}
      <div className="px-4 mb-5">
        <div className="bg-sb-cream rounded-2xl p-4 shadow-warm-sm border border-[#EDE8E2]">
          <div className="text-[11px] text-[#8B8278] uppercase tracking-wider font-bold mb-3">Target Distribution (Month 12)</div>
          <div className="space-y-2.5">
            {TIER_ORDER.map(tierKey => {
              const tier = TIERS[tierKey];
              const pcts = { bronze: 70, silver: 20, gold: 8, platinum: 2 };
              return (
                <div key={tierKey} className="flex items-center gap-3">
                  <div className="w-16 text-[12px] font-bold" style={{ color: tier.color }}>{tier.name}</div>
                  <div className="flex-1 bg-[#EDE8E2] rounded-full h-5 overflow-hidden">
                    <div className="h-full rounded-full flex items-center pl-2 text-[10px] font-bold text-white"
                      style={{ width: `${pcts[tierKey]}%`, background: tier.cardBg, minWidth: '30px' }}>
                      {pcts[tierKey]}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Points Economy */}
      <div className="px-4 mb-5">
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <div className="font-serif text-[16px] text-[#1A1612] mb-3">Points Economy</div>
          <div className="space-y-2.5 text-[13px]">
            <div className="flex items-start gap-2">
              <span className="text-[#C8993E] mt-0.5">●</span>
              <div><strong>Earn:</strong> 1 point per 1 GHS spent + 10 bonus per transaction</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C8993E] mt-0.5">●</span>
              <div><strong>Aggregator orders (Bolt):</strong> 50% earn rate (lower margin)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C8993E] mt-0.5">●</span>
              <div><strong>Expiry:</strong> 12 months after last activity (warning SMS at month 11)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C8993E] mt-0.5">●</span>
              <div><strong>Redemption cap:</strong> Reward COGS must stay under 30% of point face value</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C41E3A] mt-0.5">●</span>
              <div><strong>Discount stacking:</strong> NOT allowed. Customer picks best deal (tier discount OR promotion, not both)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Detail Cards */}
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
                      <div className="text-[12px] mt-1" style={{ color: tier.textColor, opacity: 0.7 }}>
                        {details.subtitle}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-bold font-mono" style={{ color: tier.textColor }}>
                        {tier.threshold === 0 ? '0' : tier.threshold.toLocaleString()}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider" style={{ color: tier.textColor, opacity: 0.5 }}>pts to qualify</div>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1.5 rounded-lg text-[11px] font-semibold inline-block"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: tier.textColor }}>
                    {details.earnRate}
                  </div>
                </div>
              </div>

              {/* Perks list */}
              <div className="p-4 space-y-2.5">
                {details.perks.map((perk, i) => {
                  const typeStyle = PERK_TYPE_COLORS[perk.type];
                  return (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F5F0EB] last:border-0">
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider mt-0.5"
                        style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}>
                        {typeStyle.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-[#1A1612]">{perk.name}</div>
                        {perk.desc && <div className="text-[11px] text-[#6B645C] mt-0.5 leading-relaxed">{perk.desc}</div>}
                      </div>
                      <div className="shrink-0 text-right">
                        <span className={`text-[10px] font-bold ${perk.cost === 'Zero cost' || perk.cost === 'Included' ? 'text-[#2E7D32]' : 'text-[#8B8278]'}`}>
                          {perk.cost}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Margin note */}
              <div className="mx-4 mb-4 p-3 bg-[#FFF8E1] rounded-xl border border-[#FFE082]">
                <div className="text-[8px] font-extrabold text-[#F57F17] uppercase tracking-wider mb-1">💰 Margin Impact</div>
                <div className="text-[11px] text-[#5D4037] leading-relaxed">{details.marginNote}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Margin protection rules */}
      <div className="px-4 mt-5">
        <div className="bg-[#1A1612] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 kente-pattern opacity-5 pointer-events-none" />
          <div className="relative z-10">
            <div className="font-serif text-[18px] text-white mb-3">Margin Protection Rules</div>
            <div className="space-y-3">
              {[
                { icon: '🛡️', rule: 'No discount stacking', detail: 'Tier discount OR promotion — customer picks the better deal, never both.' },
                { icon: '🍺', rule: 'Alcohol excluded from discounts', detail: 'Discounts apply to food menu only. Drinks at full price (high margin preserved).' },
                { icon: '📊', rule: 'Weekly redemption audit', detail: 'Marketing reviews redemption patterns to spot fraud or abuse.' },
                { icon: '🔄', rule: 'Points expire after 12 months', detail: 'Prevents unlimited liability. Warning SMS at month 11.' },
                { icon: '📉', rule: 'Throttle high-cost rewards', detail: 'If redemption cost exceeds 3% of revenue, temporarily disable expensive rewards.' },
                { icon: '👔', rule: 'Discretionary upgrades capped', detail: '5 per branch per quarter. 90-day expiry. Manager approval required.' },
                { icon: '🚫', rule: 'No double-dipping', detail: 'Points don\'t accrue on items paid with rewards. No points on discounted portion.' },
                { icon: '📱', rule: 'Bolt orders at 50% earn rate', detail: 'Lower margin on aggregator orders = lower points. Encourages direct app ordering.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-[13px] font-bold text-white">{item.rule}</div>
                    <div className="text-[11px] text-white/50 mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
