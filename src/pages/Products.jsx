import React, { useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { menuCategories } from '../menuData';

const Products = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const categories = menuCategories.map(c => c.categoryName);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const displayProducts = useMemo(() => {
    let allProducts = [];
    menuCategories.forEach(cat => {
      cat.products.forEach(p => {
        allProducts.push({ ...p, categoryName: cat.categoryName });
      });
    });

    let filtered = allProducts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    } else if (activeCategory) {
      filtered = allProducts.filter(p => p.categoryName === activeCategory);
    }

    let sorted = [...filtered];
    if (sortOrder === 'price-asc') {
      sorted.sort((a, b) => (a.basePrice || a.price) - (b.basePrice || b.price));
    } else if (sortOrder === 'price-desc') {
      sorted.sort((a, b) => (b.basePrice || b.price) - (a.basePrice || a.price));
    } else if (sortOrder === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [activeCategory, searchQuery, sortOrder]);

  return (
    <>
      <Helmet>
        <title>Our Menu | Butterly Bakery</title>
        <meta name="description" content="Explore Butterly Bakery's full menu of artisan breads, custom cakes, pastries, croissants, and dessert tubs." />
      </Helmet>
      <section className="section-container" style={{ paddingTop: '3rem', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-tag" data-aos="fade-up">Browse</span>
        <h1 className="section-title" data-aos="fade-up">Our Full Menu</h1>
        <p className="section-subtitle" data-aos="fade-up">
          Discover our complete collection of freshly baked goods.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {/* Search & Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: 'var(--radius-md)', 
              border: '1.5px solid var(--border-light)', 
              flex: '1', 
              minWidth: '250px', 
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              background: 'var(--bg-card)',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
          />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: 'var(--radius-md)', 
              border: '1.5px solid var(--border-light)', 
              outline: 'none', 
              backgroundColor: 'var(--bg-card)', 
              color: 'var(--text-body)', 
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.9rem'
            }}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="nav-arrow"
            onClick={scrollLeft}
            aria-label="Scroll left"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-body)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            ←
          </button>
          
          <div className="category-nav" ref={scrollRef} style={{ flex: 1 }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button 
            className="nav-arrow"
            onClick={scrollRight}
            aria-label="Scroll right"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-body)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {displayProducts.length > 0 ? (
          displayProducts.map((product, i) => (
            <div key={`${product.id}-${i}`} className="product-card" data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)}>
              <div className="product-img-wrapper" style={product.image.startsWith('/') ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <span className="category-tag">{product.categoryName}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-footer">
                <span className="price">₹{product.basePrice || product.price}{product.options && '*'}</span>
                <button className="add-btn" onClick={() => product.options ? setSelectedProduct(product) : addToCart(product)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  {product.options ? 'Select' : 'Add'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>No products found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
    </>
  );
};

export default Products;
