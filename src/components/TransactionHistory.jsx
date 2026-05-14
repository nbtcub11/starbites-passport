import { TIERS, relativeDate } from '../data/customers';

const FORMAT_ICON = {
  Signature: '🍽️',
  'To-Go': '🛍️',
  Express: '⚡',
};

export default function TransactionHistory({ customer }) {
  const tier = TIERS[customer.tier];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-serif text-[17px] text-[#1A1612]">Recent Activity</h3>
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] rounded-full"
          style={{ backgroundColor: `${tier.color}18` }} />

        <div className="space-y-1">
          {customer.transactions.slice(0, 5).map((tx, i) => (
            <div key={i} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-3.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] bg-sb-cream border-2 z-10"
                style={{ borderColor: i === 0 ? tier.color : '#DED8D0' }}>
                {FORMAT_ICON[tx.format] || '📍'}
              </div>

              <div className="bg-sb-cream rounded-xl p-3.5 shadow-warm-sm border border-[#EDE8E2] transition-all group-hover:shadow-warm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px] text-[#1A1612]">{tx.location}</div>
                    <div className="text-[11px] text-[#8B8278] mt-0.5">{relativeDate(tx.date)}</div>
                    <div className="text-[11px] text-[#6B645C] mt-1 truncate">{tx.items.join(' · ')}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-[14px] font-bold animate-count" style={{ color: tier.color, animationDelay: `${0.3 + i * 0.08}s`, opacity: 0 }}>
                      +{tx.points}
                    </div>
                    <div className="text-[9px] text-[#8B8278] font-semibold">BITES</div>
                    <div className="text-[11px] text-[#6B645C] mt-0.5">GHS {tx.amount}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
