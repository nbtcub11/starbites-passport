import { useState } from 'react';
import { TIERS, isFoundingMember } from '../data/customers';

export default function PassportCard({ customer, flipKey }) {
  const tier = TIERS[customer.tier];
  const isPlatinum = customer.tier === 'platinum';
  const isGold = customer.tier === 'gold';
  const founding = isFoundingMember(customer.memberSince);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[380px]" style={{ perspective: '1200px' }}>
      {/* Ambient glow behind card */}
      <div
        className="absolute inset-3 rounded-3xl blur-2xl opacity-25 transition-all duration-700"
        style={{ background: tier.cardBg }}
      />

      {/* Card — tappable */}
      <div
        key={flipKey}
        onClick={() => setShowQR(!showQR)}
        className="animate-card-enter relative overflow-hidden rounded-[18px] shadow-warm-xl cursor-pointer active:scale-[0.98] transition-transform"
        style={{
          background: tier.cardBg,
          aspectRatio: '1.586 / 1',
          padding: '22px 24px',
          boxShadow: `
            0 16px 50px rgba(26, 22, 18, 0.2),
            0 4px 16px rgba(26, 22, 18, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.15)
          `,
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        {/* Kente pattern overlay */}
        <div className="kente-pattern absolute inset-0 pointer-events-none" />

        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 60px 80px, white, transparent),
              radial-gradient(1.5px 1.5px at 100px 20px, white, transparent),
              radial-gradient(1px 1px at 150px 60px, white, transparent),
              radial-gradient(1.5px 1.5px at 200px 45px, white, transparent),
              radial-gradient(1px 1px at 250px 90px, white, transparent),
              radial-gradient(1.5px 1.5px at 300px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 120px, white, transparent),
              radial-gradient(1.5px 1.5px at 130px 140px, white, transparent),
              radial-gradient(1px 1px at 220px 130px, white, transparent),
              radial-gradient(1.5px 1.5px at 320px 110px, white, transparent),
              radial-gradient(1px 1px at 80px 170px, white, transparent),
              radial-gradient(1.5px 1.5px at 170px 190px, white, transparent),
              radial-gradient(1px 1px at 280px 180px, white, transparent)`,
          }}
        />

        {/* Holographic shimmer */}
        <div className="card-holo absolute inset-0 pointer-events-none overflow-hidden rounded-[18px]" />

        {/* Decorative radials */}
        <div className="absolute -top-16 -right-16 w-56 h-56 opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 65%)' }} />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 65%)' }} />

        {/* ─── QR CODE OVERLAY (shown on tap) ─── */}
        {showQR && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center animate-fade-in rounded-[18px]"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
            {/* Large QR code */}
            <div className="bg-white rounded-2xl p-4 shadow-warm-xl">
              <LargeQR />
            </div>
            <div className="mt-3 text-center">
              <div className="text-white text-[14px] font-bold">{customer.name}</div>
              <div className="text-white/60 text-[11px] font-mono mt-0.5">{customer.memberNumber}</div>
            </div>
            <div className="mt-2 px-3 py-1 rounded-full text-[10px] font-bold text-white/50 border border-white/20">
              Tap to close
            </div>
          </div>
        )}

        {/* ─── Card Content ─── */}
        <div className="relative h-full flex flex-col justify-between">
          {/* Top row: Brand + Tier badge */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <span className="font-serif text-[14px] font-bold" style={{ color: tier.textColor }}>S</span>
                </div>
                <div>
                  <div className="text-[14px] font-extrabold tracking-[0.22em] uppercase"
                    style={{ color: tier.textColor }}>
                    STARBITES
                  </div>
                  <div className="text-[8px] tracking-[0.35em] uppercase mt-px"
                    style={{ color: tier.textColor, opacity: 0.4 }}>
                    Member Passport
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg text-[9px] font-extrabold tracking-[0.18em] uppercase"
              style={{
                backgroundColor: isPlatinum ? 'rgba(200,153,62,0.18)' : 'rgba(255,255,255,0.1)',
                color: isPlatinum ? '#C8993E' : tier.textColor,
                border: `1px solid ${isPlatinum ? 'rgba(200,153,62,0.3)' : 'rgba(255,255,255,0.12)'}`,
              }}>
              {tier.name}
            </div>
          </div>

          {/* Bottom: Name + details */}
          <div className="mt-auto">
            {founding && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md mb-2 text-[8px] font-bold tracking-[0.15em] uppercase"
                style={{
                  backgroundColor: 'rgba(200,153,62,0.15)',
                  color: '#C8993E',
                  border: '1px solid rgba(200,153,62,0.2)',
                }}>
                <span className="text-[10px]">★</span>
                Founding Member
              </div>
            )}

            <div className="font-serif text-[24px] leading-tight tracking-wide"
              style={{ color: tier.textColor }}>
              {customer.name}
            </div>

            <div className="flex items-end justify-between mt-3">
              <div className="flex gap-5">
                <div>
                  <div className="text-[7px] uppercase tracking-[0.2em]"
                    style={{ color: tier.textColor, opacity: 0.35 }}>
                    Member Since
                  </div>
                  <div className="text-[12px] font-semibold mt-0.5"
                    style={{ color: tier.textColor, opacity: 0.8 }}>
                    {new Date(customer.memberSince).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-[7px] uppercase tracking-[0.2em]"
                    style={{ color: tier.textColor, opacity: 0.35 }}>
                    No.
                  </div>
                  <div className="text-[12px] font-semibold font-mono tracking-wider mt-0.5"
                    style={{ color: tier.textColor, opacity: 0.8 }}>
                    {customer.memberNumber}
                  </div>
                </div>
              </div>

              {/* Small QR hint */}
              <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <SmallQR color={tier.textColor} />
                <span className="text-[6px] uppercase tracking-wider font-bold"
                  style={{ color: tier.textColor, opacity: 0.35 }}>Tap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gold accent line for premium tiers */}
        {(isGold || isPlatinum) && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent 5%, ${tier.cardAccent}60 50%, transparent 95%)` }} />
        )}
      </div>

      {/* Gold particles for Platinum */}
      {isPlatinum && (
        <div className="gold-particles absolute inset-0 pointer-events-none overflow-hidden rounded-[18px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{
              left: `${10 + Math.random() * 80}%`,
              top: '-4px',
              animationDelay: `${i * 0.3 + 0.5}s`,
              animationDuration: `${2 + Math.random() * 1.5}s`,
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              borderRadius: `${Math.random() > 0.5 ? '50%' : '1px'}`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Large QR code for scan overlay */
function LargeQR() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      {/* Position detection patterns */}
      {[[5, 5], [95, 5], [5, 95]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="40" height="40" rx="4" stroke="#1A1612" strokeWidth="4" fill="none" />
          <rect x={x + 8} y={y + 8} width="24" height="24" rx="2" fill="#1A1612" />
        </g>
      ))}
      {/* Data modules — random-looking pattern */}
      {[
        [50,8,6,6],[58,8,6,6],[50,18,6,6],[66,8,6,6],[74,8,6,6],[82,8,6,6],
        [8,50,6,6],[18,50,6,6],[8,58,6,6],[8,66,6,6],[8,74,6,6],[8,82,6,6],
        [50,50,6,6],[58,50,6,6],[66,50,6,6],[50,58,6,6],[66,58,6,6],[50,66,6,6],[58,66,6,6],[66,66,6,6],
        [82,50,6,6],[90,50,6,6],[82,58,6,6],[98,58,6,6],[82,66,6,6],[90,66,6,6],[98,66,6,6],
        [50,82,6,6],[58,82,6,6],[66,82,6,6],[50,90,6,6],[66,90,6,6],
        [82,82,6,6],[90,82,6,6],[98,82,6,6],[82,90,6,6],[98,90,6,6],
        [50,98,6,6],[58,98,6,6],[82,98,6,6],[90,98,6,6],[98,98,6,6],
        [74,18,6,6],[82,18,6,6],[66,26,6,6],[82,26,6,6],
        [18,66,6,6],[26,74,6,6],[18,82,6,6],[34,66,6,6],
        [110,50,6,6],[118,58,6,6],[110,66,6,6],[118,74,6,6],
        [50,110,6,6],[58,118,6,6],[66,110,6,6],[74,118,6,6],
        [110,82,6,6],[118,90,6,6],[110,98,6,6],[118,110,6,6],[110,118,6,6],
        [82,110,6,6],[90,118,6,6],[98,110,6,6],[118,118,6,6],
        [126,50,6,6],[126,66,6,6],[126,82,6,6],[126,98,6,6],[126,118,6,6],
        [50,126,6,6],[66,126,6,6],[82,126,6,6],[98,126,6,6],[118,126,6,6],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill="#1A1612" opacity="0.85" />
      ))}
      {/* Center logo */}
      <rect x="55" y="55" width="30" height="30" rx="6" fill="white" />
      <rect x="57" y="57" width="26" height="26" rx="5" fill="#C41E3A" />
      <text x="70" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="DM Serif Display, serif">S</text>
    </svg>
  );
}

/* Small QR on the card */
function SmallQR({ color }) {
  const o = 0.55;
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="9" height="9" rx="1.5" stroke={color} strokeWidth="1" opacity={o} />
      <rect x="3.5" y="3.5" width="4" height="4" rx="0.5" fill={color} opacity={o * 0.7} />
      <rect x="18" y="1" width="9" height="9" rx="1.5" stroke={color} strokeWidth="1" opacity={o} />
      <rect x="20.5" y="3.5" width="4" height="4" rx="0.5" fill={color} opacity={o * 0.7} />
      <rect x="1" y="18" width="9" height="9" rx="1.5" stroke={color} strokeWidth="1" opacity={o} />
      <rect x="3.5" y="20.5" width="4" height="4" rx="0.5" fill={color} opacity={o * 0.7} />
      <rect x="12" y="12" width="4" height="4" rx="1" fill={color} opacity={o * 0.5} />
      <rect x="18" y="18" width="4" height="4" rx="0.5" fill={color} opacity={o * 0.4} />
      <rect x="24" y="18" width="3" height="3" rx="0.5" fill={color} opacity={o * 0.4} />
      <rect x="18" y="24" width="3" height="3" rx="0.5" fill={color} opacity={o * 0.4} />
      <rect x="24" y="24" width="3" height="3" rx="0.5" fill={color} opacity={o * 0.4} />
    </svg>
  );
}
