/* ─── HERO PASSPORT CARD ───
   Editorial passport: foiled corner ornament, debossed wordmark,
   stamped visit count, tier ordinal in massive serif, subtle paper grain.
   Tap to flip → QR code on back.
*/

import { useState, useEffect } from 'react';
import { OrnAdinkrahene, OrnSankofa, OrnStar, MarkS, IconQR, StarbitesLogo } from './Icons';
import { TIERS } from '../data/customers';
import { isFoundingMember } from '../data/badges';

/* ─── Custom QR-styled mark (decorative, structured) ─── */
function PassportQR({ color = '#14110D', size = 100 }) {
  const cells = [];
  // Pseudo-random but stable matrix
  const seed = 12345;
  let s = seed;
  function rand() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      // Position detection corners are drawn separately
      const inCorner =
        (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
      if (inCorner) continue;
      if (rand() > 0.5) cells.push([c, r]);
    }
  }
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" shapeRendering="crispEdges">
      {/* Corner detectors */}
      {[[0,0],[14,0],[0,14]].map(([x,y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={7} height={7} fill={color}/>
          <rect x={x+1} y={y+1} width={5} height={5} fill="#FBF6EC"/>
          <rect x={x+2} y={y+2} width={3} height={3} fill={color}/>
        </g>
      ))}
      {cells.map(([c, r], i) => <rect key={i} x={c} y={r} width={1} height={1} fill={color}/>)}
      {/* Center brand mark */}
      <rect x="9" y="9" width="3" height="3" fill="#FBF6EC"/>
      <rect x="9.4" y="9.4" width="2.2" height="2.2" fill="#B5172E"/>
    </svg>
  );
}

function PassportCard({ customer, flipKey }) {
  const tier = TIERS[customer.tier];
  const [flipped, setFlipped] = useState(false);
  const isPlat = customer.tier === 'platinum';
  const isGold = customer.tier === 'gold';
  const isPremium = isPlat || isGold;
  const isLightInk = tier.inkColor !== '#1A1410' && tier.inkColor !== '#1A1612';
  const founding = isFoundingMember(customer.memberSince);

  // Reset to front whenever customer (flipKey) changes
  useEffect(() => { setFlipped(false); }, [flipKey]);

  const visitCount = customer.transactions.length + (customer.lifetimePoints > 2000 ? 42 : customer.lifetimePoints > 500 ? 14 : 3);
  const since = new Date(customer.memberSince);
  const yearJoined = since.getFullYear();

  return (
    <div style={{
      width: '100%',
      aspectRatio: '1.585 / 1', /* ISO ID-1 card ratio */
      position: 'relative',
    }}>
      {/* Ambient drop glow */}
      <div style={{
        position: 'absolute', inset: 12, borderRadius: 22,
        background: tier.cardBg, filter: 'blur(28px)', opacity: 0.32,
        transform: 'translateY(8px) scale(0.96)',
        pointerEvents: 'none',
      }}/>

      <div
        key={flipKey}
        onClick={() => setFlipped(f => !f)}
        style={{
          position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden',
          background: tier.cardBg,
          cursor: 'pointer',
          boxShadow: `
            0 24px 50px rgba(20,17,13,0.28),
            0 6px 18px rgba(20,17,13,0.18),
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.25),
            inset 0 0 0 1px rgba(255,255,255,0.06)`,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.2, 0.4, 1)',
        }}>

        {/* ─── FRONT FACE ─── */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: flipped ? 0 : 1,
          transition: 'opacity 0.35s ease-out',
          pointerEvents: flipped ? 'none' : 'auto',
        }}>
          {/* Foiled diagonal stripes */}
          <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.55 }}/>

          {/* Holographic foil sweep (premium only) */}
          {isPremium && <div className="foil" style={{ position: 'absolute', inset: 0 }}/>}

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.22), transparent 60%)',
            pointerEvents: 'none',
          }}/>

          {/* Paper grain */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay',
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}/>

          {/* Top-right massive ornament (decoration) */}
          <div style={{
            position: 'absolute', top: -36, right: -36, width: 200, height: 200,
            opacity: 0.10, color: tier.inkColor, pointerEvents: 'none',
          }}>
            <OrnAdinkrahene size={200} color={tier.inkColor}/>
          </div>

          {/* Bottom-left small Sankofa */}
          <div style={{
            position: 'absolute', bottom: 14, left: 18, opacity: 0.16, color: tier.inkColor, pointerEvents: 'none',
          }}>
            <OrnSankofa size={28} color={tier.inkColor}/>
          </div>

          {/* ─── Content (header strip) ─── */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '14px 18px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            color: tier.inkColor,
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StarbitesLogo height={28} color={tier.inkColor}/>
            </div>

            {/* Tier name top-right (instead of ordinal) */}
            <div style={{ textAlign: 'right' }}>
              <div className="label" style={{ fontSize: 8, letterSpacing: '0.3em', opacity: 0.55 }}>TIER</div>
              <div className="numeral" style={{
                fontSize: 17, lineHeight: 1, marginTop: 3, fontWeight: 400,
                color: tier.inkColor, letterSpacing: '0.02em',
              }}>
                {tier.name}
              </div>
            </div>
          </div>

          {/* ─── Center: tier name in massive serif ─── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            color: tier.inkColor, pointerEvents: 'none',
            paddingBottom: 0,
          }}>
            <div className="label" style={{ fontSize: 9, letterSpacing: '0.42em', opacity: 0.5, marginBottom: 6 }}>
              MEMBER
            </div>
            <div className="numeral" style={{
              fontSize: 46, lineHeight: 0.95, fontWeight: 400,
              textShadow: isLightInk
                ? '0 1px 0 rgba(255,255,255,0.08), 0 -1px 0 rgba(0,0,0,0.2)'
                : '0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.08)',
            }}>
              {tier.name}
            </div>
          </div>

          {/* ─── Bottom strip ─── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '12px 18px 14px',
            color: tier.inkColor,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12,
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              {/* Name */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17, lineHeight: 1.05,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {customer.name}
              </div>
              {/* Member number + since on the same line */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 5 }}>
                <div>
                  <div className="label" style={{ fontSize: 6.5, letterSpacing: '0.32em', opacity: 0.5 }}>SINCE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.92, fontWeight: 600, letterSpacing: '0.04em' }}>
                    {yearJoined}
                  </div>
                </div>
                <div>
                  <div className="label" style={{ fontSize: 6.5, letterSpacing: '0.32em', opacity: 0.5 }}>NO.</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.92, fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                    {customer.memberNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* QR mini */}
            <div style={{
              width: 50, height: 50, borderRadius: 9,
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
              flexShrink: 0,
            }}>
              <IconQR size={26} color={tier.inkColor}/>
              <div className="label" style={{ fontSize: 5.5, letterSpacing: '0.3em', opacity: 0.5, color: tier.inkColor }}>
                TAP
              </div>
            </div>
          </div>

          {/* Inset stitched hairline border */}
          <div style={{
            position: 'absolute', inset: 8, borderRadius: 16,
            border: `1px dashed ${tier.inkColor}`, opacity: 0.18, pointerEvents: 'none',
          }}/>

          {/* Premium gold accent line at bottom edge */}
          {isPremium && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent 4%, ${tier.accent} 50%, transparent 96%)`,
              opacity: 0.7,
            }}/>
          )}
        </div>

        {/* ─── BACK FACE (QR) ─── */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: flipped ? 1 : 0,
          transition: 'opacity 0.35s ease-out',
          pointerEvents: flipped ? 'auto' : 'none',
          padding: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: tier.inkColor,
        }}>
          <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.55 }}/>
          {isPremium && <div className="foil" style={{ position: 'absolute', inset: 0 }}/>}

          {/* Stitched border */}
          <div style={{
            position: 'absolute', inset: 8, borderRadius: 16,
            border: `1px dashed ${tier.inkColor}`, opacity: 0.18,
          }}/>

          <div style={{
            background: '#FBF6EC', padding: 10, borderRadius: 12,
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            position: 'relative', zIndex: 1,
          }}>
            <PassportQR color="#14110D" size={110}/>
          </div>

          <div className="label" style={{
            fontSize: 8, letterSpacing: '0.35em', marginTop: 10, opacity: 0.7,
            position: 'relative', zIndex: 1,
          }}>
            SCAN AT TILL · {customer.memberNumber}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassportCard;
