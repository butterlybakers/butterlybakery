import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedButterfly from '../components/AnimatedButterfly';


const bakers = [
  {
    name: 'Chef Aurelia',
    title: 'Master of Sugar Enchantments',
    role: 'Head Wedding Cake Architect',
    emoji: '🧚‍♀️',
    desc: 'With over 15 years crafting multi-tiered masterpieces, Aurelia weaves delicate sugar flowers that look like they grew in an elven meadow.'
  },
  {
    name: 'Master Thorne',
    title: 'Keeper of the Hearth Flame',
    role: 'Artisan Dough & Brioche Specialist',
    emoji: '🧙‍♂️',
    desc: 'Thorne oversees our midnight cold fermentations, ensuring every Korean garlic bun and sourdough loaf rises with golden perfection.'
  },
  {
    name: 'Seraphina',
    title: 'The Macaron Whisperer',
    role: 'Pastry Alchemist & Flavorist',
    emoji: '✨',
    desc: 'Seraphina blends exotic teas, florals, and Belgian chocolates to invent macarons with paper-thin shells and cloud-like fillings.'
  }
];

const commandments = [
  { icon: '🧈', title: '100% Pure Butter', desc: 'No shortening or artificial fats—only premium European-style butter.' },
  { icon: '🕰️', title: '24-Hour Fermentation', desc: 'Our brioche and doughs rest overnight for unmatched flavor and lightness.' },
  { icon: '🚫', title: 'Zero Preservatives', desc: 'Baked fresh daily from scratch with natural, organic ingredients.' },
  { icon: '✨', title: 'Blessed by Fairies', desc: 'Every box is finished with a sprinkle of edible gold dust before dispatch.' }
];

const chapters = [
  {
    title: 'Chapter 1: The Dream',
    subtitle: 'From a simple home kitchen to Bangalore’s fairy tale bakery',
    text: 'Founded in the heart of Bangalore, Butterly Bakery began with a simple dream: to bring magic into everyday moments through the art of baking. Our founders believed that every pastry should tell a story, much like a butterfly emerging from its chrysalis.',
    image: '/images/about_dream_1785271907914.png',
    reverse: false
  },
  {
    title: 'Chapter 2: The Ingredients',
    subtitle: 'Sourcing the finest nectar, cocoa, and grains from around the globe',
    text: 'We pride ourselves on using only the absolute finest ingredients—organic locally-milled flour, rich European-style butter, and single-origin Belgian chocolate. Our recipes are carefully crafted to balance traditional techniques with whimsical flavors.',
    image: '/images/about_ingredients_1785271917565.png',
    reverse: true
  },
  {
    title: 'Chapter 3: The Magic Oven',
    subtitle: 'Midnight enchantments when the city falls asleep',
    text: 'It is said that our brick ovens were blessed by woodland fairies. Every night, as Bangalore sleeps, the air in our kitchen fills with the warm aroma of rising dough and caramelizing sugar, casting enchantments across the neighborhood.',
    image: '/images/about_oven_1785271926273.png',
    reverse: false
  },
  {
    title: 'Chapter 4: Happily Ever After',
    subtitle: 'Weaving memories into your celebrations',
    text: 'Today, Butterly Bakery is more than just a place to buy cakes. It is an enchanted sanctuary where birthdays are celebrated in grandeur, wedding milestones are immortalized in sugar, and every single bite feels like a fairy tale ending.',
    image: '/images/about_ending_1785271935056.png',
    reverse: true
  }
];

const About = () => {


  const bgParticles = useMemo(() => 
    [...Array(25)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 1.5 + 1}rem`,
      duration: `${Math.random() * 8 + 10}s`,
      opacity: Math.random() * 0.35 + 0.1,
      rotate: `${Math.random() * 360}deg`,
      emoji: ['✨', '🧚‍♀️', '🦋', '🌟', '🧁'][Math.floor(Math.random() * 5)]
    }))
  , []);

  return (
    <section className="section-container" style={{ paddingTop: '5rem', position: 'relative', overflow: 'hidden' }}>
      


      {/* Background magical floating emojis */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        {bgParticles.map((p) => (
          <div key={p.id} style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            fontSize: p.fontSize,
            animation: `float ${p.duration} ease-in-out infinite alternate`,
            opacity: p.opacity,
            transform: `rotate(${p.rotate})`
          }}>
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-aos="fade-down">
        <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.85rem', color: '#d4af37', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          ✦ Our Fairy Tale Heritage ✦
        </p>
        <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Our Enchanted Story
        </h1>
        <p style={{ color: 'var(--text-dark)', fontSize: '1.15rem', opacity: 0.85, maxWidth: '650px', margin: '0 auto' }}>
          Where flour, pure butter, and stardust weave edible enchantments in Bangalore.
        </p>
      </div>

      {/* Chapters (Vertical Story Layout without huge gaps) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '6rem' }}>
        {chapters.map((chap, i) => (
          <div
            key={i}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: chap.reverse ? 'row-reverse' : 'row',
              flexWrap: 'wrap',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            data-aos="fade-up"
          >
            <div style={{ flex: '1 1 320px' }}>
              <h2 style={{ color: 'var(--secondary)', fontFamily: '"Cinzel", serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>
                {chap.title}
              </h2>
              <p style={{ color: '#d4af37', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '1rem', fontWeight: 600 }}>
                {chap.subtitle}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-dark)', opacity: 0.9 }}>
                {chap.text}
              </p>
            </div>
            <div style={{ flex: '0 0 280px', display: 'flex', justifyContent: 'center' }}>
              <img
                src={chap.image}
                alt={chap.title}
                style={{
                  width: '280px',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '3px solid #c8a86a',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Meet Our Fairy Bakers Section */}
      <div style={{ marginBottom: '6rem' }} data-aos="fade-up">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.8rem', color: '#d4af37', letterSpacing: '3px', textTransform: 'uppercase' }}>
            ✦ Master Artisans ✦
          </p>
          <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '2.4rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
            Meet the Alchemists
          </h2>
          <p style={{ color: 'var(--text-dark)', opacity: 0.8, maxWidth: '580px', margin: '0 auto' }}>
            The dedicated hands and imaginative hearts behind every single loaf, pastry, and celebration tier.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {bakers.map((baker, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.25), rgba(139,69,19,0.4))',
                border: '2px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '1rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}>
                {baker.emoji}
              </div>
              <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '0.2rem' }}>
                {baker.name}
              </h3>
              <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.82rem', color: '#d4af37', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.3rem' }}>
                {baker.title}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dark)', opacity: 0.7, fontStyle: 'italic', marginBottom: '1rem' }}>
                {baker.role}
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-dark)', opacity: 0.9 }}>
                {baker.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Bakery Commandments */}
      <div style={{ marginBottom: '4rem' }} data-aos="fade-up">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: '"Cinzel", serif', fontSize: '2.2rem', color: 'var(--secondary)', marginBottom: '0.4rem' }}>
            Our Fairy Oath
          </h2>
          <p style={{ color: 'var(--text-dark)', opacity: 0.8 }}>
            Four sacred principles we uphold in our kitchen every single day.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {commandments.map((cmd, i) => (
            <div
              key={i}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,248,231,0.9))',
                border: '1.5px solid #d4af37',
                borderRadius: '16px',
                padding: '1.8rem 1.5rem',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{cmd.icon}</div>
              <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.15rem', color: '#5a2000', marginBottom: '0.5rem', fontWeight: 700 }}>
                {cmd.title}
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', opacity: 0.85 }}>
                {cmd.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;
