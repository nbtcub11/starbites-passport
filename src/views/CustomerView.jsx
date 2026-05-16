import { useState, useEffect } from 'react';
import { TIERS, TIER_ORDER, REWARDS, FORMATS, getNextTier, progressTo, twiGreeting, twiGreetingLong, relDate } from '../data/customers';
import { BADGES, badgeEarned, getStreak, BADGE_ICONS, isFoundingMember } from '../data/badges';
import { OrnAdinkrahene, OrnSankofa, OrnGyeNyame, OrnDuafe, OrnStar, MarkS, IconArrowRight, IconCheck, IconLock, IconChevron, IconClose, Money, REWARD_GLYPHS } from '../components/Icons';
import PassportCard from '../components/PassportCard';

/* ─── NOTIFICATIONS DATA ─── */
const NOTIFICATIONS = [
  { id: 1, type: 'promo', title: 'Double Star Friday', body: 'Earn 2\u00d7 stars on all orders this Friday at every Starbites.', time: '2h ago', color: 'var(--gold)' },
  { id: 2, type: 'seasonal', title: '20% off Iced Drinks', body: 'Beat the heat \u2014 all iced drinks are 20% off through Sunday.', time: '5h ago', color: 'var(--lake)' },
  { id: 3, type: 'tier', title: 'Almost Silver!', body: 'You\u2019re 415 stars away from Silver status. Keep going!', time: '1d ago', color: 'var(--t-silver)' },
  { id: 4, type: 'promo', title: 'New: Pastry Box Drop', body: 'Six handmade meat pies, fresh at 7am every Saturday. Pre-order now.', time: '2d ago', color: 'var(--clay)' },
  { id: 5, type: 'reward', title: 'Meat Pie unlocked!', body: 'You have enough stars to claim a free Meat Pie. Mention it at the till.', time: '3d ago', color: 'var(--red)' },
  { id: 6, type: 'promo', title: 'Karaoke Night \u2014 2-for-1', body: 'This Thursday at Westlands: 2-for-1 cocktails from 7\u201310pm.', time: '4d ago', color: 'var(--forest)' },
];

/* ─── NOTIFICATION SHEET ─── */
function NotificationSheet({ onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(20,17,13,0.5)',
      animation: 'fadeIn 0.2s ease-out',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 480, background: 'var(--paper)',
        borderRadius: '24px 24px 0 0',
        maxHeight: '80vh', overflow: 'auto',
        animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        paddingBottom: 32,
      }}>
        <div style={{ padding: '10px 0 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--hairline)' }}/>
        </div>
        <div style={{ padding: '12px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)' }}>UPDATES</div>
            <div className="numeral" style={{ fontSize: 22, color: 'var(--ink)', marginTop: 2 }}>Notifications</div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 16, border: '1px solid var(--hairline)',
            background: 'var(--card-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconClose size={14} color="var(--ink-3)"/>
          </button>
        </div>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={{
              background: 'var(--card-2)', border: '1px solid var(--hairline)',
              borderRadius: 14, padding: '14px 16px',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: `${n.color}14`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <OrnStar size={16} color={n.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{n.title}</span>
                  <span style={{ fontSize: 9.5, color: 'var(--ink-4)', whiteSpace: 'nowrap', flexShrink: 0 }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 3, lineHeight: 1.4 }}>
                  {n.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MASTHEAD ─── */
function Masthead({ twi, en, firstName, onShowOnboarding }) {
  const [showNotifs, setShowNotifs] = useState(false);
  return (
    <>
      <div style={{
        padding: '14px 20px 6px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="numeral" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1 }}>
              {twi},
            </span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>
              {en}
            </span>
          </div>
          <div className="numeral" style={{
            fontSize: 36, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em', color: 'var(--ink)',
          }}>
            {firstName}.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
          {/* Notification bell */}
          <button onClick={() => setShowNotifs(true)} style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'var(--card-2)', border: '1px solid var(--hairline)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 9 A 7 7 0 0 1 19 9 V 14 L 21 18 H 3 L 5 14 Z"
                stroke="var(--ink-2)" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M10 21 A 2 2 0 0 0 14 21" stroke="var(--ink-2)" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span style={{
              position: 'absolute', top: 7, right: 8, width: 6, height: 6, borderRadius: 3,
              background: 'var(--red)', border: '1.5px solid var(--card-2)',
            }}/>
          </button>
          {/* Onboarding replay */}
          <button onClick={onShowOnboarding} style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'var(--card-2)', border: '1px solid var(--hairline)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="1.4" fill="var(--ink-3)"/>
              <circle cx="12" cy="12" r="1.4" fill="var(--ink-3)"/>
              <circle cx="19" cy="12" r="1.4" fill="var(--ink-3)"/>
            </svg>
          </button>
        </div>
      </div>
      {showNotifs && <NotificationSheet onClose={() => setShowNotifs(false)}/>}
    </>
  );
}

/* ─── POINTS BLOCK ─── */
function PointsBlock({ customer, pct, need, nextName }) {
  const tier = TIERS[customer.tier];
  const [display, setDisplay] = useState(customer.points);
  useEffect(() => {
    setDisplay(0);
    const target = customer.points;
    const steps = 24;
    const dur = 900;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const t = i / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (i >= steps) {
        clearInterval(id);
        setDisplay(target);
      }
    }, dur / steps);
    return () => clearInterval(id);
  }, [customer.id]);
  return (
    <div className="anim-slide" style={{
      background: 'var(--card-2)', borderRadius: 18,
      padding: '20px 20px 18px',
      border: '1px solid var(--hairline)',
    }} >
      {/* Massive numeral */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="label" style={{ fontSize: 9, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
            STARS BALANCE
          </div>
          <div className="numeral" style={{
            fontSize: 56, lineHeight: 0.95, color: 'var(--ink)', marginTop: 4, fontWeight: 400,
            letterSpacing: '-0.02em',
          }}>
            {display.toLocaleString()}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {tier.multiplier > 1 && (
              <Chip color={tier.color}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{tier.multiplier}×</span>&nbsp;earn
              </Chip>
            )}
            {tier.discount > 0 && (
              <Chip color={tier.color}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{tier.discount}%</span>&nbsp;off
              </Chip>
            )}
          </div>
        </div>

        {/* Tier crest */}
        <div style={{
          padding: '10px 14px', borderRadius: 12,
          background: tier.cardBg,
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          color: tier.inkColor,
          boxShadow: '0 4px 14px rgba(20,17,13,0.18)',
          minWidth: 70,
        }}>
          <span className="label" style={{ fontSize: 7, opacity: 0.6 }}>TIER</span>
          <span className="numeral" style={{ fontSize: 18, lineHeight: 1, letterSpacing: '0.01em' }}>
            {tier.name}
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
          <span style={{ fontSize: 11.5, color: 'var(--ink-2)', fontWeight: 600 }}>
            {nextName
              ? <>{need.toLocaleString()} stars to <span style={{ color: tier.color }}>{nextName}</span></>
              : <>Highest tier reached</>}
          </span>
          <span className="label" style={{ fontSize: 8, color: 'var(--ink-4)' }}>
            {Math.round(pct)}%
          </span>
        </div>
        <div style={{
          height: 6, borderRadius: 4, background: 'var(--paper-deep)',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: tier.cardBg,
            borderRadius: 4,
            transition: 'width 1.1s cubic-bezier(0.34, 1.2, 0.64, 1)',
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}/>
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--ink-4)' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 V 7 M 12 17 V 22 M 4 12 H 2 M 22 12 H 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          <span style={{ letterSpacing: '0.04em' }}>Visit regularly to keep your tier year over year</span>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 100,
      background: `${color}14`, color,
      fontSize: 10.5, fontWeight: 700, letterSpacing: '0.01em',
      border: `1px solid ${color}28`,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

/* ─── Section title ─── */
function SectionTitle({ eyebrow, title, detail }) {
  return (
    <div style={{ padding: '28px 20px 12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{eyebrow}</div>
        <div className="numeral" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1, marginTop: 3, fontWeight: 400 }}>
          {title}
        </div>
      </div>
      {detail && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-4)', fontWeight: 600, whiteSpace: 'nowrap' }}>{detail}</div>
      )}
    </div>
  );
}

/* ─── HOW IT WORKS (Red tier onboarding) ─── */
function HowItWorks() {
  const steps = [
    { Ico: OrnAdinkrahene, t: 'Scan or share your number', d: 'At any Starbites — in-store or in the app' },
    { Ico: OrnStar,        t: 'Earn stars on every order', d: '1 star per cedi + 10 visit bonus' },
    { Ico: OrnDuafe,       t: 'Level up for bigger perks', d: 'Red \u2192 Silver \u2192 Gold \u2192 Platinum' },
    { Ico: OrnGyeNyame,    t: 'Your stars never expire',   d: 'Take your time. We\'re patient.' },
  ];
  return (
    <div style={{
      background: 'var(--red)',
      borderRadius: 16, padding: 18,
      color: 'var(--paper)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -28, right: -28, opacity: 0.1 }}>
        <OrnAdinkrahene size={140} color="var(--paper)"/>
      </div>
      <div style={{ position: 'relative' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--gold-light)' }}>WELCOME TO STARSTARS</div>
        <div className="numeral" style={{ fontSize: 22, marginTop: 4, lineHeight: 1.05 }}>
          How it works
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.16)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <s.Ico size={16} color="var(--gold-light)"/>
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(245,239,227,0.65)', marginTop: 1 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── STREAK BANNER ─── */
function StreakBanner({ streak }) {
  const message =
    streak >= 7 ? "You're a Week Warrior."
    : streak >= 5 ? "Almost a Week Warrior."
    : streak >= 3 ? "Streak alight. Keep coming."
    : "Two and counting.";
  return (
    <div style={{
      background: 'linear-gradient(105deg, #C76A3A 0%, #B8893A 60%, #DCB66B 100%)',
      borderRadius: 16, padding: '14px 18px',
      color: '#1A1410',
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 4px 14px rgba(199,106,58,0.25)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Flame backdrop */}
      <svg width="44" height="44" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
        <path d="M16 4 C 18 9, 22 11, 22 16 C 22 16, 24.5 14, 24.5 11.5 C 26 15, 26 18, 26 20 C 26 24.5, 21.5 28, 16 28 C 10.5 28, 6 24.5, 6 20 C 6 16, 9 14, 10.5 10 C 11 13, 13 14, 13 17 C 13 14, 14 12, 16 4 Z"
          fill="#1A1410"/>
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="numeral" style={{ fontSize: 22, lineHeight: 1, color: '#1A1410' }}>
          {streak}-day streak
        </div>
        <div style={{ fontSize: 11, color: 'rgba(26,20,16,0.7)', marginTop: 3, fontWeight: 600 }}>
          {message}
        </div>
      </div>
      <div className="numeral" style={{ fontSize: 40, lineHeight: 1, color: '#1A1410', opacity: 0.85 }}>
        {streak}
      </div>
    </div>
  );
}

/* ─── BADGES RAIL ─── */
function BadgesRail({ customer }) {
  const [selected, setSelected] = useState(null);
  const tier = TIERS[customer.tier];
  const sorted = [...BADGES].sort((a, b) => {
    const ae = badgeEarned(a, customer);
    const be = badgeEarned(b, customer);
    return (be ? 1 : 0) - (ae ? 1 : 0);
  });

  return (
    <>
      <div className="snap-x hide-scrollbar" style={{
        display: 'flex', gap: 8, padding: '0 20px',
        overflowX: 'auto',
      }}>
        {sorted.map(b => {
          const earned = badgeEarned(b, customer);
          const Ico = BADGE_ICONS[b.icon];
          return (
            <button key={b.id} onClick={() => setSelected(b)} style={{
              flex: '0 0 96px',
              padding: 0,
              borderRadius: 14,
              background: 'transparent', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              opacity: earned ? 1 : 0.4,
            }}>
              <div style={{
                width: 96, height: 96, borderRadius: 14,
                background: earned ? b.bg : 'var(--paper-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
                boxShadow: earned ? '0 4px 14px rgba(20,17,13,0.18), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)' : 'none',
                border: earned ? 'none' : '1px solid var(--hairline)',
              }}>
                {/* Foil stripes */}
                {earned && <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}/>}
                {/* Decorative dot */}
                {earned && <div style={{
                  position: 'absolute', top: -14, right: -14, width: 56, height: 56,
                  borderRadius: 28, background: 'rgba(255,255,255,0.12)',
                }}/>}
                {/* Lock overlay */}
                {!earned && (
                  <div style={{ color: 'var(--ink-4)', opacity: 0.7 }}>
                    <IconLock size={28} color="var(--ink-4)"/>
                  </div>
                )}
                {earned && Ico && (
                  <div style={{
                    position: 'relative', zIndex: 1,
                    color: b.accent,
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.18))',
                  }}>
                    <Ico size={50} color={b.accent}/>
                  </div>
                )}
              </div>
              <div style={{
                fontSize: 9.5, fontWeight: 700, color: earned ? 'var(--ink-2)' : 'var(--ink-4)',
                textAlign: 'center', lineHeight: 1.2,
                width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {earned ? b.name : 'Locked'}
              </div>
            </button>
          );
        })}
      </div>

      {selected && <BadgeModal badge={selected} earned={badgeEarned(selected, customer)} tier={tier} onClose={() => setSelected(null)}/>}
    </>
  );
}

function BadgeModal({ badge, earned, tier, onClose }) {
  const Ico = BADGE_ICONS[badge.icon];
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(20,17,13,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 28,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)',
        borderRadius: 22, padding: 24,
        width: '100%', maxWidth: 280,
        textAlign: 'center',
        border: '1px solid var(--hairline)',
        boxShadow: '0 20px 60px rgba(20,17,13,0.3)',
      }}>
        <div style={{
          width: 124, height: 124, borderRadius: 18, margin: '0 auto',
          background: earned ? badge.bg : 'var(--paper-deep)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: earned ? badge.accent : 'var(--ink-4)',
          position: 'relative', overflow: 'hidden',
          boxShadow: earned ? '0 8px 24px rgba(20,17,13,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
        }}>
          {earned && <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}/>}
          {earned && Ico && (
            <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}>
              <Ico size={66} color={badge.accent}/>
            </div>
          )}
          {!earned && <IconLock size={36} color="var(--ink-4)"/>}
        </div>
        <div className="numeral" style={{ fontSize: 24, marginTop: 16, color: 'var(--ink)' }}>
          {badge.name}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 4 }}>
          {badge.desc}
        </div>
        <div style={{
          marginTop: 16, display: 'inline-flex',
          padding: '6px 13px', borderRadius: 100,
          background: earned ? 'var(--ink)' : 'var(--paper-deep)',
          color: earned ? 'var(--paper)' : 'var(--ink-3)',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em',
          alignItems: 'center', gap: 5,
        }}>
          {earned ? <><IconCheck size={11} color="var(--paper)" stroke={2.5}/> EARNED</> : <><IconLock size={11} color="var(--ink-3)"/> LOCKED</>}
        </div>
      </div>
    </div>
  );
}

/* ─── PERK ICONS — distinct per perk type ─── */
function PerkIconGift({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="10" rx="2" fill={color} opacity="0.7"/>
    <rect x="2" y="8" width="20" height="5" rx="1.5" fill={color}/>
    <rect x="11" y="8" width="2" height="13" fill={color} opacity="0.4"/>
    <path d="M12 8 C 12 8, 9 3, 7 5 C 5.5 6.5, 8 8, 12 8" fill={color} opacity="0.8"/>
    <path d="M12 8 C 12 8, 15 3, 17 5 C 18.5 6.5, 16 8, 12 8" fill={color} opacity="0.8"/>
  </svg>);
}
function PerkIconPercent({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="3.5" stroke={color} strokeWidth="2"/>
    <circle cx="16" cy="16" r="3.5" stroke={color} strokeWidth="2"/>
    <line x1="18" y1="5" x2="6" y2="19" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
  </svg>);
}
function PerkIconTruck({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="1" y="6" width="14" height="10" rx="1.5" fill={color} opacity="0.7"/>
    <path d="M15 10 H 19 L 22 14 V 16 H 15 Z" fill={color}/>
    <circle cx="6.5" cy="18" r="2" fill={color}/><circle cx="6.5" cy="18" r="1" fill="#FBF6EC"/>
    <circle cx="18.5" cy="18" r="2" fill={color}/><circle cx="18.5" cy="18" r="1" fill="#FBF6EC"/>
  </svg>);
}
function PerkIconCake({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="18" height="8" rx="2" fill={color} opacity="0.8"/>
    <rect x="3" y="15" width="18" height="2" fill={color} opacity="0.3"/>
    <path d="M8 12 V 7 M 12 12 V 6 M 16 12 V 7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="8" cy="5.5" r="1.5" fill={color}/><circle cx="12" cy="4.5" r="1.5" fill={color}/><circle cx="16" cy="5.5" r="1.5" fill={color}/>
  </svg>);
}
function PerkIconHeart({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21 C 12 21, 3 14, 3 8.5 A 4.5 4.5 0 0 1 12 6.5 A 4.5 4.5 0 0 1 21 8.5 C 21 14, 12 21, 12 21 Z" fill={color}/>
  </svg>);
}
function PerkIconStar({ size = 20, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L 14.5 9 L 22 9.5 L 16.5 14 L 18.5 21 L 12 17 L 5.5 21 L 7.5 14 L 2 9.5 L 9.5 9 Z" fill={color}/>
  </svg>);
}

/* ─── PERKS RAIL ─── (active at current tier — status, not redeemable) */
const PERK_PALETTES = [
  { bg: 'linear-gradient(155deg, #FF8A4C 0%, #E84A5F 100%)', accent: '#FFE3CF', icon: PerkIconGift },      // welcome / general
  { bg: 'linear-gradient(155deg, #FFD36C 0%, #B8893A 100%)', accent: '#FFF1CC', icon: PerkIconPercent },    // earn multiplier / discount
  { bg: 'linear-gradient(155deg, #76E0A8 0%, #2F4E3A 100%)', accent: '#D6F1E0', icon: PerkIconStar },      // free / gift
  { bg: 'linear-gradient(155deg, #6CC6FF 0%, #2B5B7B 100%)', accent: '#DDF1FF', icon: PerkIconTruck },      // delivery / fulfillment
  { bg: 'linear-gradient(155deg, #FF6FB5 0%, #B5172E 100%)', accent: '#FFDEED', icon: PerkIconCake },       // referral / birthday
  { bg: 'linear-gradient(155deg, #C39BFF 0%, #4A4480 100%)', accent: '#E8DEFF', icon: PerkIconHeart },      // premium / gift card
];

function paletteForPerk(perk) {
  const t = perk.toLowerCase();
  if (t.match(/welcome|sign-?up|seasonal/)) return PERK_PALETTES[0];
  if (t.match(/\d+%|off|earn|×|x stars|multiplier|double/)) return PERK_PALETTES[1];
  if (t.match(/free side|free entr|gift card|free item/)) return PERK_PALETTES[5];
  if (t.match(/free|gift/)) return PERK_PALETTES[2];
  if (t.match(/deliver/)) return PERK_PALETTES[3];
  if (t.match(/refer|birthday/)) return PERK_PALETTES[4];
  return PERK_PALETTES[0];
}

function PerksRail({ customer }) {
  const tier = TIERS[customer.tier];
  const idx = TIER_ORDER.indexOf(customer.tier);
  const allPerks = [];
  for (let i = 0; i <= idx; i++) {
    TIERS[TIER_ORDER[i]].perks.forEach(p => {
      if (!p.startsWith('Everything') && !allPerks.includes(p)) allPerks.push(p);
    });
  }

  const next = getNextTier(customer.tier);
  const nextPerks = next
    ? TIERS[next].perks.filter(p => !p.startsWith('Everything') && !allPerks.includes(p))
    : [];

  return (
    <div className="snap-x hide-scrollbar" style={{
      display: 'flex', gap: 10, padding: '0 20px',
      overflowX: 'auto',
    }}>
      {allPerks.map((perk, i) => (
        <PerkCard key={i} perk={perk} active/>
      ))}
      {nextPerks.map((perk, i) => (
        <PerkCard key={`l-${i}`} perk={perk} nextTier={TIERS[next]}/>
      ))}
    </div>
  );
}

function PerkCard({ perk, active, nextTier }) {
  const palette = paletteForPerk(perk);
  const Ico = palette.icon;

  return (
    <div style={{
      flex: '0 0 168px',
      background: active ? palette.bg : 'var(--paper-deep)',
      border: active ? 'none' : '1px solid var(--hairline)',
      borderRadius: 14, padding: 14,
      display: 'flex', flexDirection: 'column',
      opacity: active ? 1 : 0.55,
      color: active ? palette.accent : 'var(--ink-4)',
      position: 'relative', overflow: 'hidden',
      boxShadow: active ? '0 4px 14px rgba(20,17,13,0.18), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)' : 'none',
      minHeight: 130,
    }}>
      {/* Foil stripes */}
      {active && <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}/>}
      {/* Decoration */}
      {active && (
        <div style={{ position: 'absolute', top: -16, right: -16, opacity: 0.18, color: palette.accent }}>
          <OrnAdinkrahene size={86} color={palette.accent}/>
        </div>
      )}

      <div style={{
        width: 38, height: 38, borderRadius: 9,
        background: active ? 'rgba(255,255,255,0.18)' : 'var(--card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10, position: 'relative', zIndex: 1,
        border: active ? '1px solid rgba(255,255,255,0.22)' : 'none',
      }}>
        <Ico size={20} color={active ? palette.accent : 'var(--ink-4)'}/>
      </div>
      <div style={{
        fontSize: 12.5, fontWeight: 700, lineHeight: 1.25, flex: 1, position: 'relative', zIndex: 1,
        color: active ? palette.accent : 'var(--ink-3)',
      }}>
        {perk}
      </div>
      <div style={{ marginTop: 10, position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 100,
          background: active ? 'rgba(0,0,0,0.22)' : 'var(--paper)',
          color: active ? palette.accent : 'var(--ink-4)',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
          border: `1px solid ${active ? 'rgba(255,255,255,0.15)' : 'var(--hairline)'}`,
        }}>
          {active
            ? <><IconCheck size={9} color={palette.accent} stroke={2.5}/> ACTIVE</>
            : <><IconLock size={9} color="var(--ink-4)"/> {nextTier?.name.toUpperCase()}</>
          }
        </span>
      </div>
    </div>
  );
}

/* ─── ACTIVITY LIST — Boarding-pass style ─── */
function ActivityList({ customer }) {
  return (
    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {customer.transactions.slice(0, 4).map((tx, i) => {
        const fmt = FORMATS[tx.format];
        return (
          <div key={i} className="anim-slide" style={{
            background: 'var(--card-2)', border: '1px solid var(--hairline)',
            borderRadius: 14,
            display: 'flex', alignItems: 'stretch', overflow: 'hidden',
            animationDelay: `${i * 60}ms`,
          }}>
            {/* Date column */}
            <div style={{
              padding: '12px 12px', borderRight: '1px dashed var(--hairline)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minWidth: 64, background: 'var(--paper)',
            }}>
              <div className="numeral" style={{ fontSize: 22, lineHeight: 1, color: 'var(--ink)' }}>
                {new Date(tx.date).getDate()}
              </div>
              <div className="label" style={{ fontSize: 8, color: 'var(--ink-3)', marginTop: 2 }}>
                {new Date(tx.date).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()}
              </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: '12px 14px', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 8.5, fontWeight: 700,
                  padding: '2px 5px', borderRadius: 4,
                  background: fmt.soft, color: fmt.color, letterSpacing: '0.05em',
                }}>{fmt.tag}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                  {tx.location}
                </span>
              </div>
              <div style={{
                fontSize: 11, color: 'var(--ink-3)', marginTop: 4,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {tx.items.join(' \u00B7 ')}
              </div>
            </div>

            {/* Right column */}
            <div style={{
              padding: '12px 14px', borderLeft: '1px dashed var(--hairline)',
              textAlign: 'right',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              minWidth: 72,
            }}>
              <div className="numeral" style={{ fontSize: 17, color: TIERS[customer.tier].color, lineHeight: 1 }}>
                +{tx.points}
              </div>
              <div className="label" style={{ fontSize: 7, color: 'var(--ink-4)', marginTop: 2 }}>STARS</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                <Money n={tx.amount} muted={0.85}/>
              </div>
            </div>
          </div>
        );
      })}

      {/* View all link */}
      <button style={{
        marginTop: 4, background: 'transparent', border: 'none',
        padding: '8px 4px', color: 'var(--ink-2)', fontSize: 11.5, fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start',
        letterSpacing: '0.04em',
      }}>
        View full ledger <IconArrowRight size={12} color="var(--ink-2)"/>
      </button>
    </div>
  );
}

/* ─── TIER LADDER ─── */
function TierLadder({ customer }) {
  const currIdx = TIER_ORDER.indexOf(customer.tier);
  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{
        background: 'var(--card-2)', borderRadius: 18,
        border: '1px solid var(--hairline)',
        overflow: 'hidden',
      }}>
        {TIER_ORDER.map((k, idx) => {
          const t = TIERS[k];
          const reached = idx <= currIdx;
          const active = idx === currIdx;
          const isLast = idx === TIER_ORDER.length - 1;

          return (
            <div key={k} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderBottom: isLast ? 'none' : '1px solid var(--hairline)',
              background: active ? 'var(--paper)' : 'transparent',
              position: 'relative',
            }}>
              {/* Crest */}
              <div style={{
                width: 56, height: 56, borderRadius: 8,
                background: reached ? t.cardBg : 'var(--paper-deep)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: reached ? t.inkColor : 'var(--ink-4)',
                flexShrink: 0,
                opacity: reached ? 1 : 0.5,
                boxShadow: reached ? '0 2px 6px rgba(20,17,13,0.2)' : 'none',
                position: 'relative', overflow: 'hidden',
              }}>
                {reached && <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.45 }}/>}
                <span className="numeral" style={{ fontSize: 14, lineHeight: 1, position: 'relative', letterSpacing: '0.01em' }}>
                  {t.name}
                </span>
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                  <span className="numeral" style={{ fontSize: 17, color: reached ? 'var(--ink)' : 'var(--ink-4)' }}>
                    {t.name}
                  </span>
                  {active && (
                    <span className="label" style={{
                      fontSize: 7.5, padding: '2px 6px', borderRadius: 4,
                      background: t.color, color: t.inkColor, letterSpacing: '0.18em',
                    }}>
                      YOU
                    </span>
                  )}
                  {!reached && (
                    <span style={{ fontSize: 10, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>
                      {t.threshold.toLocaleString()} stars
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: 11.5, color: reached ? 'var(--ink-3)' : 'var(--ink-4)',
                  marginTop: 3, lineHeight: 1.35,
                }}>
                  {t.signature}
                </div>
              </div>

              {/* Check */}
              {reached && !active && (
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  background: 'var(--ink)', color: 'var(--paper)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconCheck size={11} color="var(--paper)" stroke={2.5}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── REFER CARD ─── */
function ReferCard({ tier }) {
  return (
    <div style={{
      background: 'var(--ink)',
      borderRadius: 18,
      padding: '20px 20px 18px',
      color: 'var(--paper)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ornament background */}
      <div style={{ position: 'absolute', top: -28, right: -28, opacity: 0.07 }}>
        <OrnGyeNyame size={160} color="var(--paper)"/>
      </div>
      <div style={{ position: 'absolute', bottom: -40, left: -40, opacity: 0.05 }}>
        <OrnAdinkrahene size={160} color="var(--paper)"/>
      </div>

      <div style={{ position: 'relative' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--gold-light)', letterSpacing: '0.32em' }}>
          DASH A FRIEND
        </div>
        <div className="numeral" style={{
          fontSize: 30, lineHeight: 1.05, marginTop: 6, letterSpacing: '-0.01em',
          color: 'var(--paper)',
        }}>
          Earn <span style={{ color: 'var(--gold-light)' }}>200 stars</span><br/>each, together.
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(245,239,227,0.6)', marginTop: 10, lineHeight: 1.45, maxWidth: '90%' }}>
          You both get 200 stars when they place their first order at any Starbites.
        </div>
        <button style={{
          marginTop: 16, padding: '10px 16px', borderRadius: 100,
          background: 'var(--paper)', color: 'var(--ink)',
          border: 'none', fontSize: 12, fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', gap: 6, letterSpacing: '0.02em',
        }}>
          Send invite <IconArrowRight size={13} color="var(--ink)"/>
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function CustomerView({ customer, flipKey, onShowOnboarding }) {
  const tier = TIERS[customer.tier];
  const { pct, need, nextName } = progressTo(customer.points, customer.tier);
  const greetingTwi = twiGreeting();
  const greetingEn = twiGreetingLong();
  const streak = getStreak(customer);
  const isRed = customer.tier === 'red';

  return (
    <div className="paper-grain" style={{ minHeight: '100%', paddingBottom: 130 }}>
      {/* ─── HEADER ─── Editorial masthead */}
      <Masthead twi={greetingTwi} en={greetingEn} firstName={customer.firstName} onShowOnboarding={onShowOnboarding}/>

      {/* ─── HERO PASSPORT CARD ─── */}
      <div style={{ padding: '0 20px', marginTop: 4 }}>
        <PassportCard customer={customer} flipKey={flipKey}/>
      </div>

      {/* ─── POINTS DASHBOARD ─── */}
      <div style={{ padding: '24px 20px 0' }}>
        <PointsBlock customer={customer} pct={pct} need={need} nextName={nextName}/>
      </div>

      {/* ─── HOW IT WORKS (Red tier only) ─── */}
      {isRed && (
        <div style={{ padding: '16px 20px 0' }}>
          <HowItWorks/>
        </div>
      )}

      {/* ─── STREAK BANNER ─── */}
      {streak >= 2 && (
        <div style={{ padding: '16px 20px 0' }}>
          <StreakBanner streak={streak}/>
        </div>
      )}

      {/* ─── BADGES ─── */}
      <SectionTitle eyebrow="Stamps in your passport" title="Badges" detail={`${BADGES.filter(b => badgeEarned(b, customer)).length} / ${BADGES.length}`}/>
      <BadgesRail customer={customer}/>

      {/* ─── PERKS (active at your tier) ─── */}
      <SectionTitle eyebrow="What you've unlocked" title="Your perks"/>
      <PerksRail customer={customer}/>

      {/* ─── ACTIVITY ─── */}
      <SectionTitle eyebrow="Itinerary" title="Recent visits"/>
      <ActivityList customer={customer}/>

      {/* ─── TIER LADDER ─── */}
      <SectionTitle eyebrow="The Atlas" title="Your journey"/>
      <TierLadder customer={customer}/>

      {/* ─── REFER ─── */}
      <div style={{ padding: '0 20px', marginTop: 22 }}>
        <ReferCard tier={tier}/>
      </div>
    </div>
  );
}
