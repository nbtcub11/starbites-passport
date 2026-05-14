import { TIERS } from '../data/customers';

const TIER_ORDER = ['red', 'silver', 'gold', 'platinum'];

export default function TierPerks({ customer }) {
  const currentIdx = TIER_ORDER.indexOf(customer.tier);

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
      <h3 className="font-serif text-[17px] text-[#1A1612] mb-4 px-1">Your Journey</h3>

      {/* Vertical stepper */}
      <div className="relative pl-10">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#E8E2DA]" />
        {/* Filled portion */}
        <div className="absolute left-[15px] top-4 w-[2px] transition-all duration-700"
          style={{
            height: `${(currentIdx / (TIER_ORDER.length - 1)) * 100}%`,
            maxHeight: 'calc(100% - 32px)',
            background: TIERS[customer.tier].cardBg,
          }}
        />

        <div className="space-y-5">
          {TIER_ORDER.map((tierKey, idx) => {
            const tier = TIERS[tierKey];
            const isActive = idx === currentIdx;
            const isAchieved = idx <= currentIdx;
            const isLocked = idx > currentIdx;

            return (
              <div key={tierKey} className="relative">
                {/* Step dot */}
                <div className={`absolute -left-10 top-1 w-[30px] h-[30px] rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                  isActive ? 'animate-glow' : ''
                }`}
                  style={{
                    background: isAchieved ? tier.cardBg : '#F5F0EB',
                    border: isAchieved ? 'none' : '2px solid #DED8D0',
                    '--glow-color': `${tier.color}40`,
                  }}>
                  <span className={`text-[11px] ${isAchieved ? '' : 'grayscale opacity-50'}`}>
                    {tier.emoji}
                  </span>
                </div>

                {/* Content */}
                <div className={`rounded-xl p-3.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-sb-cream shadow-warm border-2'
                    : isAchieved
                    ? 'bg-sb-cream/50'
                    : ''
                }`}
                  style={isActive ? { borderColor: `${tier.color}40` } : {}}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-[14px] ${isLocked ? 'text-[#C8C0B6]' : 'text-[#1A1612]'}`}>
                      {tier.name}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-md text-[8px] font-extrabold text-white tracking-wider"
                        style={{ backgroundColor: tier.color }}>
                        YOU ARE HERE
                      </span>
                    )}
                    {isLocked && (
                      <span className="text-[10px] text-[#C8C0B6]">{tier.threshold.toLocaleString()} pts</span>
                    )}
                  </div>

                  {/* Signature perk — the one thing that matters */}
                  <div className={`text-[12px] mt-1 ${isLocked ? 'text-[#C8C0B6]' : 'text-[#6B645C]'}`}>
                    {isActive || isAchieved ? (
                      <span className="font-medium" style={{ color: tier.color }}>{tier.signature}</span>
                    ) : (
                      tier.signature
                    )}
                  </div>

                  {/* Full perks list for active tier */}
                  {isActive && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#EDE8E2] space-y-1.5">
                      {tier.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: tier.color }} />
                          <span className="text-[11px] text-[#6B645C] leading-relaxed">{perk}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
