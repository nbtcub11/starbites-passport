import { useEffect, useState } from 'react';

// CSS-only confetti burst — renders 30 particles that explode outward and fade
export default function Confetti({ trigger, duration = 2500 }) {
  const [active, setActive] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#C41E3A', '#C8993E', '#E0BC5A', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
      const newParticles = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: -(Math.random() * 400 + 100),
        rotation: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 200,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
      }));
      setParticles(newParticles);
      setActive(true);
      setTimeout(() => setActive(false), duration);
    }
  }, [trigger]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      <div className="absolute left-1/2 top-1/2">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute"
            style={{
              width: p.shape === 'circle' ? 8 * p.scale : 6 * p.scale,
              height: p.shape === 'circle' ? 8 * p.scale : 10 * p.scale,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              backgroundColor: p.color,
              left: 0,
              top: 0,
              animation: `confetti-fall ${1.5 + Math.random() * 1}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${p.delay}ms`,
              '--confetti-x': `${p.x}px`,
              '--confetti-y': `${p.y}px`,
              '--confetti-r': `${p.rotation}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
