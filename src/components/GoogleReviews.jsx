import React from 'react';
import { motion } from 'framer-motion';

const MOCK_REVIEWS = [
  { text: '"I ordered the Chocolate Truffle cake, and it was absolutely delicious! The little coconut crunch inside made it even more special."', author: 'Navita Kumari', rating: 5 },
  { text: '"Korean bun is so soft and fluffy that I couldn\'t resist it. Quality and taste of the food were top-notch."', author: 'Vignesh Reddy', rating: 5 },
  { text: '"It\'s a really nice bakery. And I highly recommend this place. This is a must try."', author: 'Hamie Monnier', rating: 4 },
];

const GoogleReviews = () => {
  const reviews = MOCK_REVIEWS.filter(r => r.rating >= 4);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="section-container" style={{ paddingBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-tag" data-aos="fade-up">Testimonials</span>
        <h2 className="section-title" data-aos="fade-up">What Our Customers Say</h2>
        <div data-aos="fade-up" style={{ marginTop: '1rem' }}>
          <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '2.2rem', color: 'var(--text-dark)' }}>4.9 / 5.0</p>
          <p style={{ color: 'var(--accent)', fontSize: '1.2rem', letterSpacing: '4px', marginTop: '0.25rem' }}>★★★★★</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Based on Google Reviews</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        {reviews.slice(0, 3).map((r, i) => (
          <motion.div 
            key={i} 
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stars">{renderStars(r.rating)}</div>
            <p className="review-text">{r.text}</p>
            <p className="review-author">— {r.author}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GoogleReviews;
