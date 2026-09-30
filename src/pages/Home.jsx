import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import QuickViewModal from '../components/QuickViewModal';
import GoogleReviews from '../components/GoogleReviews';
import { useCart } from '../context/CartContext';
import { menuCategories } from '../menuData';

const Home = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Only show categories that have enough products to perfectly fill at least one row (4 items)
  const validCategories = menuCategories.filter(cat => cat.products && cat.products.length >= 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % validCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validCategories.length]);

  const currentCategory = validCategories[currentCategoryIndex];
  
  // Show exactly 8 items if available (2 full rows), otherwise exactly 4 items (1 full row)
  const featuredProducts = currentCategory 
    ? (currentCategory.products.length >= 8 
        ? currentCategory.products.slice(0, 8) 
        : currentCategory.products.slice(0, 4))
    : [];

  return (
    <>
      <Helmet>
        <title>Butterly Bakery | Fresh Artisan Baked Goods in Bangalore</title>
        <meta name="description" content="Butterly Bakery offers premium, handcrafted cakes, breads, and pastries in Bangalore. Order custom cakes for weddings and birthdays." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/images/home_hero.jpg" alt="Freshly baked goods" />
        </div>
        <div className="hero-inner">
          <div className="hero-content" data-aos="fade-up">
            <span className="hero-tag">Baked Fresh Daily</span>
            <h1 className="hero-title">The Art of Baking, Perfected</h1>
            <p className="hero-subtitle">
              From artisan breads to celebration cakes — every recipe crafted with premium ingredients and passion.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Explore Our Menu
              </Link>
              <Link to="/customizations" className="btn btn-secondary">
                Custom Cakes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP Strip */}
      <section style={{ background: 'var(--primary)', padding: '1.25rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>, text: 'Artisan Craftsmanship' },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: 'Daily Small Batches' },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Uncompromised Quality' },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, text: 'Bespoke Orders' }
          ].map((usp, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>{usp.icon}</span>
              <span>{usp.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About/Philosophy Brief */}
      <section className="section-container" style={{ textAlign: 'center' }}>
        <span className="section-tag" data-aos="fade-up">Our Standards</span>
        <h2 className="section-title" data-aos="fade-up">Uncompromising Quality</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          We believe that exceptional pastry requires patience, precision, and the finest ingredients available. We do not take shortcuts.
        </p>
        <div data-aos="fade-up" data-aos-delay="200" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 250px', padding: '2.5rem 2rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Sourced with Care</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We partner with local millers and ethical producers to ensure every ingredient meets our exacting standards.</p>
          </div>
          <div style={{ flex: '1 1 250px', padding: '2.5rem 2rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Artisan Techniques</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Our bakers rely on traditional, time-honored methods — from cold fermentation to hand-laminating our dough.</p>
          </div>
          <div style={{ flex: '1 1 250px', padding: '2.5rem 2rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Curated Batches</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We produce in small, deliberate quantities to guarantee that what reaches your table is at the peak of freshness.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: 'var(--bg-warm)', padding: '5rem 0' }}>
        <div className="section-container" style={{ padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag" data-aos="fade-up">Our Selection</span>
            <h2 className="section-title" data-aos="fade-up">Featured Delights</h2>
            <p className="section-subtitle" data-aos="fade-up">
              {currentCategory ? currentCategory.categoryName : 'Our best picks for you'}
            </p>
          </div>

          <div className="products-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="product-img-wrapper" style={product.image.startsWith('/') ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-warm)' }}>
                  {product.image.startsWith('/') ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <p>Image coming soon</p>
                    </div>
                  )}
                  <div className="product-card-overlay">
                    <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.82rem' }} onClick={() => setSelectedProduct(product)}>
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="product-footer">
                  <span className="price">₹{product.basePrice || product.price}{product.options && '*'}</span>
                  <button className="add-btn" onClick={() => addToCart(product)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }} data-aos="fade-up">
            <Link to="/products" className="btn btn-secondary">
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <GoogleReviews />

      {/* CTA Section */}
      <section style={{ background: 'var(--primary)', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }} data-aos="fade-up">
          <h2 style={{ color: 'var(--text-light)', fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>
            Have a celebration coming up?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Let us bake the perfect cake for your special day. Custom designs, premium flavors, delivered fresh.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/customizations" className="btn" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 16px rgba(212,168,67,0.3)' }}>
              Design Your Cake
            </Link>
            <Link to="/bulk-orders" className="btn" style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)' }}>
              Bespoke Orders
            </Link>
          </div>
        </div>
      </section>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export default Home;
