import React from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { WHATSAPP_NUMBER, DISPLAY_PHONE, EMAIL_ADDRESS, BUSINESS_HOURS, BUSINESS_ADDRESS } from '../config';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const text = `Hi Butterly Bakery!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    toast.success('Redirecting to WhatsApp!');
    e.target.reset();
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--border-light)',
    background: 'var(--bg-card)',
    color: 'var(--text-dark)',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Butterly Bakery</title>
        <meta name="description" content="Get in touch with Butterly Bakery for custom cake orders, feedback, or any inquiries." />
      </Helmet>
      <section className="section-container" style={{ paddingTop: '3rem', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" data-aos="fade-up">Get in Touch</span>
          <h1 className="section-title" data-aos="fade-up">Contact Us</h1>
          <p className="section-subtitle" data-aos="fade-up">
            We'd love to hear from you — whether it's a question, feedback, or a custom order.
          </p>
        </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Info */}
        <div style={{ flex: '1 1 300px', maxWidth: '440px' }} data-aos="fade-right">
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Our Information</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Visit Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{BUSINESS_ADDRESS}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{DISPLAY_PHONE}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Email</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{EMAIL_ADDRESS}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>Hours</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{BUSINESS_HOURS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div style={{ flex: '1 1 300px', maxWidth: '440px' }} data-aos="fade-left">
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.88rem' }}>Name</label>
                <input type="text" name="name" placeholder="Your name" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.88rem' }}>Email</label>
                <input type="email" name="email" placeholder="your@email.com" style={inputStyle} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.88rem' }}>Message</label>
                <textarea name="message" placeholder="How can we help you?" rows="5" style={{ ...inputStyle, resize: 'vertical' }} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
            </form>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
