import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MOCK_REVIEWS = [
  { text: '"I ordered the Chocolate Truffle cake, and it was absolutely delicious! The little coconut crunch inside made it even more special."', author: 'Navita Kumari', rating: 5 },
  { text: '"Korean bun is so soft and fluffy that I couldn\'t resist it. Quality and taste of the food were top-notch."', author: 'Vignesh Reddy', rating: 5 },
  { text: '"It\'s a really nice bakery. And I highly recommend this place. This is a must try."', author: 'Hamie Monnier', rating: 4 },
];

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      // Fallback to mock data if no keys are provided
      setTimeout(() => {
        setReviews(MOCK_REVIEWS.filter(r => r.rating >= 4));
        setLoading(false);
      }, 1000);
      return;
    }

    // Load Google Maps Script
    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      document.head.appendChild(script);
    }

    const fetchReviews = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      service.getDetails({
        placeId: placeId,
        fields: ['reviews']
      }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.reviews) {
          const filtered = place.reviews
            .filter(r => r.rating >= 4)
            .map(r => ({
              text: `"${r.text}"`,
              author: r.author_name,
              rating: r.rating
            }));
          setReviews(filtered);
        } else {
          // Fallback if API fails
          setReviews(MOCK_REVIEWS.filter(r => r.rating >= 4));
        }
        setLoading(false);
      });
    };

    script.addEventListener('load', fetchReviews);

    // If script was already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      fetchReviews();
    }

    return () => {
      script.removeEventListener('load', fetchReviews);
    };
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="section-container" style={{ marginBottom: '5rem' }}>
      <h2 className="section-title" data-aos="fade-up">Loved by Bangalore</h2>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} data-aos="fade-up">
        <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '2.5rem', color: 'var(--secondary)' }}>4.9 / 5.0</h3>
        <p style={{ color: '#F5B041', fontSize: '1.5rem', letterSpacing: '5px' }}>★★★★★</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Based on Google Reviews</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary)', fontFamily: '"Cinzel", serif', fontSize: '1.2rem' }}>
          Loading latest reviews...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {reviews.slice(0, 3).map((r, i) => (
            <motion.div 
              key={i} 
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="stars" style={{ color: '#F5B041' }}>{renderStars(r.rating)}</div>
              <p className="review-text">{r.text}</p>
              <p className="review-author">- {r.author}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GoogleReviews;
