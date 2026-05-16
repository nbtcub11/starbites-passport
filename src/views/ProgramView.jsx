import { OrnAdinkrahene, OrnGyeNyame, OrnStar, OrnDuafe, OrnSankofa } from '../components/Icons';
import { TIERS, TIER_ORDER } from '../data/customers';

export default function ProgramView({ onBack }) {
  return (
    <div className="paper-grain" style={{ minHeight: '100%', paddingBottom: 90, paddingTop: 44 }}>
      {/* Header */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '20px 20px 24px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.08 }}>
          <OrnAdinkrahene size={200} color="var(--paper)"/>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="label" style={{ fontSize: 9, color: 'var(--gold-light)' }}>STARBITES REWARDS</div>
            <div className="numeral" style={{ fontSize: 32, marginTop: 4, lineHeight: 1, color: 'var(--paper)' }}>
              Programme overview
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,239,227,0.65)', marginTop: 8, maxWidth: 280, lineHeight: 1.4 }}>
              Earn bites every visit. Level up for bigger perks. Status maintained year-on-year.
            </div>
          </div>
          <button onClick={onBack} style={{
            background: 'rgba(245,239,227,0.08)', border: '1px solid rgba(245,239,227,0.1)',
            color: 'var(--paper)',
            padding: '6px 12px', borderRadius: 100,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
          }}>← Exit</button>
        </div>
      </div>

      {/* How you earn */}
      <div style={{ padding: '16px 20px 0' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)', marginBottom: 8 }}>
          HOW YOU EARN
        </div>
        <div style={{
          background: 'var(--card-2)', border: '1px solid var(--hairline)',
          borderRadius: 16, padding: 16,
        }}>
          {[
            { Ico: OrnStar, t: '1 bite per cedi spent', d: 'Plus 10 bonus bites every visit' },
            { Ico: OrnGyeNyame, t: 'Multipliers as you climb', d: 'Silver 1.25× · Gold 1.5× · Platinum 2×' },
            { Ico: OrnDuafe, t: 'Double-bite days', d: 'Featured days throughout the year' },
            { Ico: OrnSankofa, t: '200 per referral', d: 'You both earn on their first order' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderTop: i ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <row.Ico size={18} color="var(--ink)"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{row.t}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{row.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status maintenance callout */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          background: 'linear-gradient(105deg, #FFD36C, #B8893A)',
          borderRadius: 14, padding: '14px 16px',
          color: '#1A1410',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <OrnGyeNyame size={32} color="#1A1410"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Maintain your status</div>
            <div style={{ fontSize: 10.5, color: 'rgba(26,20,16,0.7)', fontWeight: 600, marginTop: 1 }}>
              Earn 25% of your tier threshold each calendar year to keep your level.
            </div>
          </div>
        </div>
      </div>

      {/* Tiers in detail */}
      <div style={{ padding: '22px 20px 0' }}>
        <div className="label" style={{ fontSize: 9, color: 'var(--ink-4)', marginBottom: 8 }}>
          THE FOUR TIERS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TIER_ORDER.map(k => {
            const t = TIERS[k];
            return (
              <div key={k} style={{
                background: 'var(--card-2)', border: '1px solid var(--hairline)',
                borderRadius: 16, overflow: 'hidden',
              }}>
                <div style={{
                  padding: '14px 16px', background: t.cardBg, color: t.inkColor,
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.45 }}/>
                  <div style={{ position: 'relative' }}>
                    <div className="numeral" style={{ fontSize: 20, lineHeight: 1 }}>{t.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 3 }}>{t.signature}</div>
                  </div>
                  <div style={{ position: 'relative', textAlign: 'right' }}>
                    <div className="numeral" style={{ fontSize: 17, lineHeight: 1 }}>
                      {t.threshold === 0 ? 'Free' : t.threshold.toLocaleString()}
                    </div>
                    <div className="label" style={{ fontSize: 7, opacity: 0.55, marginTop: 3 }}>
                      {t.threshold === 0 ? 'TO JOIN' : 'BITES TO QUALIFY'}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '10px 16px 14px' }}>
                  {t.perks.filter(p => !p.startsWith('Everything')).map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 8,
                      padding: '6px 0', fontSize: 12, color: 'var(--ink-2)',
                    }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: t.color, marginTop: 7, flexShrink: 0 }}/>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'var(--red)', color: 'var(--paper)',
          padding: '18px 18px', borderRadius: 16,
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -28, right: -28, opacity: 0.1 }}>
            <OrnAdinkrahene size={140} color="var(--paper)"/>
          </div>
          <div className="numeral" style={{ fontSize: 22, lineHeight: 1.05, color: 'var(--paper)', position: 'relative' }}>
            Ready to start earning?
          </div>
          <div style={{ fontSize: 11.5, color: 'rgba(245,239,227,0.75)', marginTop: 6, position: 'relative' }}>
            Share your number at any Starbites till.
          </div>
          <div style={{ fontSize: 10, color: 'rgba(245,239,227,0.5)', marginTop: 12, fontStyle: 'italic', position: 'relative' }}>
            Yɛ da mo ase
          </div>
        </div>
      </div>
    </div>
  );
}
