import React, { useState, useMemo, useRef } from 'react';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { menuCategories } from '../menuData';
import AnimatedButterfly from '../components/AnimatedButterfly';

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

    if (activeCategory) {
      filtered = filtered.filter(p => p.categoryName === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    let sorted = [...filtered];
    if (sortOrder === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [activeCategory, searchQuery, sortOrder]);

  return (
    <section className="section-container" style={{ paddingTop: '4rem', minHeight: '100vh', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: '3.5rem', color: 'var(--secondary)' }} data-aos="fade-down">
          Our Full Menu
        </h1>
        <p style={{ color: 'var(--text-dark)', opacity: 0.8, fontSize: '1.2rem', marginTop: '1rem' }} data-aos="fade-up" data-aos-delay="200">
          Discover all our delicious offerings categorized for your convenience.
        </p>
      </div>

      <div className="filters-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="search-sort" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search for a magical treat..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.8rem 1.2rem', borderRadius: '0', border: '1px solid var(--accent)', flex: '1', minWidth: '250px', outline: 'none' }}
          />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '0.8rem 1.2rem', borderRadius: '0', border: '1px solid var(--accent)', outline: 'none', backgroundColor: '#fff', color: 'var(--text-dark)', cursor: 'pointer' }}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', width: '100%' }}>
          <button 
            className="nav-arrow"
            onClick={scrollLeft}
            aria-label="Scroll left"
            style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            &#8592;
          </button>
          
          <div 
            className="category-nav" 
            ref={scrollRef}
            style={{ 
              display: 'flex', 
              gap: '0.8rem', 
              overflowX: 'auto', 
              padding: '0.5rem 0', 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              flex: 1, 
              scrollBehavior: 'smooth' 
            }}
          >
            <style>{`.category-nav::-webkit-scrollbar { display: none; }`}</style>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '0',
                  border: activeCategory === cat ? 'none' : '1px solid var(--primary)',
                  backgroundColor: activeCategory === cat ? '#FFFFFF' : 'transparent',
                  color: activeCategory === cat ? 'var(--text-dark)' : 'var(--primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  fontWeight: activeCategory === cat ? 'bold' : 'normal',
                  boxShadow: activeCategory === cat ? '0 4px 10px rgba(111, 29, 27, 0.2)' : 'none'
                }}
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
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="products-grid">
        {displayProducts.length > 0 ? (
          displayProducts.map((product, i) => (
            <div key={`${product.id}-${i}`} className="product-card" data-aos="fade-up" style={{ position: 'relative', overflow: 'visible' }}>
              <div className="product-img-wrapper" style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', borderRadius: '0' }}>
                <p style={{ color: '#888', fontStyle: 'italic', padding: '1rem', textAlign: 'center' }}>{product.image}</p>
              </div>
              <div className="product-info">
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)', fontWeight: 'bold' }}>
                  {product.categoryName}
                </span>
                <h3 style={{ marginTop: '0.3rem' }}>{product.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>{product.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                  <p className="price" style={{ margin: 0 }}>₹{product.price}</p>
                  <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => addToCart(product)}>Add</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-dark)' }}>
            <h3>No magical treats found!</h3>
            <p style={{ opacity: 0.8, marginTop: '1rem' }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default Products;
