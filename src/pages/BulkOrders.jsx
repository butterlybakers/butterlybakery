import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { WHATSAPP_NUMBER } from '../config';

const eventTypes = [
  { id: 'corporate', label: 'Corporate Events', desc: 'Team celebrations, product launches, client appreciation events.', items: ['Custom branding on packaging', 'Minimum 50 pieces', 'Timely delivery guaranteed', 'Dedicated event support'] },
  { id: 'wedding', label: 'Weddings', desc: 'Tiered wedding cakes, dessert tables, and favors for your special day.', items: ['Multi-tiered custom designs', 'Theme matching', 'Tasting session included', 'Delivery & setup included'] },
  { id: 'birthday', label: 'Birthday Parties', desc: 'Grand cakes and sweet treats to make every birthday memorable.', items: ['Custom designs & characters', 'Name & age decoration', 'Mini cupcake boxes for guests', 'Same-day baking available'] },
  { id: 'festival', label: 'Festivals & Gifting', desc: 'Festive treats, dry cakes, and curated gift boxes for every occasion.', items: ['Festive packaging', 'Curated assortments', 'Customized gift boxes', 'Corporate gifting supported'] },
];

const BulkOrders = () => {
  const [selected, setSelected] = useState(null);
  const [inquiryType, setInquiryType] = useState('book');
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



  const handleSubmit = (e) => {
    e.preventDefault();
    let text = '';
    if (inquiryType === 'book') {
      text = `Hi Butterly Bakery! I'd like to place a Bespoke Order.\n\nEvent Type: ${form.eventType}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nEstimated Quantity: ${form.quantity} pieces\nRequired By: ${form.date}\nNotes: ${form.notes || 'None'}\n\nPlease share an official quotation. Thank you!`;
    } else {
      text = `Hi Butterly Bakery! I have a question about Bespoke Orders.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nInterested In: ${form.eventType}\nQuestion: ${form.notes || 'General inquiry'}\n\nPlease share details. Thank you!`;
    }

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    toast.success('Opening WhatsApp...');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--border-light)',
    background: 'var(--bg-card)',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    color: 'var(--text-dark)',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.35rem',
    fontWeight: 600,
    color: 'var(--text-dark)',
    fontSize: '0.88rem'
  };

  return (
    <>
      <Helmet>
        <title>Bespoke Orders | Butterly Bakery</title>
        <meta name="description" content="Place bespoke orders for corporate events, weddings, and parties with Butterly Bakery." />
      </Helmet>
      <section className="section-container" style={{ paddingTop: '3rem', minHeight: '80vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="section-tag" data-aos="fade-up">For Every Occasion</span>
        <h1 className="section-title" data-aos="fade-up">Bespoke Orders</h1>
        <p className="section-subtitle" data-aos="fade-up">
          From 50 to 5,000 pieces — we handle events of all sizes with care.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '3.5rem' }} data-aos="fade-up">
        <button
          onClick={() => { setInquiryType('book'); scrollToSection('quotation-section'); }}
          className="btn btn-primary"
        >
          Request a Quotation
        </button>
        <button
          onClick={() => { setInquiryType('question'); scrollToSection('quotation-section'); }}
          className="btn btn-secondary"
        >
          Ask a Question
        </button>
      </div>

      {/* Event Type Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        {eventTypes.map(ev => (
          <motion.div
            key={ev.id}
            whileHover={{ y: -4 }}
            onMouseEnter={() => setSelected(ev.id)}
            onMouseLeave={() => setSelected(null)}
            onClick={() => {
              setForm(f => ({ ...f, eventType: ev.label }));
              setInquiryType('book');
              scrollToSection('quotation-section');
            }}
            style={{
              background: 'var(--bg-card)',
              border: `1.5px solid ${selected === ev.id ? 'var(--primary)' : 'var(--border-card)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: selected === ev.id ? 'var(--shadow-hover)' : 'var(--shadow-sm)'
            }}
            data-aos="fade-up"
          >
            <h3 style={{ fontFamily: '"DM Serif Display", serif', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{ev.label}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{ev.desc}</p>
            <AnimatePresence>
              {selected === ev.id && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {ev.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 500 }}>✓ {item}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Quotation Form */}
      <div id="quotation-section" style={{ maxWidth: '700px', margin: '0 auto 3rem', scrollMarginTop: '100px' }} data-aos="fade-up">
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag">Get Started</span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
              {inquiryType === 'book' ? 'Request a Quotation' : 'Ask Us Anything'}
            </h2>
          </div>

          {/* Mode Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', padding: '4px' }}>
            <button
              type="button"
              onClick={() => setInquiryType('book')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: inquiryType === 'book' ? 'var(--bg-card)' : 'transparent',
                color: inquiryType === 'book' ? 'var(--text-dark)' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                boxShadow: inquiryType === 'book' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Quotation
            </button>
            <button
              type="button"
              onClick={() => setInquiryType('question')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: inquiryType === 'question' ? 'var(--bg-card)' : 'transparent',
                color: inquiryType === 'question' ? 'var(--text-dark)' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                boxShadow: inquiryType === 'question' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              General Inquiry
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input type="text" name="name" placeholder="Your name" required value={form.name} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone (WhatsApp) *</label>
                <input type="tel" name="phone" placeholder="+91 98765 43210" required value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" name="email" placeholder="you@email.com" required value={form.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Event Type</label>
                <select name="eventType" value={form.eventType} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Weddings">Weddings</option>
                  <option value="Birthday Parties">Birthday Parties</option>
                  <option value="Festivals & Gifting">Festivals & Gifting</option>
                  <option value="Custom / Other">Custom / Other</option>
                </select>
              </div>
            </div>

            {inquiryType === 'book' && (
              <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                    Quantity: <strong>{form.quantity} pieces</strong>
                  </label>
                </div>
                <input
                  type="range" name="quantity" min="50" max="1000" step="25"
                  value={form.quantity} onChange={handleChange}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>50 pcs</span><span>250 pcs</span><span>500 pcs</span><span>1000 pcs</span>
                </div>
              </div>
            )}

            <div>
              <label style={labelStyle}>{inquiryType === 'book' ? 'Required By *' : 'Target Date (Optional)'}</label>
              <input type="date" name="date" required={inquiryType === 'book'} value={form.date} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>{inquiryType === 'book' ? 'Special Requirements' : 'Your Question *'}</label>
              <textarea
                name="notes" rows="3"
                placeholder={inquiryType === 'book' ? 'e.g. Need company logo branding...' : 'e.g. Do you offer eggless options?'}
                value={form.notes} onChange={handleChange}
                required={inquiryType === 'question'}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.95rem', justifyContent: 'center' }}>
              {inquiryType === 'book' ? 'Submit via WhatsApp' : 'Send Inquiry via WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default BulkOrders;
