/* ─── MAIN APP ─── Tab nav + customer/tier switcher ─── */
import { useState, useEffect } from 'react';
import { CUSTOMERS, TIERS, TIER_ORDER } from './data/customers';
import { IconPassport, IconUser, IconChevron, OrnAdinkrahene, OrnStar } from './components/Icons';
import CustomerView from './views/CustomerView';
import ProfileView from './views/ProfileView';
import OnboardingView from './views/OnboardingView';
import StaffView from './views/StaffView';
import ProgramView from './views/ProgramView';

function App() {
  const [customerIdx, setCustomerIdx] = useState(3);
  const [tab, setTab] = useState('rewards');
  const [flipKey, setFlipKey] = useState(0);
  const [meta, setMeta] = useState(null); // 'onboarding' only
  const [showTeamMenu, setShowTeamMenu] = useState(false);

  const customer = CUSTOMERS[customerIdx] || CUSTOMERS[3];

  useEffect(() => {
    setFlipKey(k => k + 1);
  }, [customer.id]);

  // Onboarding takes over the whole screen
  if (meta === 'onboarding') return <OnboardingView onComplete={() => setMeta(null)}/>;

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
      background: 'var(--paper)',
      maxWidth: 480, margin: '0 auto',
    }}>
      {/* Content area */}
      <div style={{
        minHeight: '100vh', overflow: 'auto', WebkitOverflowScrolling: 'touch',
      }} key={customer.id + '-' + tab}>
        {tab === 'rewards' && <CustomerView customer={customer} flipKey={flipKey}/>}
        {tab === 'program' && <ProgramView/>}
        {tab === 'staff' && <StaffView/>}
        {tab === 'profile' && <ProfileView customer={customer} onShowOnboarding={() => setMeta('onboarding')}/>}
      </div>

      {/* Team menu trigger — top-right */}
      <TeamMenuTrigger onOpen={() => setShowTeamMenu(true)}/>

      {/* Team menu drawer */}
      {showTeamMenu && (
        <TeamMenu
          onClose={() => setShowTeamMenu(false)}
          onOpenOnboarding={() => { setShowTeamMenu(false); setMeta('onboarding'); }}
        />
      )}

      {/* Tier switcher (above tab bar) */}
      <TierSwitcher
        currentId={customer.id}
        onSwitch={(id) => {
          const idx = CUSTOMERS.findIndex(c => c.id === id);
          if (idx >= 0) setCustomerIdx(idx);
        }}
      />

      {/* Tab bar */}
      <TabBar tab={tab} onChange={setTab}/>
    </div>
  );
}

/* ─── TEAM MENU TRIGGER + DRAWER ─── */
function TeamMenuTrigger({ onOpen }) {
  return (
    <button onClick={onOpen} style={{
      position: 'fixed', top: 16, right: 16, zIndex: 30,
      width: 36, height: 36, borderRadius: 18,
      background: 'rgba(20,17,13,0.06)', border: '1px solid var(--hairline)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="1.6" fill="var(--ink-2)"/>
        <circle cx="12" cy="12" r="1.6" fill="var(--ink-2)"/>
        <circle cx="19" cy="12" r="1.6" fill="var(--ink-2)"/>
      </svg>
    </button>
  );
}

function TeamMenu({ onClose, onOpenOnboarding }) {
  const items = [
    { Ico: OrnStar, t: 'Onboarding', d: 'New-member welcome flow', onClick: onOpenOnboarding, color: 'var(--forest)' },
  ];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 60,
      background: 'rgba(20,17,13,0.4)',
      animation: 'fadeIn 0.18s ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'absolute', top: 56, right: 14, width: 240,
        background: 'var(--card-2)', borderRadius: 16,
        border: '1px solid var(--hairline)',
        boxShadow: '0 16px 50px rgba(20,17,13,0.25)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid var(--hairline)' }}>
          <div className="label" style={{ fontSize: 8.5, color: 'var(--ink-4)', letterSpacing: '0.28em' }}>
            TEAM ACCESS
          </div>
          <div className="numeral" style={{ fontSize: 16, color: 'var(--ink)', marginTop: 2 }}>
            Internal views
          </div>
        </div>
        {items.map((it, i) => (
          <button key={i} onClick={it.onClick} style={{
            width: '100%', padding: '12px 14px',
            background: 'transparent', border: 'none',
            borderBottom: i < items.length - 1 ? '1px solid var(--hairline)' : 'none',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${it.color}14`, color: it.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <it.Ico size={16} color={it.color}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>{it.t}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 1 }}>{it.d}</div>
            </div>
            <IconChevron dir="right" size={11} color="var(--ink-4)"/>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── TIER SWITCHER PILL ─── */
function TierSwitcher({ currentId, onSwitch }) {
  return (
    <div style={{
      position: 'fixed', bottom: 92, left: '50%', transform: 'translateX(-50%)',
      zIndex: 40, padding: 5, borderRadius: 100,
      background: 'rgba(20,17,13,0.92)',
      boxShadow: '0 8px 28px rgba(20,17,13,0.4), 0 2px 6px rgba(20,17,13,0.2)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(245,239,227,0.08)',
      display: 'flex', alignItems: 'center', gap: 3,
    }}>
      {CUSTOMERS.map(c => {
        const tier = TIERS[c.tier];
        const active = c.id === currentId;
        return (
          <button key={c.id} onClick={() => onSwitch(c.id)} style={{
            border: 'none', padding: '6px 12px', borderRadius: 100,
            background: active ? tier.cardBg : 'transparent',
            color: active ? tier.inkColor : 'rgba(245,239,227,0.6)',
            display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.25s',
          }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em' }}>
              {tier.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── TAB ICONS ─── */
function IconGrid({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}

function IconTerminal({ size = 22, color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="7" x2="22" y2="7"/>
      <path d="M6 12l3 3-3 3"/><line x1="13" y1="18" x2="18" y2="18"/>
    </svg>
  );
}

/* ─── TAB BAR ─── */
function TabBar({ tab, onChange }) {
  const tabs = [
    { id: 'rewards',  label: 'Rewards',  Icon: IconPassport },
    { id: 'program',  label: 'Program',  Icon: IconGrid },
    { id: 'staff',    label: 'Staff',    Icon: IconTerminal },
    { id: 'profile',  label: 'Profile',  Icon: IconUser },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      padding: '8px 12px 28px',
      background: 'linear-gradient(to top, var(--paper) 60%, rgba(245,239,227,0))',
      maxWidth: 480, margin: '0 auto',
    }}>
      <div style={{
        background: 'rgba(251,246,236,0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--hairline)',
        borderRadius: 100,
        boxShadow: '0 8px 24px rgba(20,17,13,0.08)',
        padding: 6,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              flex: 1, padding: '8px 6px', borderRadius: 100,
              background: active ? 'var(--ink)' : 'transparent',
              color: active ? 'var(--paper)' : 'var(--ink-2)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.22s',
              minHeight: 36,
            }}>
              <Icon size={active ? 17 : 19} color={active ? 'var(--paper)' : 'var(--ink-2)'} stroke={active ? 1.8 : 1.7}/>
              {active && (
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.02em' }}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
