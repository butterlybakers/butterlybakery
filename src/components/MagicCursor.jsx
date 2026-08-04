import React, { useEffect, useState } from 'react';

const MagicCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let particleId = 0;
    const addParticle = (x, y) => {
      if (Math.random() > 0.3) return; // Reduce particle density
      setParticles((prev) => [
        ...prev,
        { id: particleId++, x, y, size: Math.random() * 10 + 5, life: 1, angle: Math.random() * 360 }
      ]);
    };

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => 
        prev.map(p => ({ ...p, life: p.life - 0.05, y: p.y + 1 })).filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999999,
        fontSize: '2rem',
        filter: 'drop-shadow(0 0 10px rgba(249,160,63,0.8))'
      }}>
        🪄
      </div>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'fixed',
          top: p.y,
          left: p.x,
          width: p.size,
          height: p.size,
          background: 'radial-gradient(circle, #FFF8E7 0%, #F9A03F 100%)',
          borderRadius: '50%',
          opacity: p.life,
          transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
          pointerEvents: 'none',
          zIndex: 999998,
          boxShadow: '0 0 10px #F9A03F'
        }} />
      ))}
    </>
  );
};

export default MagicCursor;
