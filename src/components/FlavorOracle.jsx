import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const moods = [
  {
    id: 'dreamy',
    label: 'Dreamy & Romantic ✨',
    desc: 'Whispers of rose, vanilla & delicate fruit',
    color: '#d4af37',
    tarotTitle: '• THE BLOSSOM OF DREAMS •',
    product: {
      id: 'p4',
      name: 'Macaron Box (6 pcs)',
      price: 450,
      description: 'A beautiful assortment of our delicate, melt-in-your-mouth macarons. Comes in various magical flavors.',
      image: '/images/macarons_1785271892400.png',
      spell: 'Charm of the Floating Flower'
    }
  },
  {
    id: 'bold',
    label: 'Bold & Decadent 🔥',
    desc: 'Deep cocoa, coconut crunch & rich ganache',
    color: '#8b4513',
    tarotTitle: '• THE SOVEREIGN OF COCOA •',
    product: {
      id: 'p1',
      name: 'Chocolate Truffle Cake',
      price: 150,
      description: 'Decadent, rich, and utterly irresistible. Our signature chocolate experience with a delicate coconut crunch.',
      image: '/images/truffle_cake_1785271864770.png',
      spell: 'Spell of Eternal Indulgence'
    }
  },
  {
    id: 'cozy',
    label: 'Cozy & Comforting 🌧️',
    desc: 'Soft sponge soaked in three kinds of cream',
    color: '#234E41',
    tarotTitle: '• THE WARM HEARTH •',
    product: {
      id: 'p3',
      name: 'Classic Tres Leches',
      price: 180,
      description: 'A light, airy sponge cake soaked in three kinds of milk. The ultimate melt-in-your-mouth experience.',
      image: '/images/tres_leches_1785271883022.png',
      spell: 'The Cloud of Sweet Nectar'
    }
  },
  {
    id: 'midnight',
    label: 'Midnight Magic 🌙',
    desc: 'Savory-sweet cream cheese & garlic butter bun',
    color: '#6a5acd',
    tarotTitle: '• THE MOONLIGHT ELIXIR •',
    product: {
      id: 'p2',
      name: 'Korean Cream Cheese Bun',
      price: 120,
      description: 'Soft, fluffy, and filled with creamy, buttery garlic goodness. A savory-sweet masterpiece.',
      image: '/images/cream_bun_1785271874235.png',
      spell: 'Enchantment of Morning Warmth'
    }
  }
];

const FlavorOracle = () => {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const { addToCart } = useCart();

  const handleSelectMood = (mood) => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=magic-wand-6214.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    setIsFlipped(false);
    setTimeout(() => {
      setSelectedMood(mood);
      setIsFlipped(true);
    }, 200);
  };

  const handleCastToCart = () => {
    addToCart(selectedMood.product);
    toast.success(`✨ ${selectedMood.product.name} summoned to your cart!`, {
      icon: '🦋',
      style: {
        background: '#4a2e12',
        color: '#f5d070',
        border: '1px solid #c8a86a',
        fontFamily: '"Cinzel", serif'
      }
    });
  };

  return (
    <section className="section-container" style={{ margin: '3rem auto 5rem', position: 'relative' }}>
      <div
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,46,18,0.95) 0%, rgba(45,26,8,0.98) 100%)',
          border: '2px solid #c8a86a',
          borderRadius: '0',
          padding: '3rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 10px rgba(212,175,55,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
        data-aos="fade-up"
      >
        {/* Decorative corner runes */}
        <div style={{ position: 'absolute', top: 15, left: 20, fontSize: '2rem', color: '#d4af37', opacity: 0.6 }}>❧</div>
        <div style={{ position: 'absolute', top: 15, right: 20, fontSize: '2rem', color: '#d4af37', opacity: 0.6, transform: 'scaleX(-1)' }}>❧</div>
        <div style={{ position: 'absolute', bottom: 15, left: 20, fontSize: '2rem', color: '#d4af37', opacity: 0.6, transform: 'scaleY(-1)' }}>❧</div>
        <div style={{ position: 'absolute', bottom: 15, right: 20, fontSize: '2rem', color: '#d4af37', opacity: 0.6, transform: 'scale(-1)' }}>❧</div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.85rem', color: '#d4af37', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            ✦ Interactive Mood &amp; Pastry Oracle ✦
          </p>
          <h2 style={{
            fontFamily: '"Cinzel", serif',
            fontSize: '2.4rem',
            color: '#FFF8E7',
            textShadow: '0 0 20px rgba(212,175,55,0.6)',
            marginBottom: '0.6rem'
          }}>
            The Flavor Oracle
          </h2>
          <p style={{ color: '#e0ceaa', fontStyle: 'italic', fontSize: '1rem', opacity: 0.85, maxWidth: '560px', margin: '0 auto' }}>
            Whisper your current mood to the Enchanted Grimoire to reveal your destined confection...
          </p>
        </div>

        {/* Grid layout: Left Mood Selector / Right Tarot Reveal Card */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Mood Buttons List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minWidth: '260px', maxWidth: '380px' }}>
            {moods.map((mood) => {
              const isSelected = selectedMood.id === mood.id;
              return (
                <motion.button
                  key={mood.id}
                  onClick={() => handleSelectMood(mood)}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '1rem 1.4rem',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(139,69,19,0.4))'
                      : 'rgba(255,255,255,0.05)',
                    border: isSelected ? '2px solid #d4af37' : '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '0',
                    color: '#FFF8E7',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: isSelected ? '0 0 20px rgba(212,175,55,0.3)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontFamily: '"Cinzel", serif', fontSize: '1.15rem', fontWeight: 700, color: isSelected ? '#f5d070' : '#FFF8E7', marginBottom: '0.2rem' }}>
                    {mood.label}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#e0ceaa', opacity: 0.75 }}>
                    {mood.desc}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* 3D Animated Tarot Card */}
          <div style={{ perspective: 1200, display: 'flex', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotateY: isFlipped ? 360 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                width: '320px',
                height: '460px',
                position: 'relative',
                transformStyle: 'preserve-3d',
                borderRadius: '0',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.2)'
              }}
            >
              {/* Card Face (Revealed Tarot Pastry Card) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(145deg, #fefaf0 0%, #ede0c2 100%)',
                border: '3px solid #c8a86a',
                borderRadius: '0',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                backfaceVisibility: 'hidden'
              }}>
                {/* Top Tarot Title */}
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', color: '#8b4513', letterSpacing: '3px', fontWeight: 800 }}>
                    {selectedMood.tarotTitle}
                  </p>
                  <div style={{ width: '40px', height: '2px', background: '#c8a86a', margin: '0.4rem auto 0' }} />
                </div>

                {/* Illustrated Pastry Image */}
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundImage: `url(${selectedMood.product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '0',
                  border: '2px solid #c8a86a',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  position: 'relative'
                }} />

                {/* Product Name & Description */}
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.25rem', color: '#1a0a00', fontWeight: 800, marginBottom: '0.4rem' }}>
                    {selectedMood.product.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#3a1e06', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                    &ldquo;{selectedMood.product.description}&rdquo;
                  </p>
                  <span style={{ fontFamily: '"Cinzel", serif', fontSize: '1.3rem', fontWeight: 900, color: '#5a2000' }}>
                    ₹{selectedMood.product.price}
                  </span>
                </div>

                {/* Cast to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCastToCart}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #8b4513, #5a2d00)',
                    color: '#f5d070',
                    border: '1.5px solid #c8a86a',
                    borderRadius: '0',
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Cast to Cart ✦</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlavorOracle;
