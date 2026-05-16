import { useState } from 'react';
import { OrnAdinkrahene, OrnGyeNyame, OrnStar, OrnDuafe, OrnSankofa, MarkS, IconArrowRight, GlyphJuice } from '../components/Icons';

function OnboardingWelcome({ onNext }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 76, height: 76, borderRadius: 18, margin: '0 auto',
        background: 'linear-gradient(155deg, #B5172E, #7E0E1F)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(181,23,46,0.45)',
        border: '1.5px solid rgba(245,239,227,0.18)',
      }}>
        <MarkS size={42} color="var(--paper)"/>
      </div>
      <div className="numeral" style={{ fontSize: 48, lineHeight: 1, marginTop: 24, color: 'var(--paper)' }}>
        Akwaaba.
      </div>
      <div style={{ fontSize: 14, color: 'rgba(245,239,227,0.72)', marginTop: 10, lineHeight: 1.5 }}>
        Welcome to Starbites — Ghana's most generous loyalty programme.
      </div>
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
        {[
          { Ico: OrnStar, t: 'Earn stars on every order', d: 'In-store, takeaway, or delivery' },
          { Ico: OrnDuafe, t: 'Unlock perks as you grow', d: 'Free items, discounts, deliveries' },
          { Ico: OrnSankofa, t: 'Dash a friend, earn together', d: '200 stars each on their first visit' },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: 12, borderRadius: 12,
            background: 'rgba(245,239,227,0.05)',
            border: '1px solid rgba(245,239,227,0.08)',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9,
              background: 'rgba(220,182,107,0.15)', border: '1px solid rgba(220,182,107,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <row.Ico size={20} color="var(--gold-light)"/>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{row.t}</div>
              <div style={{ fontSize: 11, color: 'rgba(245,239,227,0.6)', marginTop: 1 }}>{row.d}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onNext} style={{
        marginTop: 32, width: '100%', padding: 16, borderRadius: 100,
        background: 'var(--paper)', color: 'var(--ink)', border: 'none',
        fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        Let's begin <IconArrowRight size={15} color="var(--ink)"/>
      </button>
    </div>
  );
}

function OnboardingPhone({ phone, setPhone, onNext }) {
  return (
    <div>
      <div className="label" style={{ fontSize: 9, color: 'var(--gold-light)', letterSpacing: '0.32em', textAlign: 'center' }}>
        STEP 02 · YOUR NUMBER
      </div>
      <div className="numeral" style={{ fontSize: 34, lineHeight: 1.05, marginTop: 10, color: 'var(--paper)', textAlign: 'center' }}>
        How shall we<br/>find you?
      </div>
      <div style={{ fontSize: 13, color: 'rgba(245,239,227,0.65)', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
        Share the number you'll bring to the till. We'll find you instantly.
      </div>

      <div style={{ marginTop: 28 }}>
        <div className="label" style={{ fontSize: 9, color: 'rgba(245,239,227,0.5)', marginBottom: 10 }}>
          PHONE NUMBER
        </div>
        <input
          type="tel"
          placeholder="024 000 0000"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{
            width: '100%', padding: '18px 18px', borderRadius: 14,
            background: 'rgba(245,239,227,0.08)',
            border: '1px solid rgba(245,239,227,0.12)',
            color: 'var(--paper)', fontFamily: 'var(--font-mono)',
            fontSize: 20, letterSpacing: '0.15em',
            outline: 'none', textAlign: 'center',
          }}
        />
        <div style={{ fontSize: 10.5, color: 'rgba(245,239,227,0.4)', marginTop: 10, textAlign: 'center' }}>
          Or scan the QR on your passport at any till
        </div>
      </div>

      <button onClick={() => phone.replace(/\D/g, '').length >= 3 && onNext()} style={{
        marginTop: 32, width: '100%', padding: 16, borderRadius: 100,
        background: phone.replace(/\D/g, '').length >= 3 ? 'var(--paper)' : 'rgba(245,239,227,0.12)',
        color: phone.replace(/\D/g, '').length >= 3 ? 'var(--ink)' : 'rgba(245,239,227,0.3)',
        border: 'none', fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: phone.replace(/\D/g, '').length >= 3 ? 'pointer' : 'not-allowed',
      }}>
        Join the family <IconArrowRight size={15} color={phone.replace(/\D/g, '').length >= 3 ? 'var(--ink)' : 'rgba(245,239,227,0.3)'}/>
      </button>
    </div>
  );
}

function OnboardingGift({ revealed, onReveal, onComplete }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {!revealed ? (
        <>
          <div style={{
            width: 120, height: 120, margin: '40px auto 0', borderRadius: 24,
            background: 'linear-gradient(155deg, #DCB66B, #B8893A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(184,137,58,0.5)',
          }}>
            <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}/>
            <OrnGyeNyame size={56} color="var(--paper)"/>
          </div>
          <div className="numeral" style={{ fontSize: 30, marginTop: 28, color: 'var(--paper)', lineHeight: 1.05 }}>
            Your welcome dash.
          </div>
          <div style={{ fontSize: 13, color: 'rgba(245,239,227,0.65)', marginTop: 12, lineHeight: 1.5 }}>
            In Ghana, we <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>dash</span> — give a little extra to show we appreciate you. Here's yours.
          </div>
          <button onClick={onReveal} style={{
            marginTop: 32, width: '100%', padding: 16, borderRadius: 100,
            background: 'linear-gradient(105deg, #DCB66B, #B8893A)',
            color: '#1A1410', border: 'none',
            fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
          }}>
            Unwrap your dash
          </button>
        </>
      ) : (
        <>
          <div style={{
            background: 'linear-gradient(155deg, #C8273E 0%, #B5172E 28%, #7E0E1F 70%)',
            borderRadius: 22, padding: 24, position: 'relative', overflow: 'hidden',
            color: 'var(--paper)', textAlign: 'center',
            boxShadow: '0 20px 50px rgba(20,17,13,0.5)',
            marginTop: 20,
          }}>
            <div className="foil-stripes" style={{ position: 'absolute', inset: 0, opacity: 0.45 }}/>
            <div style={{ position: 'absolute', top: -28, right: -28, opacity: 0.12 }}>
              <OrnAdinkrahene size={140} color="var(--paper)"/>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="label" style={{ fontSize: 8.5, color: 'var(--gold-light)', letterSpacing: '0.4em' }}>
                YOUR WELCOME DASH
              </div>
              <div style={{
                width: 64, height: 64, borderRadius: 14, margin: '14px auto 14px',
                background: 'rgba(245,239,227,0.14)',
                border: '1px solid rgba(245,239,227,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <GlyphJuice size={36} color="var(--gold-light)"/>
              </div>
              <div className="numeral" style={{ fontSize: 28, lineHeight: 1.05 }}>
                Free fresh juice<br/>+ 100 stars
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,239,227,0.7)', marginTop: 10, lineHeight: 1.4 }}>
                Redeem at any Starbites — pineapple, orange, or hibiscus.
              </div>
              <div style={{
                marginTop: 16, padding: '10px 14px',
                background: 'rgba(0,0,0,0.28)', borderRadius: 10,
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
                color: 'var(--gold-light)',
              }}>
                SB·AKWAABA·{(Math.floor(Math.random()*9000)+1000)}
              </div>
            </div>
          </div>
          <button onClick={onComplete} style={{
            marginTop: 24, width: '100%', padding: 16, borderRadius: 100,
            background: 'var(--paper)', color: 'var(--ink)', border: 'none',
            fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Start earning <IconArrowRight size={15} color="var(--ink)"/>
          </button>
          <div style={{ fontSize: 10, color: 'rgba(245,239,227,0.4)', marginTop: 14, fontStyle: 'italic' }}>
            Yɛ da mo ase · We thank you for choosing Starbites
          </div>
        </>
      )}
    </div>
  );
}

export default function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'linear-gradient(165deg, #1A1410 0%, #2A1812 55%, #B5172E 100%)',
      color: 'var(--paper)',
      overflow: 'auto',
      paddingTop: 60,
      paddingBottom: 40,
    }}>
      {/* Adinkra watermark */}
      <div style={{ position: 'absolute', top: 40, right: -50, opacity: 0.07 }}>
        <OrnAdinkrahene size={280} color="var(--paper)"/>
      </div>
      <div style={{ position: 'absolute', bottom: -40, left: -40, opacity: 0.05 }}>
        <OrnGyeNyame size={240} color="var(--paper)"/>
      </div>

      <div style={{ position: 'relative', padding: '0 28px', maxWidth: 360, margin: '0 auto' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 32 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              height: 3, width: i === step ? 28 : 14, borderRadius: 2,
              background: i <= step ? 'var(--gold-light)' : 'rgba(245,239,227,0.18)',
              transition: 'all 0.4s',
            }}/>
          ))}
        </div>

        {step === 0 && <OnboardingWelcome onNext={() => setStep(1)}/>}
        {step === 1 && <OnboardingPhone phone={phone} setPhone={setPhone} onNext={() => setStep(2)}/>}
        {step === 2 && <OnboardingGift revealed={revealed} onReveal={() => setRevealed(true)} onComplete={onComplete}/>}

        {step > 0 && step < 2 && (
          <button onClick={() => setStep(step - 1)} style={{
            position: 'absolute', top: -50, left: 24,
            background: 'transparent', border: 'none', color: 'rgba(245,239,227,0.5)',
            fontSize: 12, fontWeight: 600,
          }}>← Back</button>
        )}
        <button onClick={onComplete} style={{
          position: 'absolute', top: -50, right: 24,
          background: 'transparent', border: 'none', color: 'rgba(245,239,227,0.4)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
        }}>Skip</button>
      </div>
    </div>
  );
}
