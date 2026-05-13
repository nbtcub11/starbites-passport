import { useState } from 'react';
import { CUSTOMERS, TIERS } from './data/customers';
import CustomerView from './views/CustomerView';
import StaffView from './views/StaffView';
import OrderView from './views/OrderView';
import LocationsView from './views/LocationsView';
import ProfileView from './views/ProfileView';
import OnboardingView from './views/OnboardingView';
import DemoSwitcher from './components/DemoSwitcher';

const TABS = [
  { id: 'passport', label: 'Rewards', icon: PassportIcon },
  { id: 'order', label: 'Order', icon: OrderIcon },
  { id: 'locations', label: 'Locations', icon: LocationIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
];

function App() {
  const [activeTab, setActiveTab] = useState('passport');
  const [activeCustomerId, setActiveCustomerId] = useState(4);
  const [flipKey, setFlipKey] = useState(0);
  const [showStaff, setShowStaff] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const customer = CUSTOMERS.find(c => c.id === activeCustomerId);
  const tier = TIERS[customer.tier];

  function handleCustomerSwitch(id) {
    setFlipKey(k => k + 1);
    setActiveCustomerId(id);
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen relative">
      {/* Onboarding overlay */}
      {showOnboarding && (
        <OnboardingView onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 shadow-warm-lg overflow-hidden">
        <div className="kente-pattern bg-[#C41E3A] text-white">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Brand */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/12 border border-white/10 flex items-center justify-center">
                  <span className="font-serif text-[16px]">S</span>
                </div>
                <div>
                  <div className="text-[14px] font-extrabold tracking-[0.18em]">STARBITES</div>
                  <div className="text-[7px] tracking-[0.35em] opacity-40 uppercase font-semibold">Rewards</div>
                </div>
              </div>

              {/* Right side: Staff toggle + Onboarding */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] transition-all"
                  title="Replay onboarding">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setShowStaff(!showStaff)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold transition-all ${
                    showStaff
                      ? 'bg-white text-[#C41E3A] shadow-sm'
                      : 'bg-white/[0.08] text-white/60 border border-white/[0.06] hover:text-white'
                  }`}>
                  <StaffIcon active={showStaff} />
                  <span className="hidden min-[380px]:inline">Staff</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-[#9B1830] via-[#E8365A] to-[#9B1830]" />
      </header>

      {/* Content */}
      <main className="pt-5">
        {showStaff ? (
          <StaffView customer={customer} />
        ) : activeTab === 'passport' ? (
          <CustomerView customer={customer} flipKey={flipKey} />
        ) : activeTab === 'order' ? (
          <OrderView customer={customer} />
        ) : activeTab === 'locations' ? (
          <LocationsView />
        ) : (
          <ProfileView customer={customer} onShowOnboarding={() => setShowOnboarding(true)} />
        )}
      </main>

      {/* Bottom Tab Bar */}
      {!showStaff && (
        <nav className="fixed bottom-0 left-0 right-0 z-40">
          <div className="max-w-lg mx-auto">
            {/* Demo switcher - now above the tab bar */}
            <DemoSwitcher activeCustomerId={activeCustomerId} onSelect={handleCustomerSwitch} />

            <div className="bg-sb-cream/95 glass border-t border-[#EDE8E2] safe-bottom">
              <div className="flex items-center justify-around px-2 pt-2 pb-1">
                {TABS.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px] ${
                        isActive ? '' : 'opacity-40 hover:opacity-70'
                      }`}>
                      <tab.icon active={isActive} />
                      <span className={`text-[9px] font-bold ${isActive ? 'text-[#C41E3A]' : 'text-[#6B645C]'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

/* ─── Tab Icons ─── */

function PassportIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#C41E3A' : '#6B645C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M7 18c0-2 2.5-3 5-3s5 1 5 3" />
    </svg>
  );
}

function OrderIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#C41E3A' : '#6B645C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function LocationIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#C41E3A' : '#6B645C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#C41E3A' : '#6B645C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StaffIcon({ active }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#C41E3A' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="7" x2="22" y2="7" />
      <line x1="12" y1="7" x2="12" y2="21" />
    </svg>
  );
}

export default App;
