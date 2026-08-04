import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cake3D from '../components/Cake3D';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import AnimatedButterfly from '../components/AnimatedButterfly';
import QuickViewModal from '../components/QuickViewModal';
import FlavorOracle from '../components/FlavorOracle';

import { useCart } from '../context/CartContext';

const featuredProducts = [
  { id: 'p1', name: 'Chocolate Truffle Cake', price: 150, description: 'Decadent, rich, and utterly irresistible. Our signature chocolate experience with a delicate coconut crunch.', image: '/images/truffle_cake_1785271864770.png' },
  { id: 'p2', name: 'Korean Cream Cheese Bun', price: 120, description: 'Soft, fluffy, and filled with creamy, buttery garlic goodness. A savory-sweet masterpiece.', image: '/images/cream_bun_1785271874235.png' },
  { id: 'p3', name: 'Classic Tres Leches', price: 180, description: 'A light, airy sponge cake soaked in three kinds of milk. The ultimate melt-in-your-mouth experience.', image: '/images/tres_leches_1785271883022.png' },
  { id: 'p4', name: 'Macaron Box (6 pcs)', price: 450, description: 'A beautiful assortment of our delicate, melt-in-your-mouth macarons. Comes in various magical flavors.', image: '/images/macarons_1785271892400.png' },
];

const Home = () => {

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSurpriseMe = () => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=magic-wand-6214.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    const random = featuredProducts[Math.floor(Math.random() * featuredProducts.length)];
    setSelectedProduct(random);
  };

  return (
    <>




      {/* Hero Section */}
      <section className="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="hero-content" style={{ flex: '1 1 300px' }}>
          <TextReveal text="The Magic of Baking" className="hero-title" delay={0.2} />
          <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600" style={{ marginTop: '1rem' }}>
            Experience pastries that melt in your mouth, crafted with love and a sprinkle of fairy dust.
          </p>
          <div data-aos="zoom-in" data-aos-delay="800" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <MagneticButton className="btn" onClick={() => window.location.href = '/products'}>
              Explore Menu
            </MagneticButton>
            <button className="btn" onClick={handleSurpriseMe} style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)', animation: 'pulse 2s ease-in-out infinite' }}>
              ✨ Surprise Me!
            </button>
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }} data-aos="fade-in" data-aos-duration="2000">
          <Cake3D />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" data-aos="fade-up">Our Philosophy</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: '1.8', marginBottom: '2rem', opacity: 0.8 }}>
            Baking is more than just combining ingredients; it is an art form. At Butterly Bakery, we believe in the magic of transformation.
            Like a butterfly emerging in vibrant colors, we turn the simplest, highest-quality ingredients into breathtaking, mouth-watering masterpieces.
          </p>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: '1.8', opacity: 0.8 }}>
            Whether it is a morning pastry to start your day or a custom multi-tiered cake for your grandest celebration, our commitment to excellence is baked into every single layer.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '40px', marginBottom: '5rem', padding: '5rem 2rem' }}>
        <h2 className="section-title" data-aos="fade-up">Featured Delights</h2>
        <div className="products-grid">
          {featuredProducts.map((product, i) => (
            <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={i * 150} style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="product-img-wrapper" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '15px 15px 0 0' }}>
                <div className="product-card-overlay">
                  <button className="btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }} onClick={() => setSelectedProduct(product)}>View Details</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <p className="price">₹{product.price}</p>
                  <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => addToCart(product)}>Add ✨</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }} data-aos="fade-in" data-aos-delay="600">
          <Link to="/products" className="btn" style={{ background: 'transparent', color: 'var(--secondary)', border: '2px solid var(--secondary)', boxShadow: 'none' }}>
            View Full Menu
          </Link>
        </div>
      </section>

      {/* The Flavor Oracle — Interactive Tarot Matcher */}
      <FlavorOracle />

      {/* Quality Section */}
      <section className="section-container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }} data-aos="fade-right">
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>Finest Ingredients</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', opacity: 0.8 }}>
              A masterpiece is only as good as the canvas it is built upon. We source only the absolute finest, premium ingredients.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ fontSize: '1.5rem' }}>🧈</span> Pure European-style butter</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ fontSize: '1.5rem' }}>🍫</span> Belgian artisan chocolate</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ fontSize: '1.5rem' }}>🌾</span> Organic, locally-milled flour</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span style={{ fontSize: '1.5rem' }}>🍓</span> Fresh, seasonal fruits</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '300px', height: '400px', backgroundImage: 'url(/images/home_baking_1785271944924.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} data-aos="fade-left" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-container" style={{ marginBottom: '5rem' }}>
        <h2 className="section-title" data-aos="fade-up">Loved by Bangalore</h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} data-aos="fade-up">
          <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '2.5rem', color: 'var(--secondary)' }}>4.9 / 5.0</h3>
          <p style={{ color: '#F5B041', fontSize: '1.5rem', letterSpacing: '5px' }}>★★★★★</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { text: '"I ordered the Chocolate Truffle cake, and it was absolutely delicious! The little coconut crunch inside made it even more special."', author: 'Navita Kumari', delay: 100 },
            { text: '"Korean bun is so soft and fluffy that I couldn\'t resist it. Quality and taste of the food were top-notch."', author: 'Vignesh Reddy', delay: 300 },
            { text: '"It\'s a really nice bakery. And I highly recommend this place. This is a must try."', author: 'Hamie Monnier', delay: 500 },
          ].map((r, i) => (
            <div key={i} className="review-card" data-aos="fade-up" data-aos-delay={r.delay}>
              <div className="stars">★★★★★</div>
              <p className="review-text">{r.text}</p>
              <p className="review-author">- {r.author}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default Home;
