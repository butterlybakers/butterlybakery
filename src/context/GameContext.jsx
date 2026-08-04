import React, { createContext, useContext, useState } from 'react';
import Confetti from 'react-confetti';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [foundButterflies, setFoundButterflies] = useState([]);
  const [showSecret, setShowSecret] = useState(false);

  const totalButterflies = 3;

  const findButterfly = (id) => {
    if (!foundButterflies.includes(id)) {
      setFoundButterflies(prev => {
        const newFound = [...prev, id];
        if (newFound.length === totalButterflies) {
          setTimeout(() => setShowSecret(true), 500);
        }
        return newFound;
      });
      // Play a magical sound
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  };

  return (
    <GameContext.Provider value={{ foundButterflies, findButterfly, totalButterflies, showSecret, setShowSecret }}>
      {children}
      
      {/* Secret Reward Modal */}
      {showSecret && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999999, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', animation: 'fadeIn 1s ease' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={200} colors={['#F9A03F', '#FFF8E7', '#d4af37', '#ffffff']} />
          </div>
          
          <div style={{ background: 'var(--glass-bg)', border: '2px solid #d4af37', padding: '3rem', borderRadius: '20px', textAlign: 'center', maxWidth: '600px', zIndex: 1, boxShadow: '0 0 50px rgba(212,175,55,0.5)' }}>
            <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: '3rem', color: '#F9A03F', marginBottom: '1rem', textShadow: '0 0 20px rgba(249,160,63,0.8)' }}>
              Secret Unlocked! ✨
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#FFF8E7', marginBottom: '2rem', lineHeight: '1.6' }}>
              You have found all 3 golden butterflies! The fairies have granted you a secret magical discount.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '15px', border: '1px dashed #d4af37', display: 'inline-block', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '2rem', color: '#d4af37', letterSpacing: '5px' }}>FAIRYMAGIC50</span>
            </div>
            <p style={{ color: '#d4c5b0', marginBottom: '2rem' }}>Use this code on WhatsApp for 50% off your entire order!</p>
            <button className="btn" onClick={() => setShowSecret(false)} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '1rem 2rem' }}>
              Claim Magic
            </button>
          </div>
        </div>
      )}

      {/* Persistent Tracker */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 9999, boxShadow: '0 5px 15px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', color: 'var(--text-dark)', fontWeight: 'bold' }}>
        <span style={{ fontSize: '1.5rem' }}>🦋</span> 
        {foundButterflies.length} / {totalButterflies} Found
      </div>
    </GameContext.Provider>
  );
};
