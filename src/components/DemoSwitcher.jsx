import { CUSTOMERS, TIERS } from '../data/customers';

export default function DemoSwitcher({ activeCustomerId, onSelect }) {
  return (
    <div className="px-3 pt-1 pb-0.5">
      <div className="rounded-xl bg-[#1A1612]/90 glass border border-white/[0.04] px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          {CUSTOMERS.map((c) => {
            const tier = TIERS[c.tier];
            const isActive = c.id === activeCustomerId;
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`transition-all duration-300 rounded-lg text-center ${
                  isActive
                    ? 'flex-[2] py-1.5 px-2 text-white'
                    : 'flex-1 py-1 px-1 text-gray-500 hover:text-gray-300 active:scale-90'
                }`}
                style={isActive ? { background: tier.cardBg } : {}}
              >
                {isActive ? (
                  <div>
                    <div className="text-[10px] font-bold truncate">{c.name.split(' ')[0]}</div>
                    <div className="text-[8px] opacity-60">{tier.name}</div>
                  </div>
                ) : (
                  <div className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-[9px] font-bold border"
                    style={{ borderColor: `${tier.color}40`, color: tier.color, backgroundColor: `${tier.color}15` }}>
                    {c.avatar}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
