import { useState, useMemo } from 'react';
import { TIERS, FORMATS } from '../data/customers';
import { MENU, CATEGORIES, SPECIALS } from '../data/menu';
import { LOCATIONS } from '../data/locations';
import { OrnStar, IconPin, IconSearch, IconClose, IconPlus, IconMinus, IconArrowRight, IconCheck, IconChevron, Money } from '../components/Icons';

/* ─── ORDER VIEW ─── */

function OrderView({ customer }) {
  const tier = TIERS[customer.tier];
  const [cat, setCat] = useState('popular');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState('pickup');
  const [loc, setLoc] = useState(LOCATIONS[0]);
  const [query, setQuery] = useState('');

  const items = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return MENU.filter(i => i.name.toLowerCase().includes(q) || (i.desc && i.desc.toLowerCase().includes(q)));
    }
    if (cat === 'popular') return MENU.filter(i => i.popular);
    return MENU.filter(i => i.cat === cat);
  }, [cat, query]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
  const discount = tier.discount > 0 ? Math.round(cartTotal * tier.discount / 100) : 0;
  const final = Math.max(0, cartTotal - discount);
  const pointsEarn = Math.round((final + 10) * tier.multiplier);

  function add(item) {
    setCart(prev => {
      const ex = prev.find(c => c.item.id === item.id);
      if (ex) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  }
  function adj(id, d) {
    setCart(prev => prev.map(c => c.item.id === id ? { ...c, qty: Math.max(0, c.qty + d) } : c).filter(c => c.qty > 0));
  }

  return (
    <div className="paper-grain" style={{ minHeight: '100%', paddingBottom: 130 }}>
      {/* Editorial header */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)' }}>THE MENU</div>
        <div className="numeral" style={{ fontSize: 36, lineHeight: 1, color: 'var(--ink)', marginTop: 4 }}>
          What's calling you?
        </div>
      </div>

      {/* Hero specials carousel */}
      <SpecialsCarousel/>

      {/* Location + pickup/delivery card */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          background: 'var(--card-2)', border: '1px solid var(--hairline)',
          borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', padding: 0, width: '100%', textAlign: 'left',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: FORMATS[loc.format].soft, color: FORMATS[loc.format].color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconPin size={18} color={FORMATS[loc.format].color}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>
                {loc.name} <span style={{ fontWeight: 500, color: 'var(--ink-3)' }}>· {loc.format}</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 1 }}>
                {loc.area} · {loc.hours}
              </div>
            </div>
            <IconChevron dir="down" size={14} color="var(--ink-3)"/>
          </button>

          {/* Pickup / Delivery tabs */}
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--paper)', borderRadius: 10 }}>
            {['pickup','delivery'].map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                background: orderType === t ? 'var(--card-2)' : 'transparent',
                fontSize: 11.5, fontWeight: 700, color: orderType === t ? 'var(--ink)' : 'var(--ink-3)',
                letterSpacing: '0.02em',
                boxShadow: orderType === t ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}>
                {t === 'pickup' ? 'Pickup' : 'Delivery'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--card-2)', borderRadius: 12,
          border: '1px solid var(--hairline)', padding: '10px 12px',
        }}>
          <IconSearch size={15} color="var(--ink-4)"/>
          <input
            placeholder="Search the menu…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontSize: 13, color: 'var(--ink)',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none' }}>
              <IconClose size={14} color="var(--ink-4)"/>
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      {!query && (
        <div className="hide-scrollbar" style={{
          display: 'flex', gap: 6, padding: '14px 20px 0', overflowX: 'auto',
        }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 100,
              background: cat === c.id ? 'var(--ink)' : 'var(--card-2)',
              color: cat === c.id ? 'var(--paper)' : 'var(--ink-2)',
              border: cat === c.id ? '1px solid var(--ink)' : '1px solid var(--hairline)',
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Items */}
      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => {
          const inCart = cart.find(c => c.item.id === item.id);
          return (
            <div key={item.id} className="anim-slide" style={{
              background: 'var(--card-2)', border: '1px solid var(--hairline)',
              borderRadius: 16, padding: 12,
              display: 'flex', gap: 12, alignItems: 'stretch',
              animationDelay: `${Math.min(i, 8) * 35}ms`,
            }}>
              {/* Food photo */}
              <div style={{
                width: 80, height: 80, borderRadius: 10,
                background: `var(--paper-deep) url("${item.img}") center/cover`,
                position: 'relative', overflow: 'hidden', flexShrink: 0,
                boxShadow: 'inset 0 0 0 1px rgba(20,17,13,0.06)',
              }}>
                {item.popular && (
                  <div style={{
                    position: 'absolute', top: 5, left: 5,
                    padding: '2px 5px', borderRadius: 3,
                    background: 'rgba(20,17,13,0.78)', color: 'var(--paper)',
                    fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em',
                    backdropFilter: 'blur(4px)',
                  }}>&#9733; POP</div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                    {item.name}
                  </div>
                  {item.desc && (
                    <div style={{
                      fontSize: 11, color: 'var(--ink-3)', marginTop: 3, lineHeight: 1.35,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.desc}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="numeral" style={{ fontSize: 17, color: 'var(--ink)' }}>
                      <Money n={item.price}/>
                    </span>
                    {item.rating && (
                      <span style={{ fontSize: 10, color: 'var(--ink-4)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <OrnStar size={9} color="var(--gold)"/> {item.rating}
                      </span>
                    )}
                  </div>

                  {inCart ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => adj(item.id, -1)} style={{
                        width: 28, height: 28, borderRadius: 14, border: '1px solid var(--hairline)',
                        background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><IconMinus size={12} color="var(--ink-2)"/></button>
                      <span className="numeral" style={{ fontSize: 15, width: 14, textAlign: 'center', color: 'var(--ink)' }}>
                        {inCart.qty}
                      </span>
                      <button onClick={() => adj(item.id, 1)} style={{
                        width: 28, height: 28, borderRadius: 14, border: 'none',
                        background: 'var(--ink)', color: 'var(--paper)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><IconPlus size={12} color="var(--paper)"/></button>
                    </div>
                  ) : (
                    <button onClick={() => add(item)} style={{
                      width: 32, height: 32, borderRadius: 16, border: 'none',
                      background: 'var(--ink)', color: 'var(--paper)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}><IconPlus size={14} color="var(--paper)"/></button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--ink-4)', fontSize: 12 }}>
            Nothing matches "{query}". Try another bite.
          </div>
        )}
      </div>

      {/* Floating cart bar */}
      {cartCount > 0 && !showCart && (
        <div style={{
          position: 'fixed', bottom: 140, left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)', maxWidth: 448, zIndex: 55,
        }}>
          <button onClick={() => setShowCart(true)} className="anim-slide" style={{
            width: '100%', padding: '14px 18px', borderRadius: 100,
            background: 'var(--ink)', color: 'var(--paper)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(20,17,13,0.35), 0 2px 6px rgba(20,17,13,0.2)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 26, height: 26, borderRadius: 13, background: 'var(--paper)',
                color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
              }}>{cartCount}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>View order</span>
            </span>
            <span className="numeral" style={{ fontSize: 18 }}><Money n={cartTotal}/></span>
          </button>
        </div>
      )}

      {/* Cart sheet */}
      {showCart && (
        <CartSheet
          cart={cart} cartTotal={cartTotal} discount={discount} final={final}
          pointsEarn={pointsEarn} tier={tier} loc={loc} orderType={orderType}
          adj={adj} onClose={() => setShowCart(false)} onPlace={() => { setCart([]); setShowCart(false); }}
        />
      )}
    </div>
  );
}

function CartSheet({ cart, cartTotal, discount, final: finalTotal, pointsEarn, tier, loc, orderType, adj, onClose, onPlace }) {
  const [placed, setPlaced] = useState(false);
  function place() {
    setPlaced(true);
    setTimeout(() => { setPlaced(false); onPlace(); }, 2200);
  }
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'rgba(20,17,13,0.5)',
      animation: 'fadeIn 0.2s ease-out',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: 'var(--paper)',
        borderRadius: '24px 24px 0 0',
        maxHeight: '88%', overflow: 'auto',
        animation: 'slideUp 0.4s var(--ease-spring)',
        paddingBottom: 24,
      }}>
        <div style={{ padding: '10px 0 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--hairline)' }}/>
        </div>

        {placed ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 36, margin: '0 auto',
              background: 'var(--card-2)', border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconCheck size={32} color="var(--forest)" stroke={2.5}/>
            </div>
            <div className="numeral" style={{ fontSize: 28, color: 'var(--ink)', marginTop: 18 }}>
              Order placed.
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 6 }}>
              {orderType === 'pickup' ? 'Ready at' : 'Delivering from'} <strong>{loc.name}</strong>
            </div>
            <div style={{
              marginTop: 18, padding: '10px 14px', display: 'inline-flex',
              borderRadius: 100, background: 'var(--card-2)', border: '1px solid var(--hairline)',
              fontSize: 12, fontWeight: 700, color: tier.color, gap: 6, alignItems: 'center',
            }}>
              <OrnStar size={11} color={tier.color}/> +{pointsEarn} bites earned
            </div>
          </div>
        ) : (
          <>
            <div style={{ padding: '8px 22px 12px' }}>
              <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)' }}>YOUR ORDER</div>
              <div className="numeral" style={{ fontSize: 24, color: 'var(--ink)', marginTop: 2 }}>
                {orderType === 'pickup' ? 'Pickup' : 'Delivery'} from {loc.name}
              </div>
            </div>

            <div style={{ padding: '0 22px' }}>
              {cart.map(({ item, qty }) => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0',
                  borderBottom: '1px solid var(--hairline)',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{item.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>
                      <Money n={item.price}/> each
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button onClick={() => adj(item.id, -1)} style={{
                      width: 26, height: 26, borderRadius: 13, border: '1px solid var(--hairline)',
                      background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><IconMinus size={11} color="var(--ink-2)"/></button>
                    <span style={{ width: 14, textAlign: 'center', fontWeight: 700, fontSize: 13 }}>{qty}</span>
                    <button onClick={() => adj(item.id, 1)} style={{
                      width: 26, height: 26, borderRadius: 13, border: 'none',
                      background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><IconPlus size={11} color="var(--paper)"/></button>
                  </div>
                  <div className="numeral" style={{ fontSize: 15, width: 60, textAlign: 'right', color: 'var(--ink)' }}>
                    <Money n={item.price * qty}/>
                  </div>
                </div>
              ))}

              {/* Earn preview */}
              <div style={{
                marginTop: 14, padding: 12, borderRadius: 12,
                background: 'var(--card-2)', border: '1px solid var(--hairline)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `${tier.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <OrnStar size={14} color={tier.color}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>
                    +{pointsEarn} bites to earn
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>
                    <Money n={finalTotal}/> subtotal + visit bonus{tier.multiplier > 1 ? ` \u00d7 ${tier.multiplier}` : ''}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--hairline)' }}>
                <Row label="Subtotal" valueNode={<Money n={cartTotal}/>}/>
                {discount > 0 && <Row label={`${tier.name} discount (${tier.discount}%)`} valueNode={<><span>&minus;</span><Money n={discount}/></>} accent="var(--gold)"/>}
                <Row label="Total" valueNode={<Money n={finalTotal} size={17}/>} bold/>
              </div>

              <button onClick={place} style={{
                width: '100%', marginTop: 18, padding: 14, borderRadius: 100,
                background: 'var(--ink)', color: 'var(--paper)', border: 'none',
                fontSize: 13.5, fontWeight: 700, letterSpacing: '0.02em',
              }}>
                Place {orderType === 'pickup' ? 'Pickup' : 'Delivery'} Order · GH&#8373;{finalTotal}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, valueNode, bold, accent }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0', fontSize: bold ? 15 : 12,
      fontWeight: bold ? 700 : 600, color: accent || (bold ? 'var(--ink)' : 'var(--ink-2)'),
    }}>
      <span>{label}</span>
      <span className={bold ? 'numeral' : ''} style={{ fontFamily: bold ? 'var(--font-display)' : 'var(--font-body)' }}>
        {valueNode || value}
      </span>
    </div>
  );
}

/* ─── SPECIALS CAROUSEL — full-bleed photo cards ─── */

function SpecialsCarousel() {
  return (
    <div className="snap-x hide-scrollbar" style={{
      display: 'flex', gap: 10, padding: '10px 20px 0',
      overflowX: 'auto',
    }}>
      {SPECIALS.map((s, i) => (
        <div key={i} style={{
          flex: '0 0 240px', height: 120, borderRadius: 16,
          background: `linear-gradient(120deg, rgba(20,17,13,0.05) 0%, rgba(20,17,13,0.7) 100%), url("${s.img}") center/cover`,
          color: 'var(--paper)',
          padding: '12px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(20,17,13,0.18)',
        }}>
          <div className="label" style={{ fontSize: 8, color: s.accent, letterSpacing: '0.28em' }}>
            SPOTLIGHT
          </div>
          <div>
            <div className="numeral" style={{ fontSize: 21, lineHeight: 1.05, color: 'var(--paper)' }}>
              {s.title}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(245,239,227,0.85)', marginTop: 4, lineHeight: 1.3 }}>
              {s.sub}
            </div>
            <div style={{
              marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 100,
              background: s.accent, color: '#1A1410',
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.02em',
            }}>
              {s.cta} <IconArrowRight size={11} color="#1A1410"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderView;
