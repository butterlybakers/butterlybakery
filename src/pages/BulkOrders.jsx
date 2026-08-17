import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const eventTypes = [
  { id: 'corporate', label: 'Corporate Events', icon: '🏢', desc: 'Team celebrations, product launches, client appreciation events.', color: '#234E41', items: ['Customized branding on packaging', 'Minimum 50 pieces', 'Timely delivery guaranteed', 'Bulk pricing available'] },
  { id: 'wedding', label: 'Weddings', icon: '💍', desc: 'Tiered wedding cakes, dessert tables, favors for your special day.', color: '#8b4513', items: ['Multi-tiered custom designs', 'Matching wedding theme', 'Tasting session included', 'Delivery & setup included'] },
  { id: 'birthday', label: 'Birthday Parties', icon: '🎂', desc: 'Grand cakes and sweet treats to celebrate another magical year.', color: '#6a5acd', items: ['Custom designs & characters', 'Name & age decoration', 'Mini cupcake boxes for guests', 'Same-day baking available'] },
  { id: 'festival', label: 'Festivals & Pooja', icon: '🪔', desc: 'Festive sweets, dry cakes, and gift boxes for every occasion.', color: '#d4af37', items: ['Festive packaging', 'Bulk quantity pricing', 'Customized gift boxes', 'Corporate gifting supported'] },
];

const BulkOrders = () => {
  const [selected, setSelected] = useState(null);
  const [inquiryType, setInquiryType] = useState('book'); // 'book' | 'question'
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Corporate Events',
    quantity: 100,
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const getDiscountTier = (qty) => {
    const n = Number(qty);
    if (n >= 500) return '25% OFF (Grand Event Tier ✨)';
    if (n >= 200) return '20% OFF (Royal Feast Tier 👑)';
    if (n >= 100) return '15% OFF (Celebration Tier 🎉)';
    if (n >= 50) return '10% OFF (Gathering Tier 🌿)';
    return 'Standard Bulk Pricing';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const discount = getDiscountTier(form.quantity);
    let text = '';
    if (inquiryType === 'book') {
      text = `Hi Butterly Bakery! 🎉 I'd like to Request an Official Quotation & Book a Bulk Order.\n\n🏷️ Event Type: ${form.eventType}\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n✉️ Email: ${form.email}\n📦 Estimated Quantity: ${form.quantity} pieces\n💎 Discount Tier: ${discount}\n📅 Required By: ${form.date}\n📝 Notes/Questions: ${form.notes || 'None'}\n\nPlease share the official quotation and booking link. Thank you! ✨`;
    } else {
      text = `Hi Butterly Bakery! 💬 I have a Question about Corporate & Bulk Orders.\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n✉️ Email: ${form.email}\n🏷️ Interested In: ${form.eventType}\n📝 Question: ${form.notes || 'No specific note added'}\n\nPlease guide me with details. Thank you! ✨`;
    }

    window.location.href = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    toast.success('✨ Summoning WhatsApp with your quotation request!', { icon: '🦋' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="section-container" style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      {/* Title */}
      <h1 className="section-title" data-aos="fade-down" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        Corporate &amp; Bulk Orders
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-dark)', opacity: 0.8, marginBottom: '2rem', fontSize: '1.15rem' }}>
        Make every occasion magical — from 50 to 5000 pieces ✨
      </p>

      {/* PROMINENT TOP ACTION BAR (Book Now / Ask a Question) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '4rem'
        }}
        data-aos="fade-up"
      >
        <button
          onClick={() => {
            setInquiryType('book');
            scrollToSection('quotation-section');
          }}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #8b4513, #5a2d00)',
            color: '#f5d070',
            border: '2px solid #c8a86a',
            borderRadius: '0',
            fontFamily: '"Cinzel", serif',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(139,69,19,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span>🚀 Book Now / Request Official Quotation</span>
        </button>

        <button
          onClick={() => {
            setInquiryType('question');
            scrollToSection('quotation-section');
          }}
          style={{
            padding: '1rem 2rem',
            background: 'var(--glass-bg)',
            color: 'var(--secondary)',
            border: '2px solid var(--secondary)',
            borderRadius: '0',
            fontFamily: '"Cinzel", serif',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span>💬 Ask a Question / General Inquiry</span>
        </button>
      </div>

      {/* Event Type Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
        {eventTypes.map(ev => (
          <motion.div
            key={ev.id}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            onMouseEnter={() => setSelected(ev.id)}
            onMouseLeave={() => setSelected(null)}
            onClick={() => {
              setForm(f => ({ ...f, eventType: ev.label }));
              setInquiryType('book');
              scrollToSection('quotation-section');
            }}
            style={{
              background: selected === ev.id ? ev.color : 'var(--glass-bg)',
              border: `2px solid ${selected === ev.id ? ev.color : 'var(--glass-border)'}`,
              borderRadius: '0',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: selected === ev.id ? 'white' : 'var(--text-dark)'
            }}
            data-aos="fade-up"
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{ev.icon}</div>
            <h3 style={{ fontFamily: '"Cinzel", serif', marginBottom: '0.5rem' }}>{ev.label}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>{ev.desc}</p>
            <AnimatePresence>
              {selected === ev.id && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                  {ev.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', opacity: 0.9 }}>✓ {item}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <p style={{ fontSize: '0.78rem', marginTop: '1rem', fontStyle: 'italic', fontWeight: 700, color: selected === ev.id ? '#f5d070' : '#8b4513' }}>
              ✦ Click to Book / Inquire for {ev.label} ✦
            </p>
          </motion.div>
        ))}
      </div>

      {/* ALWAYS VISIBLE: Quotation Calculator & Ask a Question Section */}
      <div id="quotation-section" style={{ maxWidth: '750px', margin: '0 auto 4rem', scrollMarginTop: '100px' }} data-aos="fade-up">
        <div
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,248,231,0.95) 100%)',
            border: '2px solid #c8a86a',
            borderRadius: '0',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)'
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.8rem', color: '#8b4513', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              ✦ Instant Assistance &amp; Booking ✦
            </p>
            <h2 style={{ fontFamily: '"Cinzel", serif', color: 'var(--secondary)', fontSize: '2.2rem', marginBottom: '0.6rem' }}>
              {inquiryType === 'book' ? '🚀 Book Now & Quotation Request' : '💬 Ask Our Fairy Bakers a Question'}
            </h2>
            <p style={{ color: 'var(--text-dark)', opacity: 0.8, fontSize: '0.98rem' }}>
              {inquiryType === 'book'
                ? 'Select your event requirements below to unlock our tiered bulk discounts and submit an official booking.'
                : 'Have questions about customizations, dietary needs, or logistics? Ask us anything!'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setInquiryType('book')}
              style={{
                flex: 1,
                padding: '0.8rem 1.2rem',
                borderRadius: '0',
                border: inquiryType === 'book' ? '2px solid #8b4513' : '1px solid #c8a86a',
                background: inquiryType === 'book' ? '#8b4513' : 'transparent',
                color: inquiryType === 'book' ? '#FFF8E7' : '#5a2000',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🚀 Official Quotation / Book Now
            </button>

            <button
              type="button"
              onClick={() => setInquiryType('question')}
              style={{
                flex: 1,
                padding: '0.8rem 1.2rem',
                borderRadius: '0',
                border: inquiryType === 'question' ? '2px solid #8b4513' : '1px solid #c8a86a',
                background: inquiryType === 'question' ? '#8b4513' : 'transparent',
                color: inquiryType === 'question' ? '#FFF8E7' : '#5a2000',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              💬 Ask a Question / General Inquiry
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Row 1: Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Your Name *</label>
                <input type="text" name="name" placeholder="e.g. Ananya Sharma" required value={form.name} onChange={handleChange} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.7)', fontSize: '0.98rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Phone Number (WhatsApp) *</label>
                <input type="tel" name="phone" placeholder="+91 98765 43210" required value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.7)', fontSize: '0.98rem' }} />
              </div>
            </div>

            {/* Row 2: Email & Event Type */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Email Address *</label>
                <input type="email" name="email" placeholder="you@company.com" required value={form.email} onChange={handleChange} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.7)', fontSize: '0.98rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>Event Category</label>
                <select name="eventType" value={form.eventType} onChange={handleChange} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.9)', fontSize: '0.98rem' }}>
                  <option value="Corporate Events">🏢 Corporate Events</option>
                  <option value="Weddings">💍 Weddings</option>
                  <option value="Birthday Parties">🎂 Birthday Parties</option>
                  <option value="Festivals & Pooja">🪔 Festivals &amp; Gifting</option>
                  <option value="Custom / Other">✨ Custom / Other Occasion</option>
                </select>
              </div>
            </div>

            {/* If Mode is Book Now: Show Quantity + Discount Tier */}
            {inquiryType === 'book' && (
              <div style={{ background: 'rgba(200,168,106,0.15)', border: '1.5px dashed #8b6a2a', borderRadius: '0', padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 700, color: '#5a2000', fontSize: '0.95rem' }}>
                    Estimated Quantity: <span style={{ fontSize: '1.15rem' }}>{form.quantity} pieces</span>
                  </label>
                  <span style={{ background: '#8b4513', color: '#FFF8E7', padding: '0.3rem 0.8rem', borderRadius: '0', fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Cinzel", serif' }}>
                    🎁 {getDiscountTier(form.quantity)}
                  </span>
                </div>
                <input
                  type="range"
                  name="quantity"
                  min="50"
                  max="1000"
                  step="25"
                  value={form.quantity}
                  onChange={handleChange}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#8b4513' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#7a5a30', marginTop: '0.3rem', fontWeight: 600 }}>
                  <span>50 pcs (10% OFF)</span>
                  <span>100 pcs (15% OFF)</span>
                  <span>200 pcs (20% OFF)</span>
                  <span>500+ pcs (25% OFF)</span>
                </div>
              </div>
            )}

            {/* Row 3: Required Date */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                {inquiryType === 'book' ? 'Required By Date *' : 'Target Date (Optional)'}
              </label>
              <input type="date" name="date" required={inquiryType === 'book'} value={form.date} onChange={handleChange} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.7)', fontSize: '0.98rem' }} />
            </div>

            {/* Row 4: Notes / Questions */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                {inquiryType === 'book' ? 'Special Customization Notes or Flavor Preferences' : 'What would you like to ask our bakers? *'}
              </label>
              <textarea
                name="notes"
                rows="4"
                placeholder={inquiryType === 'book' ? 'e.g. We need company logo branding on gift boxes...' : 'e.g. Do you offer eggless or sugar-free options for wedding tiers? What are delivery charges?'}
                value={form.notes}
                onChange={handleChange}
                required={inquiryType === 'question'}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '0', border: '1px solid #c8a86a', background: 'rgba(255,255,255,0.7)', fontSize: '0.98rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.1rem',
                background: inquiryType === 'book'
                  ? 'linear-gradient(135deg, #25D366, #128C7E)'
                  : 'linear-gradient(135deg, #8b4513, #5a2d00)',
                color: '#FFF8E7',
                border: 'none',
                borderRadius: '0',
                fontFamily: '"Cinzel", serif',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '1px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{inquiryType === 'book' ? '📲 Submit Official Booking on WhatsApp' : '✉️ Send Question to Our Alchemists'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BulkOrders;
