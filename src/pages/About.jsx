import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const chapters = [
  {
    title: 'The Beginning',
    text: 'Founded in the heart of Bangalore, Butterly Bakery began with a simple dream — to bring joy through the art of baking. What started in a small home kitchen has grown into a beloved neighborhood bakery, serving freshly baked goods every single day.',
    image: '/images/about_dream.jpg',
    reverse: false
  },
  {
    title: 'Our Ingredients',
    text: 'We pride ourselves on using only the finest ingredients — organic locally-milled flour, European-style butter, and single-origin Belgian chocolate. Our recipes balance traditional techniques with creative flavors that keep our customers coming back.',
    image: '/images/about_ingredients.jpg',
    reverse: true
  },
  {
    title: 'Our Kitchen',
    text: 'Every morning before sunrise, our bakers fire up the ovens. From slow-fermented breads to delicate pastries, everything is made from scratch with care and precision. The aroma of fresh-baked goods fills the kitchen long before we open our doors.',
    image: '/images/about_oven.jpg',
    reverse: false
  },
  {
    title: 'Your Celebrations',
    text: 'Today, Butterly Bakery is more than a bakery — it\'s where celebrations are made sweeter. From birthday cakes to wedding tiers, and from morning croissants to midnight desserts, we\'re honored to be part of your most special moments.',
    image: '/images/about_ending.jpg',
    reverse: true
  }
];

const values = [
  { title: '100% Pure Butter', desc: 'No shortening or artificial fats — only premium European-style butter in every recipe.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { title: '24-Hour Fermentation', desc: 'Our brioche and doughs rest overnight for unmatched flavor, texture, and lightness.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { title: 'Zero Preservatives', desc: 'Baked fresh daily from scratch with natural, wholesome ingredients.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: 'Handcrafted Daily', desc: 'Every item is made by hand — from shaping dough to decorating cakes.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> }
];

const team = [
  {
    name: 'Head Baker',
    role: 'Wedding Cake Specialist',
    desc: 'Over 15 years of experience crafting multi-tiered masterpieces and delicate sugar work for celebrations of all sizes.'
  },
  {
    name: 'Pastry Chef',
    role: 'Pastry & Flavor Development',
    desc: 'Blends exotic flavors with classic techniques to create our signature macarons, tarts, and seasonal specials.'
  },
  {
    name: 'Dough Master',
    role: 'Artisan Bread & Brioche',
    desc: 'Oversees our cold fermentation process, ensuring every loaf and bun achieves the perfect golden crust.'
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Butterly Bakery</title>
        <meta name="description" content="Learn about Butterly Bakery's commitment to uncompromising quality, traditional artisan techniques, and our talented team of master bakers." />
      </Helmet>
      <section className="section-container" style={{ paddingTop: '4rem' }}>
        {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-aos="fade-up">
        <span className="section-tag">Our Story</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          About Butterly Bakery
        </h1>
        <p className="section-subtitle">
          Where passion meets precision — baking with heart in Bangalore since day one.
        </p>
      </div>

      {/* Story Chapters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem' }}>
        {chapters.map((chap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: chap.reverse ? 'row-reverse' : 'row',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 320px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="section-tag" style={{ marginBottom: '0.5rem' }}>Chapter {i + 1}</span>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{chap.title}</h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-body)' }}>{chap.text}</p>
            </div>
            <div style={{ flex: '0 0 320px', minHeight: '280px' }}>
              <img
                src={chap.image}
                alt={chap.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Our Values */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} data-aos="fade-up">
          <span className="section-tag">What We Stand For</span>
          <h2 className="section-title">Our Commitment</h2>
          <p className="section-subtitle">Four principles we uphold in our kitchen every single day.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {values.map((val, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              style={{
                background: 'var(--bg-warm)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div style={{ marginBottom: '1rem', color: 'var(--text-dark)', display: 'flex', justifyContent: 'center' }}>{val.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{val.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: '3rem' }} data-aos="fade-up">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">The Bakers</h2>
          <p className="section-subtitle">The dedicated hands behind every loaf, pastry, and celebration cake.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--primary-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--primary)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{member.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.75rem' }}>{member.role}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
