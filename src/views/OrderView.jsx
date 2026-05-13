import { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS, PREVIOUS_ORDERS } from '../data/menu';
import { LOCATIONS } from '../data/locations';
import { TIERS, REWARDS } from '../data/customers';

export default function OrderView({ customer }) {
  const tier = TIERS[customer.tier];
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [appliedReward, setAppliedReward] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderType, setOrderType] = useState('pickup');
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const previousOrders = PREVIOUS_ORDERS[customer.id] || [];

  // Items filtered by category or search
  const items = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return MENU_ITEMS.filter(i => i.name.toLowerCase().includes(q) || (i.desc && i.desc.toLowerCase().includes(q)));
    }
    if (activeCategory === 'popular') {
      return [...MENU_ITEMS].filter(i => i.popular).sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return MENU_ITEMS.filter(i => i.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
  const discount = tier.discount > 0 ? Math.round(cartTotal * tier.discount / 100) : 0;
  const rewardDiscount = appliedReward ? appliedReward.points / 10 : 0;
  const finalTotal = Math.max(0, cartTotal - discount - rewardDiscount);
  const pointsEarned = finalTotal + 10;

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  }

  function updateQty(itemId, delta) {
    setCart(prev => prev.map(c => c.item.id === itemId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  }

  function reorderPrevious(order) {
    order.items.forEach(itemId => {
      const item = MENU_ITEMS.find(m => m.id === itemId);
      if (item) addToCart(item);
    });
  }

  function placeOrder() {
    setOrderPlaced(true);
    setTimeout(() => { setOrderPlaced(false); setShowCart(false); setCart([]); setAppliedReward(null); }, 3000);
  }

  return (
    <div className="pb-40 -mt-5">
      {/* Header */}
      <div className="bg-[#C41E3A] text-white px-5 pt-5 pb-5 rounded-b-3xl shadow-warm-lg mb-4 relative overflow-hidden">
        <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="font-serif text-[24px] text-white">Order</div>

          {/* Location selector */}
          <button onClick={() => setShowLocationPicker(true)}
            className="mt-3 flex items-center gap-3 bg-white/20 border border-white/15 rounded-xl px-4 py-3 w-full text-left transition-all hover:bg-white/25">
            <span className="text-lg">{selectedLocation.format === 'Signature' ? '🍽️' : selectedLocation.format === 'To-Go' ? '🛍️' : '⚡'}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-white truncate">{selectedLocation.name}</div>
              <div className="text-[12px] text-white/70">{selectedLocation.area}</div>
            </div>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" className="opacity-60 shrink-0"><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Order type toggle */}
          <div className="flex gap-2 mt-3">
            {['pickup', 'delivery'].map(type => (
              <button key={type} onClick={() => setOrderType(type)}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                  orderType === type ? 'bg-white text-[#C41E3A] shadow-warm' : 'bg-white/15 text-white'
                }`}>
                {type === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'}
              </button>
            ))}
          </div>

          {/* Delivery address input */}
          {orderType === 'delivery' && (
            <div className="mt-3">
              <div className="flex items-center gap-2 bg-white/15 border border-white/10 rounded-xl px-3 py-2.5">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" className="shrink-0 opacity-60">
                  <path d="M12 7c0 4-4 7-4 7S4 11 4 7a4 4 0 118 0z"/><circle cx="8" cy="7" r="1.5"/>
                </svg>
                <input
                  type="text"
                  placeholder="Enter delivery address..."
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-white placeholder-white/40 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 mb-3">
        <div className="relative">
          <svg width="16" height="16" fill="none" stroke="#8B8278" strokeWidth="2" className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
          </svg>
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveCategory(''); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sb-cream border border-[#EDE8E2] text-[13px] text-[#1A1612] placeholder-[#C8C0B6] focus:border-[#C41E3A] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setActiveCategory('popular'); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8278] text-[11px] font-bold">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Previous orders — reorder */}
      {previousOrders.length > 0 && !searchQuery && activeCategory === 'popular' && (
        <div className="px-4 mb-4">
          <div className="text-[13px] font-bold text-[#1A1612] mb-2 px-1">Order Again</div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar">
            {previousOrders.map(order => {
              const orderItems = order.items.map(id => MENU_ITEMS.find(m => m.id === id)).filter(Boolean);
              return (
                <button key={order.id} onClick={() => reorderPrevious(order)}
                  className="shrink-0 bg-sb-cream rounded-xl p-3 shadow-warm-sm border border-[#EDE8E2] text-left w-[200px] transition-all active:scale-[0.97] hover:shadow-warm">
                  <div className="text-[10px] text-[#8B8278] mb-1">{order.location}</div>
                  <div className="text-[12px] font-semibold text-[#1A1612] leading-snug truncate">
                    {orderItems.map(i => i.name).join(', ')}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-[#8B8278]">GHS {orderItems.reduce((s, i) => s + i.price, 0)}</span>
                    <span className="text-[10px] font-bold text-[#C41E3A]">+ Add All</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category tabs */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 mb-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#C41E3A] text-white shadow-warm'
                  : 'bg-sb-cream text-[#6B645C] border border-[#EDE8E2]'
              }`}>
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Search results label */}
      {searchQuery && (
        <div className="px-5 mb-2 text-[12px] text-[#8B8278]">
          {items.length} result{items.length !== 1 ? 's' : ''} for "{searchQuery}"
        </div>
      )}

      {/* Menu items */}
      <div className="px-4 space-y-2.5">
        {items.map(item => {
          const inCart = cart.find(c => c.item.id === item.id);
          return (
            <div key={item.id} className="bg-sb-cream rounded-xl p-3.5 shadow-warm-sm border border-[#EDE8E2] flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14px] text-[#1A1612]">{item.name}</span>
                  {item.popular && <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#C41E3A]/10 text-[#C41E3A]">POPULAR</span>}
                </div>
                {item.desc && <div className="text-[12px] text-[#8B8278] mt-0.5">{item.desc}</div>}
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-bold text-[14px] text-[#1A1612]">GHS {item.price}</span>
                  {item.rating && (
                    <span className="text-[11px] text-[#8B8278]">
                      ⭐ {item.rating} <span className="text-[#C8C0B6]">({item.reviews})</span>
                    </span>
                  )}
                </div>
              </div>

              {inCart ? (
                <div className="flex items-center gap-2.5 shrink-0">
                  <button onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 rounded-lg bg-[#EDE8E2] flex items-center justify-center text-[#6B645C] font-bold active:scale-90">−</button>
                  <span className="text-[14px] font-bold w-4 text-center">{inCart.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 rounded-lg bg-[#C41E3A] flex items-center justify-center text-white font-bold active:scale-90">+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(item)}
                  className="shrink-0 px-4 py-2 rounded-xl bg-[#C41E3A] text-white text-[12px] font-bold active:scale-95 transition-all shadow-warm-sm">
                  Add
                </button>
              )}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-8 text-[#8B8278] text-[13px]">
            No items found. Try a different search.
          </div>
        )}
      </div>

      {/* Floating cart button */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-36 left-0 right-0 z-40 px-4 max-w-lg mx-auto animate-slide-up">
          <button onClick={() => setShowCart(true)}
            className="w-full bg-[#C41E3A] text-white rounded-2xl py-4 px-5 flex items-center justify-between active:scale-[0.98] transition-all"
            style={{ boxShadow: '0 8px 30px rgba(196, 30, 58, 0.35), 0 2px 8px rgba(196, 30, 58, 0.2)' }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[#C41E3A] text-[10px] font-extrabold flex items-center justify-center">{cartCount}</span>
              </div>
              <span className="font-bold text-[15px]">View Cart</span>
            </div>
            <span className="font-bold text-[16px]">GHS {cartTotal}</span>
          </button>
        </div>
      )}

      {/* Cart / Checkout Sheet */}
      {showCart && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end modal-overlay" onClick={() => setShowCart(false)}>
          <div className="bg-sb-cream rounded-t-3xl w-full max-h-[85vh] overflow-y-auto modal-content" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-sb-cream pt-3 pb-2 px-5 z-10">
              <div className="w-10 h-1 rounded-full bg-[#DED8D0] mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-[20px] text-[#1A1612]">Your Order</h3>
                <button onClick={() => setShowCart(false)} className="text-[#8B8278] text-[12px] font-semibold">Close</button>
              </div>
            </div>

            {orderPlaced ? (
              <div className="text-center py-12 px-5 animate-card-enter">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="font-serif text-[24px] text-[#1A1612]">Order Placed!</h3>
                <p className="text-[13px] text-[#8B8278] mt-2">
                  Your {orderType} order at {selectedLocation.name} is being prepared.
                </p>
                {orderType === 'delivery' && deliveryAddress && (
                  <p className="text-[12px] text-[#8B8278] mt-1">Delivering to: {deliveryAddress}</p>
                )}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20">
                  <span className="font-bold text-[#C41E3A] text-[14px]">+{pointsEarned} points earned!</span>
                </div>
              </div>
            ) : (
              <div className="px-5 pb-8">
                {/* Cart items */}
                <div className="space-y-2 mb-4">
                  {cart.map(({ item, qty }) => (
                    <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-[#EDE8E2]">
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#1A1612]">{item.name}</div>
                        <div className="text-[11px] text-[#8B8278]">GHS {item.price} each</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-[#EDE8E2] flex items-center justify-center text-[12px] font-bold active:scale-90">−</button>
                        <span className="text-[13px] font-bold w-4 text-center">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-[#C41E3A] text-white flex items-center justify-center text-[12px] font-bold active:scale-90">+</button>
                        <span className="text-[13px] font-bold text-[#1A1612] ml-2 w-14 text-right">GHS {item.price * qty}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery address in checkout */}
                {orderType === 'delivery' && (
                  <div className="mb-4 p-3 bg-[#F5F0EB] rounded-xl border border-[#EDE8E2]">
                    <div className="text-[10px] text-[#8B8278] uppercase tracking-wider font-bold mb-1.5">📍 Deliver To</div>
                    <input
                      type="text"
                      placeholder="Enter your address..."
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg bg-white border border-[#EDE8E2] text-[13px] text-[#1A1612] placeholder-[#C8C0B6] focus:border-[#C41E3A] focus:outline-none"
                    />
                  </div>
                )}

                {/* Points earned preview */}
                <div className="bg-[#F0FFF4] border border-[#C6F6D5] rounded-xl p-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <div>
                      <div className="text-[13px] font-bold text-[#22543D]">You'll earn +{pointsEarned} points</div>
                      <div className="text-[11px] text-[#38A169]">{finalTotal} GHS spend + 10 visit bonus</div>
                    </div>
                  </div>
                </div>

                {/* Apply reward */}
                <div className="mb-4">
                  <div className="text-[11px] text-[#8B8278] uppercase tracking-wider font-semibold mb-2">Apply a Dash</div>
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {REWARDS.filter(r => customer.points >= r.points).slice(0, 4).map(reward => (
                      <button key={reward.id}
                        onClick={() => setAppliedReward(appliedReward?.id === reward.id ? null : reward)}
                        className={`shrink-0 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold transition-all ${
                          appliedReward?.id === reward.id
                            ? 'bg-[#C41E3A] text-white shadow-warm'
                            : 'bg-sb-cream border border-[#EDE8E2] text-[#6B645C]'
                        }`}>
                        {reward.icon} {reward.name}
                      </button>
                    ))}
                    {REWARDS.filter(r => customer.points >= r.points).length === 0 && (
                      <span className="text-[11px] text-[#C8C0B6]">Keep earning — dashes coming soon!</span>
                    )}
                  </div>
                </div>

                {/* Order summary */}
                <div className="space-y-2 border-t border-[#EDE8E2] pt-4 mb-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#8B8278]">Subtotal</span>
                    <span className="font-semibold">GHS {cartTotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#C8993E]">{tier.name} discount ({tier.discount}%)</span>
                      <span className="font-semibold text-[#C8993E]">−GHS {discount}</span>
                    </div>
                  )}
                  {appliedReward && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#C41E3A]">{appliedReward.icon} {appliedReward.name}</span>
                      <span className="font-semibold text-[#C41E3A]">FREE</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[16px] font-bold pt-2 border-t border-[#EDE8E2]">
                    <span>Total</span>
                    <span>GHS {finalTotal}</span>
                  </div>
                </div>

                <button onClick={placeOrder}
                  className="w-full py-4 rounded-2xl bg-[#C41E3A] text-white font-bold text-[15px] active:scale-[0.97] shadow-warm-lg transition-all">
                  Place {orderType === 'pickup' ? 'Pickup' : 'Delivery'} Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end modal-overlay" onClick={() => setShowLocationPicker(false)}>
          <div className="bg-sb-cream rounded-t-3xl w-full max-h-[70vh] overflow-y-auto modal-content" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-sb-cream pt-3 pb-2 px-5">
              <div className="w-10 h-1 rounded-full bg-[#DED8D0] mx-auto mb-3" />
              <h3 className="font-serif text-[18px]">Pick a Location</h3>
            </div>
            <div className="px-5 pb-6 space-y-2">
              {LOCATIONS.map(loc => (
                <button key={loc.id}
                  onClick={() => { setSelectedLocation(loc); setShowLocationPicker(false); }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedLocation.id === loc.id ? 'border-[#C41E3A] bg-[#C41E3A]/5' : 'border-[#EDE8E2] hover:bg-[#F5F0EB]'
                  }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{loc.format === 'Signature' ? '🍽️' : loc.format === 'To-Go' ? '🛍️' : '⚡'}</span>
                    <div>
                      <div className="text-[13px] font-bold">{loc.name}</div>
                      <div className="text-[10px] text-[#8B8278]">{loc.area} · {loc.hours}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
