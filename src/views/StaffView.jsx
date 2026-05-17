import { useState } from 'react';
import { CUSTOMERS, TIERS, REWARDS, FORMATS, relDate } from '../data/customers';
import { OrnStar, StarbitesLogo, IconSearch, IconClose, IconCheck, IconLock, Money, REWARD_GLYPHS } from '../components/Icons';

function ApplyDashModal({ customer, onClose, applied, setApplied }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: '#1A1410', color: 'var(--paper)',
        borderRadius: '22px 22px 0 0', padding: '14px 0 24px',
        maxHeight: '85%', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 38, height: 4, borderRadius: 2, background: 'rgba(245,239,227,0.2)' }}/>
        </div>
        <div style={{ padding: '0 22px' }}>
          <div className="label" style={{ fontSize: 9, color: 'rgba(245,239,227,0.5)' }}>APPLY DASH</div>
          <div className="numeral" style={{ fontSize: 22, marginTop: 3 }}>Pick a reward to apply</div>
          <div style={{ fontSize: 11, color: 'rgba(245,239,227,0.55)', marginTop: 4 }}>
            {customer.points.toLocaleString()} stars available
          </div>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {REWARDS.filter(r => customer.points >= r.points).map(r => {
              const G = REWARD_GLYPHS[r.icon];
              const isApplied = applied === r.id;
              return (
                <button key={r.id} onClick={() => { setApplied(r.id); setTimeout(() => { setApplied(null); onClose(); }, 1100); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 12, borderRadius: 12,
                    background: isApplied ? 'rgba(79,191,138,0.18)' : 'rgba(245,239,227,0.05)',
                    border: `1px solid ${isApplied ? 'rgba(79,191,138,0.4)' : 'rgba(245,239,227,0.08)'}`,
                    textAlign: 'left',
                  }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 9,
                    background: 'rgba(245,239,227,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isApplied ? <IconCheck size={20} color="#4FBF8A" stroke={2.5}/> : <G size={22} color="var(--gold-light)"/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(245,239,227,0.5)' }}>{r.points.toLocaleString()} stars</div>
                  </div>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, color: isApplied ? '#4FBF8A' : 'var(--gold-light)',
                  }}>{isApplied ? 'APPLIED' : 'Apply →'}</span>
                </button>
              );
            })}
          </div>

          <button onClick={onClose} style={{
            width: '100%', marginTop: 16, padding: 14, borderRadius: 100,
            background: 'rgba(245,239,227,0.08)', color: 'var(--paper)', border: 'none',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StaffView() {
  const [query, setQuery] = useState('');
  const [found, setFound] = useState(CUSTOMERS[3]);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(null);
  const tier = TIERS[found.tier];

  function search(e) {
    e.preventDefault();
    const clean = query.replace(/\s/g, '');
    if (!clean) return;
    const match = CUSTOMERS.find(c => c.phone.replace(/\s/g, '').includes(clean) || c.memberNumber.includes(clean.toUpperCase()));
    if (match) { setFound(match); setQuery(''); }
  }

  return (
    <div style={{ background: '#0F0D0A', minHeight: '100%', color: 'var(--paper)', paddingBottom: 130 }}>
      {/* Staff header */}
      <div style={{ padding: '14px 20px 18px', borderBottom: '1px solid rgba(245,239,227,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StarbitesLogo height={16} color="rgba(245,239,227,0.55)"/>
            <span style={{
              width: 7, height: 7, borderRadius: 4,
              background: '#4FBF8A', boxShadow: '0 0 8px #4FBF8A',
            }}/>
            <span className="label" style={{ fontSize: 8, color: 'rgba(245,239,227,0.55)', letterSpacing: '0.3em' }}>
              STAFF TILL
            </span>
          </div>
        </div>
        <div className="numeral" style={{ fontSize: 26, color: 'var(--paper)', marginTop: 8, lineHeight: 1 }}>
          Customer lookup
        </div>

        <form onSubmit={search} style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,239,227,0.06)', border: '1px solid rgba(245,239,227,0.1)',
            borderRadius: 10, padding: '10px 12px',
          }}>
            <IconSearch size={15} color="rgba(245,239,227,0.4)"/>
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Phone or member number…"
              style={{
                flex: 1, border: 'none', background: 'transparent',
                color: 'var(--paper)', fontSize: 13, outline: 'none', fontFamily: 'var(--font-mono)',
              }}/>
          </div>
          <button type="submit" style={{
            padding: '10px 16px', borderRadius: 10, border: 'none',
            background: 'var(--red)', color: 'var(--paper)',
            fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em',
          }}>Find</button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {CUSTOMERS.map(c => (
            <button key={c.id} onClick={() => setFound(c)} style={{
              fontFamily: 'var(--font-mono)', fontSize: 9.5,
              color: found.id === c.id ? '#FBF6EC' : 'rgba(245,239,227,0.45)',
              background: 'transparent', border: 'none', padding: '2px 4px',
              fontWeight: 600,
            }}>
              {c.phone}
            </button>
          ))}
        </div>
      </div>

      {/* Profile */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: 'rgba(245,239,227,0.04)',
          border: '1px solid rgba(245,239,227,0.08)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          <div style={{ height: 4, background: tier.cardBg }}/>
          <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: tier.cardBg, color: tier.inkColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 22,
            }}>{found.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="numeral" style={{ fontSize: 18, color: 'var(--paper)' }}>{found.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                <span style={{
                  padding: '2px 7px', borderRadius: 4,
                  background: tier.color, color: tier.inkColor,
                  fontSize: 8.5, fontWeight: 700, letterSpacing: '0.16em',
                }}>{tier.name.toUpperCase()}</span>
                <span style={{ fontSize: 11, color: 'rgba(245,239,227,0.5)', fontFamily: 'var(--font-mono)' }}>
                  {found.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(245,239,227,0.06)' }}>
            {[
              { v: found.points.toLocaleString(), l: 'STARS', c: tier.color },
              { v: found.transactions.length, l: 'VISITS', c: 'var(--paper)' },
              { v: tier.discount ? `${tier.discount}%` : '—', l: 'DISCOUNT', c: tier.discount ? 'var(--gold-light)' : 'rgba(245,239,227,0.3)' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '12px 8px', textAlign: 'center',
                borderLeft: i ? '1px solid rgba(245,239,227,0.06)' : 'none',
              }}>
                <div className="numeral" style={{ fontSize: 20, color: s.c, lineHeight: 1 }}>{s.v}</div>
                <div className="label" style={{ fontSize: 7.5, color: 'rgba(245,239,227,0.4)', marginTop: 4, letterSpacing: '0.22em' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allergies & notes */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          background: 'rgba(232,74,95,0.08)', border: '1px solid rgba(232,74,95,0.22)',
          borderRadius: 12, padding: '12px 14px',
        }}>
          <div className="label" style={{ fontSize: 8.5, color: '#FF8AA0', letterSpacing: '0.28em' }}>
            ⚠ KITCHEN ALERT
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 4 }}>
            {found.id === 2 ? 'Peanut allergy — kitchen has been notified' : 'No allergies on file'}
          </div>
        </div>

        <div style={{
          background: 'rgba(245,239,227,0.04)', border: '1px solid rgba(245,239,227,0.08)',
          borderRadius: 12, padding: 14, marginTop: 8,
        }}>
          <div className="label" style={{ fontSize: 8.5, color: 'var(--gold-light)', letterSpacing: '0.28em' }}>
            STAFF NOTE
          </div>
          <div style={{ fontSize: 12, marginTop: 5, lineHeight: 1.45, color: 'rgba(245,239,227,0.85)' }}>
            {found.id === 4 ? '"Mr. Eric" — Daily regular for 5+ years. Tips generously, helps new staff. Window seat right side.'
              : found.id === 3 ? 'Family of 4. Mom loves local dishes, kids want burgers + pizza.'
              : found.id === 2 ? 'Express commuter. Prefers Matcha + croissant 7-8am.'
              : 'Morning regular. Visits 7-8am for pies and coffee.'}
          </div>
        </div>
      </div>

      {/* Recent visits */}
      <div style={{ padding: '14px 20px 0' }}>
        <div className="label" style={{ fontSize: 9, color: 'rgba(245,239,227,0.45)', letterSpacing: '0.22em', marginBottom: 8 }}>
          LAST 3 VISITS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {found.transactions.slice(0, 3).map((tx, i) => (
            <div key={i} style={{
              background: 'rgba(245,239,227,0.04)', border: '1px solid rgba(245,239,227,0.06)',
              borderRadius: 10, padding: '10px 12px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                padding: '2px 5px', borderRadius: 3,
                background: 'rgba(245,239,227,0.08)', color: 'var(--gold-light)', letterSpacing: '0.06em',
              }}>{FORMATS[tx.format].tag}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tx.location}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(245,239,227,0.5)', marginTop: 1 }}>
                  {relDate(tx.date)} · {tx.items.slice(0,2).join(', ')}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>
                <Money n={tx.amount} muted={0.6}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button onClick={() => setShowApply(true)} style={{
          background: 'var(--red)', color: 'var(--paper)', border: 'none',
          padding: '14px 0', borderRadius: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
        }}>Apply Dash</button>
        <button style={{
          background: 'transparent', color: 'var(--gold-light)',
          border: '1px solid rgba(220,182,107,0.35)',
          padding: '14px 0', borderRadius: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
        }}>Request Upgrade</button>
      </div>

      {/* Apply modal */}
      {showApply && (
        <ApplyDashModal customer={found} onClose={() => setShowApply(false)}
          applied={applied} setApplied={setApplied}/>
      )}
    </div>
  );
}
