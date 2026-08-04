import React from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast('✨ Message sent magically!', {
      icon: '🦋',
      style: {
        background: 'var(--primary)',
        color: '#FFF8E7',
        border: 'none',
        fontWeight: 'bold'
      }
    });
    e.target.reset();
  };

  return (
    <section className="section-container" style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <h1 className="section-title" data-aos="fade-down">Contact Us</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px', background: 'var(--glass-bg)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }} data-aos="fade-right">
          <h2 style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Get in Touch</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-dark)' }}>We'd love to hear from you! Whether you have a question about our menu, need to place a custom order, or just want to say hello.</p>
          
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span>
            <div>
              <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Visit Us</h4>
              <p style={{ color: '#555' }}>123 Bakery Lane, Indiranagar<br/>Bangalore, Karnataka 560038</p>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📞</span>
            <div>
              <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Call Us</h4>
              <p style={{ color: '#555' }}>+91 98765 43210</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✉️</span>
            <div>
              <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Email Us</h4>
              <p style={{ color: '#555' }}>hello@butterlybakery.com</p>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }} data-aos="fade-left">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Name</label>
              <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-dark)', fontSize: '1rem' }} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Email</label>
              <input type="email" placeholder="Your Email" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-dark)', fontSize: '1rem' }} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Message</label>
              <textarea placeholder="How can we help you?" rows="5" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-dark)', fontSize: '1rem', resize: 'vertical' }} required></textarea>
            </div>
            <button type="submit" className="btn" style={{ width: '100%', border: 'none', cursor: 'none' }}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
