import { useState } from 'react';
import { CUSTOMERS, TIERS, REWARDS } from '../data/customers';

const FORMAT_ICON = { Signature: '🍽️', 'To-Go': '🛍️', Express: '⚡' };

export default function StaffView({ customer: activeCustomer }) {
  const [searchPhone, setSearchPhone] = useState('');
  const [foundCustomer, setFoundCustomer] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
  const [rewardApplied, setRewardApplied] = useState(null);

  const customer = foundCustomer || activeCustomer;
  const tier = TIERS[customer.tier];

  function handleSearch(e) {
    e.preventDefault();
    const clean = searchPhone.replace(/\s/g, '');
    const found = CUSTOMERS.find(c => c.phone.replace(/\s/g, '').includes(clean));
    if (found) { setFoundCustomer(found); setSearchPhone(''); }
  }

  return (
    <div key={customer.id} className="pb-40 -mt-5">
      {/* Dark staff header */}
      <div className="bg-gradient-to-b from-[#1A1612] to-[#2C2620] text-white px-5 pt-5 pb-6 mb-5 rounded-b-3xl shadow-warm-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B8278] font-bold">BimPOS — Staff View</span>
        </div>
        <div className="font-serif text-[22px]">Customer Lookup</div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B645C]">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              type="tel"
              placeholder="Phone number..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.08] border border-white/[0.08] text-white placeholder-[#6B645C] text-[14px] focus:bg-white/[0.12] focus:border-white/20 focus:outline-none transition-all"
            />
          </div>
          <button type="submit" className="px-5 py-3 bg-[#C41E3A] text-white rounded-xl font-bold text-[12px] hover:bg-[#9B1830] active:scale-95 transition-all">
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
          {CUSTOMERS.map(c => (
            <button key={c.id} onClick={() => setFoundCustomer(c)}
              className="text-[10px] text-[#6B645C] hover:text-white transition-colors font-mono">
              {c.phone}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3">
        {/* Profile Card */}
        <div className="bg-sb-cream rounded-2xl shadow-warm border border-[#EDE8E2] overflow-hidden animate-slide-up">
          <div className="h-[3px]" style={{ background: tier.cardBg }} />
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-black shadow-warm text-white shrink-0"
                style={{ background: tier.cardBg }}>
                {customer.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-[20px] text-[#1A1612] truncate">{customer.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold text-white tracking-wider"
                    style={{ backgroundColor: tier.color }}>
                    {tier.name.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-[#8B8278] font-mono">{customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#EDE8E2]">
              {[
                { val: customer.points.toLocaleString(), label: 'Points', color: tier.color },
                { val: customer.transactions.length, label: 'Visits', color: '#1A1612' },
                { val: tier.discount ? `${tier.discount}%` : '—', label: 'Discount', color: '#1A1612' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-[22px] font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[8px] text-[#8B8278] uppercase tracking-wider font-bold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visits */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm border border-[#EDE8E2]">
          <h3 className="font-serif text-[15px] text-[#1A1612] mb-3">Last 3 Visits</h3>
          <div className="space-y-3">
            {customer.transactions.slice(0, 3).map((tx, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[#EDE8E2] last:border-0">
                <span className="text-base">{FORMAT_ICON[tx.format] || '📍'}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[12px] text-[#1A1612] truncate">{tx.location}</div>
                  <div className="text-[10px] text-[#8B8278] truncate mt-0.5">
                    {new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {tx.items.slice(0, 2).join(', ')}
                  </div>
                </div>
                <div className="font-bold text-[13px] text-[#1A1612] shrink-0">GHS {tx.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm border border-[#EDE8E2]">
          <h3 className="font-serif text-[15px] text-[#1A1612] mb-3">Preferences</h3>
          {customer.preferences.seating && (
            <div className="flex items-start gap-2 mb-2.5">
              <span className="text-[9px] font-bold text-[#8B8278] uppercase mt-0.5">Seat</span>
              <span className="text-[12px] text-[#1A1612] font-medium">{customer.preferences.seating}</span>
            </div>
          )}
          <div className="flex items-start gap-2 mb-2.5">
            <span className="text-[9px] font-bold text-[#8B8278] uppercase mt-1">Faves</span>
            <div className="flex flex-wrap gap-1">
              {customer.preferences.favorites.map((f, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-semibold border border-[#C8E6C9]">{f}</span>
              ))}
            </div>
          </div>
          {customer.preferences.allergies.length > 0 && (
            <div className="flex items-start gap-2 mb-2.5">
              <span className="text-[9px] font-bold text-red-500 uppercase mt-1">⚠</span>
              <div className="flex flex-wrap gap-1">
                {customer.preferences.allergies.map((a, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200"
                    style={{ animation: 'allergyPulse 2s ease-in-out infinite' }}>{a}</span>
                ))}
              </div>
            </div>
          )}
          {customer.preferences.notes && (
            <div className="mt-3 p-3.5 bg-[#FFF8E1] rounded-xl border border-[#FFE082]">
              <div className="text-[8px] font-extrabold text-[#F57F17] uppercase tracking-wider mb-1">★ Staff Notes</div>
              <div className="text-[12px] text-[#5D4037] leading-relaxed">{customer.preferences.notes}</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button onClick={() => setShowRewardModal(true)}
            className="bg-[#C41E3A] text-white rounded-xl py-4 font-bold text-[12px] hover:bg-[#9B1830] active:scale-[0.97] transition-all shadow-warm">
            🎁 Apply Reward
          </button>
          <button onClick={() => { setShowUpgradeModal(true); setUpgradeSubmitted(false); }}
            className="bg-sb-cream text-[#C41E3A] border-2 border-[#C41E3A] rounded-xl py-4 font-bold text-[12px] hover:bg-red-50 active:scale-[0.97] transition-all">
            ⬆ Request Upgrade
          </button>
        </div>
      </div>

      {/* Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center modal-overlay"
          onClick={() => setShowRewardModal(false)}>
          <div className="bg-sb-cream rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[80vh] overflow-y-auto modal-content"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#DED8D0] mx-auto mb-4 sm:hidden" />
            <h3 className="font-serif text-[18px] mb-1">Apply Reward</h3>
            <p className="text-[11px] text-[#8B8278] mb-4">{customer.points.toLocaleString()} points available</p>
            <div className="space-y-2">
              {REWARDS.filter(r => customer.points >= r.points).map(reward => (
                <button key={reward.id}
                  onClick={() => { setRewardApplied(reward.id); setTimeout(() => { setRewardApplied(null); setShowRewardModal(false); }, 1200); }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    rewardApplied === reward.id ? 'bg-green-50 border-green-300' : 'border-[#EDE8E2] hover:bg-[#F5F0EB] active:scale-[0.99]'
                  }`}>
                  <span className="text-lg">{rewardApplied === reward.id ? '✅' : reward.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-[12px]">{reward.name}</div>
                    <div className="text-[10px] text-[#8B8278]">{reward.points} pts · {reward.where}</div>
                  </div>
                  <span className="text-[#C41E3A] font-bold text-[11px]">{rewardApplied === reward.id ? 'Applied!' : 'Apply'}</span>
                </button>
              ))}
              {REWARDS.filter(r => customer.points >= r.points).length === 0 && (
                <p className="text-[#8B8278] text-[12px] text-center py-6">Not enough points for any reward.</p>
              )}
            </div>
            <button onClick={() => setShowRewardModal(false)} className="mt-4 w-full py-3 bg-[#EDE8E2] text-[#6B645C] rounded-xl font-semibold text-[12px]">Cancel</button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center modal-overlay"
          onClick={() => setShowUpgradeModal(false)}>
          <div className="bg-sb-cream rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md modal-content"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#DED8D0] mx-auto mb-4 sm:hidden" />
            {upgradeSubmitted ? (
              <div className="text-center py-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-serif text-[18px] text-green-700">Upgrade Requested</h3>
                <p className="text-[11px] text-[#8B8278] mt-2 max-w-[260px] mx-auto">Manager will review. Temporary 90-day upgrade unless normal accrual catches up.</p>
                <button onClick={() => setShowUpgradeModal(false)} className="mt-5 w-full py-3 bg-[#C41E3A] text-white rounded-xl font-bold text-[12px]">Done</button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[18px] mb-1">Discretionary Upgrade</h3>
                <p className="text-[11px] text-[#8B8278] mb-4">One-tier bump. 5 per quarter per branch. Manager approval required.</p>
                <div className="p-3.5 bg-[#F5F0EB] rounded-xl mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg text-white text-[9px] font-bold flex items-center justify-center" style={{ background: tier.cardBg }}>{tier.emoji}</span>
                    <span className="text-[12px] font-bold">{tier.name}</span>
                  </div>
                  <span className="text-[#C8C0B6] text-lg">→</span>
                  <span className="text-[12px] font-bold" style={{ color: tier.color }}>
                    {customer.tier === 'bronze' ? 'Silver' : customer.tier === 'silver' ? 'Gold' : customer.tier === 'gold' ? 'Platinum' : 'Max'}
                  </span>
                </div>
                <textarea placeholder="Reason for upgrade..." className="w-full p-3.5 border-2 border-[#EDE8E2] rounded-xl text-[12px] resize-none h-24 focus:border-[#C41E3A] focus:outline-none transition-all bg-white" />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button onClick={() => setShowUpgradeModal(false)} className="py-3 bg-[#EDE8E2] text-[#6B645C] rounded-xl font-semibold text-[12px]">Cancel</button>
                  <button onClick={() => setUpgradeSubmitted(true)} className="py-3 bg-[#C41E3A] text-white rounded-xl font-bold text-[12px] active:scale-[0.97]">Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
