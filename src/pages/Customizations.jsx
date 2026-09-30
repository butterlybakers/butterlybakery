import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../config';

const steps = [
  {
    title: 'Choose Your Flavor',
    options: [
      { id: 'pineapple', label: 'Pineapple', desc: 'Classic pineapple flavor' },
      { id: 'blackforest', label: 'Black Forest', desc: 'Rich chocolate and cherries' },
      { id: 'whiteforest', label: 'White Forest', desc: 'White chocolate and cherries' },
      { id: 'mango', label: 'Mango', desc: 'Fresh tropical mango' },
      { id: 'strawberry', label: 'Strawberry', desc: 'Sweet fresh strawberries' },
      { id: 'caramelbutterscotch', label: 'Caramel Butterscotch', desc: 'Golden caramel crunch' },
      { id: 'redvelvet', label: 'Red Velvet', desc: 'Classic red velvet' },
      { id: 'vanilla', label: 'Vanilla', desc: 'Classic vanilla' },
      { id: 'vancho', label: 'Vancho', desc: 'Vanilla and chocolate blend' },
      { id: 'blueberry', label: 'Blueberry', desc: 'Sweet wild blueberries' },
      { id: 'oreochocolate', label: 'Oreo Chocolate', desc: 'Crushed Oreos in chocolate' },
      { id: 'irishcoffee', label: 'Irish Coffee', desc: 'Rich coffee flavor' },
      { id: 'chocostrawberry', label: 'Choco Strawberry', desc: 'Chocolate with strawberries' },
      { id: 'chocolatetruffle', label: 'Chocolate Truffle', desc: 'Dense chocolate ganache' },
      { id: 'freshmango', label: 'Fresh Mango', desc: 'Made with real mango pieces' },
      { id: 'belgiumtruffle', label: 'Belgium Truffle', desc: 'Premium Belgian chocolate' },
      { id: 'rasmalai', label: 'Rasmalai', desc: 'Indian fusion delight' },
      { id: 'biscoff', label: 'Biscoff', desc: 'Lotus Biscoff cookie flavor' },
      { id: 'chocohazelnut', label: 'Choco Hazelnut', desc: 'Chocolate and roasted hazelnuts' },
      { id: 'russianhoney', label: 'Russian Honey', desc: 'Layers of honey and cream' }
    ]
  },
  {
    title: 'Pick Your Frosting',
    options: [
      { id: 'buttercream', label: 'Buttercream', desc: 'Classic smooth & silky' },
      { id: 'ganache', label: 'Dark Ganache', desc: 'Deep, glossy chocolate glaze' },
      { id: 'creamcheese', label: 'Cream Cheese', desc: 'Tangy, dreamy & light' },
      { id: 'whipped', label: 'Whipped Cream', desc: 'Light as clouds, naturally sweet' },
      { id: 'caramel', label: 'Salted Caramel', desc: 'Rich buttery caramel with sea salt' },
      { id: 'matchawhite', label: 'White Chocolate Matcha', desc: 'Creamy white chocolate with matcha' },
    ]
  },
  {
    title: 'Select Your Size',
    options: [
      { id: 'small', label: '500g', desc: 'Perfect for 4 people', price: 350 },
      { id: 'medium', label: '1 kg', desc: 'Ideal for 8 people', price: 650 },
      { id: 'pair', label: '1.5 kg', desc: 'Great for 12 people', price: 950 },
      { id: 'large', label: '2 kg', desc: 'Perfect for 16 people', price: 1200 },
      { id: 'tiered', label: '3-Tier', desc: 'Centerpiece for 30+ guests', price: 2800 },
      { id: 'sovereign', label: '5-Tier', desc: 'Grand centerpiece for 50+', price: 4500 },
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

    const text = `Hi Butterly Bakery! I'd like to order a Custom Cake.\n\nFlavor: ${base}\nFrosting: ${frosting}\nSize: ${size}\nEstimated Price: ₹${price}\n\n${message ? `Special Request: "${message}"\n\n` : ''}Please confirm my order!`;
    
    setSent(true);
    setTimeout(() => {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    }, 1000);
  };

  const allSelected = Object.keys(selections).length === steps.length;
  const currentPrice = selections[2]?.price;

  return (
    <>
      <Helmet>
        <title>Custom Cakes | Butterly Bakery</title>
        <meta name="description" content="Build your own custom cake at Butterly Bakery. Choose your flavor, frosting, and size for your perfect celebration." />
      </Helmet>
      <section className="section-container" style={{ paddingTop: '3rem', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-tag" data-aos="fade-up">Build Your Own</span>
        <h1 className="section-title" data-aos="fade-up">Custom Cake Builder</h1>
        <p className="section-subtitle" data-aos="fade-up">
          Tell us your preference and we'll bake it to perfection.
        </p>
      </div>

      {/* Step Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <div 
              onClick={() => setCurrentStep(i)} 
              style={{ 
                width: '44px', 
                height: '44px', 
                borderRadius: '50%', 
                background: i === currentStep ? 'var(--primary)' : selections[i] ? 'var(--primary-light)' : 'var(--bg-warm)', 
                border: `2px solid ${i === currentStep ? 'var(--primary)' : selections[i] ? 'var(--primary-light)' : 'var(--border-light)'}`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                color: (i === currentStep || selections[i]) ? 'var(--text-light)' : 'var(--text-muted)'
              }}
            >
              {selections[i] ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>Step {i + 1}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Main Step */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
                {steps[currentStep].title}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {steps[currentStep].options.map((opt) => {
                  const isSelected = selections[currentStep]?.id === opt.id;
                  return (
                    <div 
                      key={opt.id} 
                      onClick={() => select(currentStep, opt)} 
                      style={{ 
                        background: isSelected ? 'var(--primary)' : 'var(--bg-card)', 
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-card)'}`, 
                        borderRadius: 'var(--radius-md)', 
                        padding: '1.25rem', 
                        cursor: 'pointer', 
                        transition: 'all 0.25s ease',
                        color: isSelected ? 'var(--text-light)' : 'var(--text-dark)',
                        boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                      }}
                    >
                      <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.92rem' }}>{opt.label}</h4>
                      <p style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.4 }}>{opt.desc}</p>
                      {opt.price && <p style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '0.9rem' }}>₹{opt.price}</p>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            {currentStep > 0 && (
              <button className="btn btn-secondary" onClick={prev} style={{ padding: '10px 24px' }}>← Back</button>
            )}
            {currentStep < steps.length - 1 && (
              <button className="btn btn-primary" onClick={next} disabled={!selections[currentStep]} style={{ padding: '10px 24px', opacity: selections[currentStep] ? 1 : 0.5 }}>Continue →</button>
            )}
          </div>
        </div>

        {/* Live Summary */}
        <div style={{ flex: 1, minWidth: '260px', position: 'sticky', top: '90px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              Order Summary
            </h3>
            {steps.map((s, i) => (
              <div key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: selections[i] ? 'var(--primary-pale)' : 'var(--bg-warm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 600, color: selections[i] ? 'var(--primary)' : 'var(--text-muted)',
                  flexShrink: 0
                }}>
                  {selections[i] ? '✓' : i + 1}
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.1rem', fontWeight: 500 }}>Step {i + 1}: {s.title}</p>
                  <p style={{ fontWeight: 600, color: selections[i] ? 'var(--text-dark)' : 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {selections[i]?.label || 'Not selected'}
                  </p>
                </div>
              </div>
            ))}
            {currentPrice && (
              <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', marginTop: '1.25rem', color: 'var(--text-light)' }}>
                <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>Estimated Price</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>₹{currentPrice}</p>
              </div>
            )}
            {allSelected && (
              <div style={{ marginTop: '1.25rem' }}>
                <textarea
                  placeholder="Any special request? (decoration, message on cake, etc.)"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-light)', background: 'var(--bg-warm)', color: 'var(--text-dark)', fontSize: '0.88rem', resize: 'vertical', marginBottom: '0.75rem', fontFamily: 'inherit' }}
                />
                <button className="btn" onClick={handleOrder} style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', fontSize: '0.92rem', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  {sent ? 'Opening WhatsApp...' : 'Order via WhatsApp'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Customizations;
