/* ─── MAIN APP ─── Tab nav + customer/tier switcher ─── */
import { useState, useEffect } from 'react';
import { CUSTOMERS, TIERS, TIER_ORDER } from './data/customers';
import { IconPassport, IconUser } from './components/Icons';
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
        {tab === 'rewards' && <CustomerView customer={customer} flipKey={flipKey} onShowOnboarding={() => setMeta('onboarding')}/>}
        {tab === 'program' && <ProgramView/>}
        {tab === 'staff' && <StaffView/>}
        {tab === 'profile' && <ProfileView customer={customer} onShowOnboarding={() => setMeta('onboarding')}/>}
      </div>

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

/* ─── TIER SWITCHER PILL ─── */
function TierSwitcher({ currentId, onSwitch }) {
  return (
    <div style={{
      position: 'fixed', bottom: 92, left: '50%', transform: 'translateX(-50%)',
      zIndex: 40, padding: 5, borderRadius: 100,
      background: 'rgba(123,26,43,0.92)',
      boxShadow: '0 8px 28px rgba(123,26,43,0.4), 0 2px 6px rgba(123,26,43,0.2)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(245,239,227,0.12)',
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
              background: active ? 'var(--red)' : 'transparent',
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
