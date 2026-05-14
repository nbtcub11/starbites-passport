import { useState } from 'react';
import { TIERS } from '../data/customers';

const ALLERGY_OPTIONS = ['Peanuts', 'Gluten', 'Dairy', 'Shellfish', 'Eggs', 'Soy', 'Tree Nuts', 'Fish'];
const SPICE_LEVELS = [
  { id: 'none', label: 'No Spice', icon: '🫑' },
  { id: 'mild', label: 'Mild', icon: '🌶️' },
  { id: 'medium', label: 'Medium', icon: '🌶️🌶️' },
  { id: 'hot', label: 'Hot!', icon: '🔥' },
];
const FAVORITE_DISHES = ['Fantastic Jollof', 'English Breakfast', 'Meat Pie', 'Matcha Latte', 'Grilled Tilapia', 'Burger', 'Pasta', 'Pizza', 'Fufu & Light Soup', 'Rich Palava Sauce', 'Kelewele', 'Croissant'];

export default function ProfileView({ customer, onShowOnboarding }) {
  const tier = TIERS[customer.tier];
  const [spice, setSpice] = useState('medium');
  const [allergies, setAllergies] = useState(customer.preferences.allergies || []);
  const [favDishes, setFavDishes] = useState(customer.preferences.favorites || []);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [promoNotifs, setPromoNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  function toggleAllergy(a) {
    setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }

  function toggleDish(d) {
    setFavDishes(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="pb-40 -mt-5">
      {/* Profile header */}
      <div className="relative overflow-hidden rounded-b-3xl shadow-warm-lg mb-5">
        <div className="absolute inset-0" style={{ background: tier.cardBg }} />
        <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 px-5 pt-6 pb-8 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black shadow-warm-lg border-2 border-white/20"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: tier.textColor }}>
            {customer.avatar}
          </div>
          <div className="font-serif text-[22px] mt-3" style={{ color: tier.textColor }}>
            {customer.name}
          </div>
          <div className="text-[12px] mt-1 font-mono tracking-wider" style={{ color: tier.textColor, opacity: 0.6 }}>
            {customer.memberNumber}
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase"
            style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: tier.textColor,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
            {tier.emoji} {tier.name} Member
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Account Info */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-3">Account</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#EDE8E2]">
              <span className="text-[12px] text-[#8B8278]">Phone</span>
              <span className="text-[13px] font-semibold font-mono text-[#1A1612]">{customer.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#EDE8E2]">
              <span className="text-[12px] text-[#8B8278]">Member Since</span>
              <span className="text-[13px] font-semibold text-[#1A1612]">
                {new Date(customer.memberSince).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[12px] text-[#8B8278]">Lifetime Bites</span>
              <span className="text-[13px] font-bold" style={{ color: tier.color }}>{customer.lifetimePoints.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Spice Level */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-1">Spice Preference</h3>
          <p className="text-[11px] text-[#8B8278] mb-3">Staff will see this when you order</p>
          <div className="grid grid-cols-4 gap-2">
            {SPICE_LEVELS.map(level => (
              <button key={level.id}
                onClick={() => setSpice(level.id)}
                className={`py-3 rounded-xl text-center transition-all active:scale-95 ${
                  spice === level.id
                    ? 'bg-[#C41E3A] text-white shadow-warm'
                    : 'bg-[#F5F0EB] text-[#6B645C] border border-[#EDE8E2]'
                }`}>
                <div className="text-[14px]">{level.icon}</div>
                <div className="text-[10px] font-bold mt-0.5">{level.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-1">Allergies</h3>
          <p className="text-[11px] text-[#8B8278] mb-3">These will be flagged to kitchen staff</p>
          <div className="flex flex-wrap gap-2">
            {ALLERGY_OPTIONS.map(a => (
              <button key={a}
                onClick={() => toggleAllergy(a)}
                className={`px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all active:scale-95 ${
                  allergies.includes(a)
                    ? 'bg-red-500/15 text-red-600 border border-red-300'
                    : 'bg-[#F5F0EB] text-[#8B8278] border border-[#EDE8E2]'
                }`}>
                {allergies.includes(a) ? '⚠️ ' : ''}{a}
              </button>
            ))}
          </div>
        </div>

        {/* Favorite Dishes */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-1">Favorite Dishes</h3>
          <p className="text-[11px] text-[#8B8278] mb-3">We'll suggest these when you order</p>
          <div className="flex flex-wrap gap-2">
            {FAVORITE_DISHES.map(d => (
              <button key={d}
                onClick={() => toggleDish(d)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                  favDishes.includes(d)
                    ? 'text-white shadow-warm-sm'
                    : 'bg-[#F5F0EB] text-[#8B8278] border border-[#EDE8E2]'
                }`}
                style={favDishes.includes(d) ? { background: tier.cardBg } : {}}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-1">Special Preferences</h3>
          <p className="text-[11px] text-[#8B8278] mb-3">Anything else staff should know about your dining experience</p>
          <textarea
            placeholder="e.g. I prefer my food not too oily, window seating, extra napkins for kids, no ice in drinks..."
            className="w-full p-4 border-2 border-[#EDE8E2] rounded-xl text-[13px] text-[#1A1612] placeholder-[#C8C0B6] resize-none h-28 focus:border-[#C41E3A] focus:outline-none transition-all bg-white leading-relaxed"
            defaultValue={customer.preferences.notes || ''}
          />
          <p className="text-[10px] text-[#A89E94] mt-1.5">Staff will see this on the BimPOS when they look up your number</p>
        </div>

        {/* Notifications */}
        <div className="bg-sb-cream rounded-2xl p-5 shadow-warm-sm border border-[#EDE8E2]">
          <h3 className="font-serif text-[16px] text-[#1A1612] mb-3">Notifications</h3>
          <div className="space-y-3">
            {[
              { label: 'SMS balance updates', desc: 'Quarterly bites summary', value: smsNotifs, onChange: setSmsNotifs },
              { label: 'Push notifications', desc: 'Rewards & tier progress', value: pushNotifs, onChange: setPushNotifs },
              { label: 'Promotions & events', desc: 'Karaoke nights, special menus', value: promoNotifs, onChange: setPromoNotifs },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1612]">{item.label}</div>
                  <div className="text-[11px] text-[#8B8278]">{item.desc}</div>
                </div>
                <button
                  onClick={() => item.onChange(!item.value)}
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
                    item.value ? 'bg-[#C41E3A]' : 'bg-[#DED8D0]'
                  }`}>
                  <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-warm-sm transition-all duration-300 ${
                    item.value ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold text-[14px] transition-all active:scale-[0.97] shadow-warm ${
            saved ? 'bg-[#10B981] text-white' : 'bg-[#C41E3A] text-white'
          }`}>
          {saved ? '✓ Preferences Saved!' : 'Save Preferences'}
        </button>

        {/* Demo: replay onboarding */}
        <button
          onClick={onShowOnboarding}
          className="w-full py-3 rounded-xl text-[12px] font-semibold text-[#8B8278] bg-[#F5F0EB] border border-[#EDE8E2] transition-all">
          Replay Welcome Experience
        </button>
      </div>
    </div>
  );
}
