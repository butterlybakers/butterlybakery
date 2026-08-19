import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Chapter 1: Choose Your Base',
    emoji: '🎂',
    options: [
      { id: 'pineapple', label: 'Pineapple', desc: 'Classic pineapple flavor', icon: '🍍' },
      { id: 'blackforest', label: 'Black Forest', desc: 'Rich chocolate and cherries', icon: '🍒' },
      { id: 'whiteforest', label: 'White Forest', desc: 'White chocolate and cherries', icon: '❄️' },
      { id: 'mango', label: 'Mango', desc: 'Fresh tropical mango', icon: '🥭' },
      { id: 'strawberry', label: 'Strawberry', desc: 'Sweet fresh strawberries', icon: '🍓' },
      { id: 'caramelbutterscotch', label: 'Caramel Butterscotch', desc: 'Golden caramel crunch', icon: '🍮' },
      { id: 'redvelvet', label: 'Red Velvet', desc: 'Classic red velvet', icon: '❤️' },
      { id: 'vanilla', label: 'Vanilla', desc: 'Classic vanilla', icon: '🤍' },
      { id: 'vancho', label: 'Vancho', desc: 'Vanilla and chocolate mix', icon: '🌗' },
      { id: 'blueberry', label: 'Blueberry', desc: 'Sweet wild blueberries', icon: '🫐' },
      { id: 'oreochocolate', label: 'Oreo Chocolate', desc: 'Crushed Oreos in chocolate', icon: '🍪' },
      { id: 'irishcoffee', label: 'Irish Coffee', desc: 'Rich coffee flavor', icon: '☕' },
      { id: 'chocostrawberry', label: 'Choco Strawberry', desc: 'Chocolate with strawberries', icon: '🍫' },
      { id: 'chocolatetruffle', label: 'Chocolate Truffle', desc: 'Dense chocolate ganache', icon: '🍩' },
      { id: 'freshmango', label: 'Fresh Mango', desc: 'Made with real mango pieces', icon: '🌅' },
      { id: 'belgiumtruffle', label: 'Belgium Truffle', desc: 'Premium Belgian chocolate', icon: '🧁' },
      { id: 'rasmalai', label: 'Rasmalai', desc: 'Indian fusion delight', icon: '🏵️' },
      { id: 'biscoff', label: 'Biscoff', desc: 'Lotus Biscoff cookie flavor', icon: '🥨' },
      { id: 'chocohazelnut', label: 'Choco Hazelnut', desc: 'Chocolate and roasted hazelnuts', icon: '🌰' },
      { id: 'russianhoney', label: 'Russian Honey Cake', desc: 'Layers of honey and cream', icon: '🍯' }
    ]
  },
  {
    title: 'Chapter 2: Pick Your Frosting',
    emoji: '🧁',
    options: [
      { id: 'buttercream', label: 'Buttercream Spell', desc: 'Classic smooth & silky', icon: '🌸' },
      { id: 'ganache', label: 'Dark Ganache Potion', desc: 'Deep, glossy chocolate glaze', icon: '🌑' },
      { id: 'creamcheese', label: 'Cream Cheese Enchantment', desc: 'Tangy, dreamy & light', icon: '🤍' },
      { id: 'whipped', label: 'Fairy Whipped Cream', desc: 'Light as clouds, sweet as dreams', icon: '🧚' },
      { id: 'caramel', label: 'Salted Caramel Elixir', desc: 'Rich buttery caramel with a sea salt kiss', icon: '🍯' },
      { id: 'matchawhite', label: 'White Chocolate Matcha Mist', desc: 'Creamy white chocolate with earthy matcha', icon: '🍵' },
    ]
  },
  {
    title: 'Chapter 3: Your Celebration Size',
    emoji: '🎉',
    options: [
      { id: 'small', label: 'The Tiny Spell', desc: '500g — Perfect for 4 people', icon: '🌱', price: 350 },
      { id: 'medium', label: 'The Grand Wish', desc: '1 kg — Ideal for 8 people', icon: '⭐', price: 650 },
      { id: 'pair', label: 'The Enchanted Feast', desc: '1.5 kg — Perfect for 12 people', icon: '🌙', price: 950 },
      { id: 'large', label: 'The Royal Banquet', desc: '2 kg — Perfect for 16 people', icon: '👑', price: 1200 },
      { id: 'tiered', label: 'The Fairy Tale Tier', desc: '3-tier masterpiece for 30+', icon: '🏰', price: 2800 },
      { id: 'sovereign', label: 'The Sovereign Tower', desc: '5-tier grand centerpiece for 50+', icon: '🌟', price: 4500 },
    ]
  },
];

const Customizations = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const select = (stepIndex, option) => {
    setSelections(prev => ({ ...prev, [stepIndex]: option }));
  };

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const handleOrder = () => {
    const base = selections[0]?.label || 'Not selected';
    const frosting = selections[1]?.label || 'Not selected';
    const size = selections[2]?.label || 'Not selected';
    const price = selections[2]?.price || '?';

    const text = `Hi Butterly Bakery! 🎂 I'd like to order a Custom Cake!\n\n🍰 Base: ${base}\n🎀 Frosting: ${frosting}\n📏 Size: ${size}\n💰 Estimated Price: ₹${price}\n\n${message ? `📝 Special Message: "${message}"\n\n` : ''}Please confirm my order! ✨`;
    
    setSent(true);
    setTimeout(() => {
      window.location.href = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    }, 1000);
  };

  const allSelected = Object.keys(selections).length === steps.length;
  const currentPrice = selections[2]?.price;

  return (
    <section className="section-container" style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <h1 className="section-title" data-aos="fade-down" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Your Customization</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-dark)', opacity: 0.7, marginBottom: '3rem', fontSize: '1.1rem' }}>
        Tell us your dream and we will bake it into reality ✨
      </p>

      {/* Step Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div onClick={() => setCurrentStep(i)} style={{ width: '48px', height: '48px', borderRadius: '50%', background: i === currentStep ? 'var(--primary)' : selections[i] ? 'var(--secondary)' : 'var(--glass-bg)', border: `2px solid ${i === currentStep ? 'var(--primary)' : selections[i] ? 'var(--secondary)' : 'var(--glass-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: i === currentStep ? '0 0 20px rgba(249,160,63,0.5)' : 'none' }}>
              {selections[i] ? '✓' : s.emoji}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dark)', opacity: 0.6 }}>Step {i + 1}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Main Step */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <h2 style={{ fontFamily: '"Cinzel", serif', color: 'var(--secondary)', marginBottom: '2rem', fontSize: '1.6rem' }}>
                {steps[currentStep].title}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {steps[currentStep].options.map((opt) => {
                  const isSelected = selections[currentStep]?.id === opt.id;
                  return (
                    <div key={opt.id} onClick={() => select(currentStep, opt)} style={{ background: isSelected ? 'var(--primary)' : 'var(--glass-bg)', border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--glass-border)'}`, borderRadius: '0', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s ease', transform: isSelected ? 'scale(1.03)' : 'scale(1)', boxShadow: isSelected ? '0 10px 30px rgba(249,160,63,0.3)' : '0 2px 10px rgba(0,0,0,0.05)', color: isSelected ? 'white' : 'var(--text-dark)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{opt.icon}</div>
                      <h4 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{opt.label}</h4>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>{opt.desc}</p>
                      {opt.price && <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>From ₹{opt.price}</p>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {currentStep > 0 && (
              <button className="btn" onClick={prev} style={{ background: 'transparent', border: '2px solid var(--secondary)', color: 'var(--secondary)' }}>← Back</button>
            )}
            {currentStep < steps.length - 1 && (
              <button className="btn" onClick={next} disabled={!selections[currentStep]}>Continue →</button>
            )}
          </div>
        </div>

        {/* Live Summary */}
        <div style={{ flex: 1, minWidth: '260px', position: 'sticky', top: '120px' }}>
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '0', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontFamily: '"Cinzel", serif', color: 'var(--secondary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
              🧁 Your Order Summary
            </h3>
            {steps.map((s, i) => (
              <div key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{s.emoji}</span>
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.1rem' }}>Step {i + 1}</p>
                  <p style={{ fontWeight: 600, color: selections[i] ? 'var(--secondary)' : 'var(--text-dark)', opacity: selections[i] ? 1 : 0.4 }}>
                    {selections[i]?.label || 'Not chosen yet...'}
                  </p>
                </div>
              </div>
            ))}
            {currentPrice && (
              <div style={{ background: 'var(--primary)', borderRadius: '0', padding: '1rem', textAlign: 'center', marginTop: '1.5rem', color: 'white' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Estimated Price</p>
                <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: '"Cinzel", serif' }}>₹{currentPrice}</p>
              </div>
            )}
            {allSelected && (
              <div style={{ marginTop: '1.5rem' }}>
                <textarea
                  placeholder="Any special message or decoration request? 🎀"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '0', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-dark)', fontSize: '0.9rem', resize: 'vertical', marginBottom: '1rem' }}
                />
                <button className="btn" onClick={handleOrder} style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', fontSize: '1rem', padding: '1rem' }}>
                  {sent ? '✨ Opening WhatsApp...' : '🛒 Order on WhatsApp'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customizations;
