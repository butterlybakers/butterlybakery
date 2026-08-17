import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cake3D from '../components/Cake3D';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import AnimatedButterfly from '../components/AnimatedButterfly';
import QuickViewModal from '../components/QuickViewModal';
import FlavorOracle from '../components/FlavorOracle';
import GoogleReviews from '../components/GoogleReviews';

import { useCart } from '../context/CartContext';
import { menuCategories } from '../menuData';

const Home = () => {

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Filter out categories that might have 0 products (just to be safe)
  const validCategories = menuCategories.filter(cat => cat.products && cat.products.length > 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % validCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validCategories.length]);

  const handleSurpriseMe = () => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=magic-wand-6214.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    
    // Pick a random category, then a random product from it
    const randomCategory = validCategories[Math.floor(Math.random() * validCategories.length)];
    const randomProduct = randomCategory.products[Math.floor(Math.random() * randomCategory.products.length)];
    setSelectedProduct(randomProduct);
  };

  // Select up to 4 products from the current category
  const currentCategory = validCategories[currentCategoryIndex];
  const featuredProducts = currentCategory ? currentCategory.products.slice(0, 6) : [];

  return (
    <>




      {/* Hero Section */}
      <section className="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="hero-content" style={{ flex: '1 1 300px' }}>
          <TextReveal text="The Magic of Baking" className="hero-title" delay={0.2} />
          <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600" style={{ marginTop: '1rem' }}>
            Experience Pastries that melt in your mouth, crafted with love and a sprinkle of joy.
          </p>
          <div data-aos="zoom-in" data-aos-delay="800" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <MagneticButton className="btn" style={{ background: '#e89e25', color: '#ffffff' }} onClick={() => window.location.href = '/products'}>
              Explore Menu
            </MagneticButton>
            <button className="btn" onClick={handleSurpriseMe} style={{ background: '#ffffff', border: 'none', color: '#e89e25', animation: 'pulse 2s ease-in-out infinite' }}>
              Surprise Me
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
            whether its your morning bread to start your day..... or a custom multi-tiered cake for your grandest celebration, our commitment to excellence is baked into every single layer.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '0', marginBottom: '5rem', padding: '5rem 2rem' }}>
        <h2 className="section-title" data-aos="fade-up">Featured Delights</h2>
        <h3 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '3rem', fontSize: '1.5rem', fontWeight: 'bold' }} data-aos="fade-up">
          {currentCategory ? currentCategory.categoryName : ''}
        </h3>
        <div className="products-grid">
          {featuredProducts.map((product, i) => (
            <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={i * 150} style={{ position: 'relative', overflow: 'visible' }}>
              <div className="product-img-wrapper" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0' }}>
                <div className="product-card-overlay">
                  <button className="btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }} onClick={() => setSelectedProduct(product)}>View Details</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <p className="price">₹{product.price}</p>
                  <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => addToCart(product)}>Add to Cart</button>
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

      {/* Removed Flavor Oracle and Quality sections */}

      <GoogleReviews />

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default Home;
