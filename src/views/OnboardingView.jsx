import { useState } from 'react';

export default function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [giftRevealed, setGiftRevealed] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-[#1A1612] flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 kente-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(196,30,58,0.15) 0%, transparent 60%)',
      }} />

      <div className="relative w-full max-w-md mx-auto px-6">
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${
              i === step ? 'w-8 bg-[#C41E3A]' : i < step ? 'w-4 bg-[#C41E3A]/40' : 'w-4 bg-white/10'
            }`} />
          ))}
        </div>

        {/* Step 0: Akwaaba + Phone */}
        {step === 0 && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-[#C41E3A] mx-auto mb-6 flex items-center justify-center shadow-warm-lg">
              <span className="font-serif text-3xl text-white">S</span>
            </div>
            <h1 className="font-serif text-[32px] text-white leading-tight">
              Akwaaba!
            </h1>
            <p className="text-[15px] text-white/70 mt-2">Welcome to Starbites</p>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">
              Join Starbites Rewards. Earn bites,<br />unlock perks, get <span className="text-[#E0BC5A]">dashed</span> free treats.
            </p>

            <div className="mt-8">
              <label className="text-[12px] text-white/50 uppercase tracking-wider font-semibold text-left block mb-2 pl-1">
                Your phone number
              </label>
              <input
                type="tel"
                placeholder="024 XXX XXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.08] border border-white/[0.08] text-white text-[18px] text-center placeholder-white/20 focus:bg-white/[0.12] focus:border-[#C41E3A]/50 focus:outline-none transition-all font-mono tracking-widest"
              />
              <p className="text-[11px] text-white/30 mt-2">Scan your QR or share this number at any Starbites</p>
            </div>

            <button
              onClick={() => { if (phone.length >= 3) setStep(1); }}
              className={`mt-6 w-full py-4 rounded-2xl font-bold text-[14px] transition-all ${
                phone.length >= 3
                  ? 'bg-[#C41E3A] text-white active:scale-[0.97] shadow-warm-lg'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              Join the Family →
            </button>
          </div>
        )}

        {/* Step 1: Your Welcome Dash */}
        {step === 1 && (
          <div className="text-center animate-fade-in">
            {!giftRevealed ? (
              <>
                <div className="text-5xl mb-4 animate-slide-up">🎁</div>
                <h2 className="font-serif text-[28px] text-white">Your first dash!</h2>
                <p className="text-[14px] text-white/60 mt-2 leading-relaxed">
                  In Ghana we <span className="text-[#E0BC5A] font-semibold">dash</span> — give a little extra<br />to show we appreciate you.
                </p>
                <button
                  onClick={() => setGiftRevealed(true)}
                  className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#C8993E] to-[#E0BC5A] text-[#1A1612] font-bold text-[15px] active:scale-[0.97] shadow-warm-lg transition-all"
                >
                  Unwrap Your Dash ✨
                </button>
              </>
            ) : (
              <div className="animate-card-enter">
                <div className="bg-[#C41E3A] rounded-3xl p-6 shadow-warm-xl relative overflow-hidden">
                  <div className="absolute inset-0 kente-pattern opacity-10 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="text-6xl mb-3">🧃</div>
                    <h3 className="font-serif text-[24px] text-white">Free Juice!</h3>
                    <p className="text-[14px] text-white/80 mt-2 leading-relaxed">
                      Your welcome dash — redeem at<br />any Starbites location.
                    </p>
                    <p className="text-[13px] text-[#E0BC5A] font-bold mt-2">
                      + 100 bonus bites to start your journey
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/10">
                      <span className="font-mono text-white text-[14px] font-bold tracking-wider">SB-AKWAABA-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onComplete}
                  className="mt-6 w-full py-4 rounded-2xl bg-[#C41E3A] text-white font-bold text-[15px] active:scale-[0.97] shadow-warm-lg transition-all"
                >
                  Start Earning Points →
                </button>

                <p className="text-[11px] text-white/30 mt-3">
                  Yɛ da mo ase — We thank you for choosing Starbites
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
