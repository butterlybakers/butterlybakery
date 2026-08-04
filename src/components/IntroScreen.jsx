import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const storyLines = [
  "Once upon a time in Bangalore...",
  "In a small, quiet corner of the city...",
  "Magic was being baked into every crust...",
  "Welcome to Butterly Bakery."
];

const IntroScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < storyLines.length - 1) {
      const timer = setTimeout(() => {
        setLineIndex(prev => prev + 1);
      }, 3000); // Show each line for 3 seconds
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 1500); // Wait for fade out animation
      }, 3000);
      return () => clearTimeout(finalTimer);
    }
  }, [lineIndex, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
          }}
        >
          <button 
            onClick={() => { setIsVisible(false); onComplete(); }}
            style={{ position: 'absolute', bottom: '30px', right: '40px', background: 'transparent', color: 'rgba(249, 160, 63, 0.7)', border: '1px solid rgba(249, 160, 63, 0.5)', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', zIndex: 100, fontSize: '1.2rem', fontFamily: '"Cinzel", serif', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F9A03F'; e.currentTarget.style.borderColor = '#F9A03F'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(249, 160, 63, 0.7)'; e.currentTarget.style.borderColor = 'rgba(249, 160, 63, 0.5)'; }}
          >
            Skip Story
          </button>
          <AnimatePresence mode="wait">
            <motion.h1
              key={lineIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                color: '#F9A03F',
                fontFamily: '"Cinzel", serif',
                fontSize: '3rem',
                textAlign: 'center',
                textShadow: '0 0 30px rgba(249, 160, 63, 0.8)',
                padding: '0 2rem'
              }}
            >
              {storyLines[lineIndex]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
