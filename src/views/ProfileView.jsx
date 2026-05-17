import { useState } from 'react';
import { TIERS, TIER_ORDER, formatYearJoined } from '../data/customers';
import { OrnAdinkrahene, OrnStar, IconCheck } from '../components/Icons';

const SPICE_LEVELS = [
  { id: 'none',   label: 'None' },
  { id: 'mild',   label: 'Mild' },
  { id: 'medium', label: 'Medium' },
  { id: 'hot',    label: 'Hot' },
];
const ALLERGY_OPTIONS = ['Peanuts', 'Gluten', 'Dairy', 'Shellfish', 'Eggs', 'Soy', 'Tree Nuts', 'Fish'];
const FAVE_DISHES = ['Fantastic Jollof', 'English Breakfast', 'Meat Pie', 'Matcha Latte', 'Grilled Tilapia', 'Burger', 'Pizza', 'Fufu', 'Palava', 'Kelewele'];

function StatCell({ label, value, unit }) {
  return (
    <div style={{
      background: 'var(--card-2)', border: '1px solid var(--hairline)',
      borderRadius: 12, padding: '10px 10px',
      textAlign: 'center',
    }}>
      <div className="label" style={{ fontSize: 8, color: 'var(--ink-4)', letterSpacing: '0.22em' }}>
        {label.toUpperCase()}
      </div>
      <div className="numeral" style={{ fontSize: 19, color: 'var(--ink)', lineHeight: 1, marginTop: 4 }}>
        {value}
      </div>
      {unit && (
        <div style={{ fontSize: 8.5, color: 'var(--ink-4)', marginTop: 2, fontWeight: 600, letterSpacing: '0.06em' }}>
          {unit}
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, hint, children }) {
  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{
        background: 'var(--card-2)', border: '1px solid var(--hairline)',
        borderRadius: 16, padding: 16,
      }}>
        <div className="numeral" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1 }}>
          {title}
        </div>
        {hint && (
          <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 3, marginBottom: 12 }}>
            {hint}
          </div>
        )}
        <div style={{ marginTop: hint ? 0 : 12 }}>{children}</div>
      </div>
    </div>
  );
}

function RowKV({ k, v, mono, accent }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderTop: '1px solid var(--hairline)', gap: 12,
    }}>
      <span style={{ fontSize: 11.5, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{k}</span>
      <span style={{
        fontSize: 12.5, fontWeight: 700,
        color: accent || 'var(--ink)',
        fontFamily: mono ? 'var(--font-mono)' : 'inherit',
        whiteSpace: 'nowrap',
      }}>{v}</span>
    </div>
  );
}

function Switch({ on, onChange }) {
  return (
    <button onClick={onChange} style={{
      width: 42, height: 26, borderRadius: 13, border: 'none', padding: 0,
      background: on ? 'var(--ink)' : 'var(--hairline)',
      position: 'relative', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 22, height: 22, borderRadius: 11,
        background: 'var(--paper)', transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}/>
    </button>
  );
}

export default function ProfileView({ customer, onShowOnboarding, onShowProgram }) {
  const tier = TIERS[customer.tier];
  const [spice, setSpice] = useState('medium');
  const [allergies, setAllergies] = useState([]);
  const [faves, setFaves] = useState(['Fantastic Jollof', 'Matcha Latte']);
  const [pushOn, setPushOn] = useState(true);
  const [smsOn, setSmsOn] = useState(true);
  const [promoOn, setPromoOn] = useState(false);
  const [saved, setSaved] = useState(false);

  function tog(arr, set, v) {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  }

  return (
    <div className="paper-grain" style={{ minHeight: '100%', paddingBottom: 130 }}>
      {/* Profile crest header */}
      <div style={{ position: 'relative', overflow: 'hidden', background: tier.cardBg, color: tier.inkColor }}>
        <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}/>
        <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.1, color: tier.inkColor }}>
          <OrnAdinkrahene size={180} color={tier.inkColor}/>
        </div>
        <div style={{ position: 'relative', padding: '24px 20px 28px', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: 36, margin: '0 auto',
            background: 'rgba(255,255,255,0.14)', border: '1.5px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 28, color: tier.inkColor,
          }}>
            {customer.avatar}
          </div>
          <div className="numeral" style={{ fontSize: 22, marginTop: 12, lineHeight: 1 }}>
            {customer.name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, marginTop: 5, opacity: 0.7, letterSpacing: '0.04em' }}>
            {customer.memberNumber}
          </div>
          <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              padding: '5px 11px', borderRadius: 100,
              background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
            }}>
              <span className="numeral" style={{ fontSize: 14, lineHeight: 1 }}>{tier.ordinal}</span>
              <span className="label" style={{ fontSize: 9, letterSpacing: '0.22em' }}>{tier.name.toUpperCase()} MEMBER</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <StatCell label="Lifetime" value={customer.lifetimePoints.toLocaleString()} unit="stars"/>
        <StatCell label="Visits" value={customer.transactions.length + (customer.lifetimePoints > 2000 ? 42 : 8)}/>
        <StatCell label="Member" value={new Date().getFullYear() - new Date(customer.memberSince).getFullYear() + 'y'}/>
      </div>

      {/* Account */}
      <SectionCard title="Account">
        <RowKV k="Phone" v={customer.phone} mono/>
        <RowKV k="Birthday" v={customer.birthday ? new Date(customer.birthday).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : 'Not set'}/>
        <RowKV k="Member since" v={formatYearJoined(customer.memberSince)}/>
        <RowKV k="Lifetime stars" v={customer.lifetimePoints.toLocaleString()} accent={tier.color}/>
      </SectionCard>

      {/* Spice */}
      <SectionCard title="Spice preference" hint="Staff will see this when you order">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {SPICE_LEVELS.map(l => (
            <button key={l.id} onClick={() => setSpice(l.id)} style={{
              padding: '10px 0', borderRadius: 10,
              background: spice === l.id ? 'var(--ink)' : 'var(--paper)',
              color: spice === l.id ? 'var(--paper)' : 'var(--ink-2)',
              border: spice === l.id ? '1px solid var(--ink)' : '1px solid var(--hairline)',
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.02em',
            }}>{l.label}</button>
          ))}
        </div>
      </SectionCard>

      {/* Allergies */}
      <SectionCard title="Allergies" hint="Flagged to kitchen on every order">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ALLERGY_OPTIONS.map(a => {
            const on = allergies.includes(a);
            return (
              <button key={a} onClick={() => tog(allergies, setAllergies, a)} style={{
                padding: '7px 12px', borderRadius: 100,
                background: on ? 'rgba(181,23,46,0.1)' : 'var(--paper)',
                color: on ? 'var(--red)' : 'var(--ink-3)',
                border: on ? '1px solid rgba(181,23,46,0.3)' : '1px solid var(--hairline)',
                fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
              }}>{a}</button>
            );
          })}
        </div>
      </SectionCard>

      {/* Favourites */}
      <SectionCard title="Favourite dishes" hint="We'll suggest these at the top">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {FAVE_DISHES.map(d => {
            const on = faves.includes(d);
            return (
              <button key={d} onClick={() => tog(faves, setFaves, d)} style={{
                padding: '7px 12px', borderRadius: 100,
                background: on ? tier.cardBg : 'var(--paper)',
                color: on ? tier.inkColor : 'var(--ink-3)',
                border: on ? '1px solid rgba(255,255,255,0.05)' : '1px solid var(--hairline)',
                fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
              }}>{d}</button>
            );
          })}
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notifications">
        {[
          { label: 'Push notifications', desc: 'Rewards & tier progress', value: pushOn, set: setPushOn },
          { label: 'SMS balance updates', desc: 'Quarterly stars summary',  value: smsOn,  set: setSmsOn },
          { label: 'Promotions & events', desc: 'Karaoke nights, specials', value: promoOn, set: setPromoOn },
        ].map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{it.label}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 1 }}>{it.desc}</div>
            </div>
            <Switch on={it.value} onChange={() => it.set(!it.value)}/>
          </div>
        ))}
      </SectionCard>

      {/* Save button */}
      <div style={{ padding: '4px 20px 0' }}>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }}
          style={{
            width: '100%', padding: 14, borderRadius: 100,
            background: saved ? 'var(--forest)' : 'var(--ink)',
            color: 'var(--paper)', border: 'none',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
          {saved ? <><IconCheck size={14} color="var(--paper)" stroke={2.5}/> Saved</> : 'Save preferences'}
        </button>
      </div>
    </div>
  );
}
