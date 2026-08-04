import React from 'react';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="cart-overlay" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', maxWidth: '500px', width: '90%', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'zoomIn 0.3s ease', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'none', color: 'var(--text-dark)' }}>×</button>
        
        <div style={{ width: '100%', height: '200px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', marginBottom: '1.5rem', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}></div>
        
        <h2 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{product.name}</h2>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>₹{product.price}</h3>
        
        <p style={{ color: 'var(--text-dark)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {product.description || "A magically crafted pastry baked with love and a sprinkle of fairy dust."}
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ flex: 1 }} onClick={() => { addToCart(product); onClose(); }}>Add to Cart ✨</button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
