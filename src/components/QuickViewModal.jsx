import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selections, setSelections] = useState({});

  useEffect(() => {
    if (product?.options) {
      const initialSelections = {};
      product.options.forEach(opt => {
        initialSelections[opt.name] = opt.choices[0].label;
      });
      setSelections(initialSelections);
    }
  }, [product]);

  if (!product) return null;

  let currentPrice = product.basePrice || product.price;
  let variantText = '';
  
  if (product.options) {
    product.options.forEach(opt => {
      const selectedChoice = opt.choices.find(c => c.label === selections[opt.name]);
      if (selectedChoice) {
        currentPrice += selectedChoice.priceModifier || 0;
        variantText += ` ${selectedChoice.label}`;
      }
    });
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      id: product.options ? `${product.id}-${Object.values(selections).join('-')}` : product.id,
      name: product.options ? `${product.name} (${Object.values(selections).join(', ')})` : product.name,
      price: currentPrice
    };
    addToCart(cartItem);
    onClose();
  };

  return (
    <div className="cart-overlay" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '12px', right: '16px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}
        >
          ×
        </button>
        
        <div style={{ 
          width: '100%', 
          height: '220px', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.25rem', 
          overflow: 'hidden',
          background: 'var(--bg-warm)'
        }}>
          {product.image && product.image.startsWith('/') ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.85rem' }}>Image coming soon</p>
            </div>
          )}
        </div>
        
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{product.name}</h2>
        <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem' }}>₹{currentPrice}</p>
        
        <p style={{ color: 'var(--text-body)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.92rem' }}>
          {product.description || "A delicious treat baked fresh with premium ingredients."}
        </p>

        {product.options && product.options.map(opt => (
          <div key={opt.name} style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>{opt.name}</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {opt.choices.map(choice => (
                <button
                  key={choice.label}
                  onClick={() => setSelections(prev => ({ ...prev, [opt.name]: choice.label }))}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${selections[opt.name] === choice.label ? 'var(--primary)' : 'var(--border-light)'}`,
                    background: selections[opt.name] === choice.label ? 'var(--primary-pale)' : 'var(--bg-card)',
                    color: selections[opt.name] === choice.label ? 'var(--primary)' : 'var(--text-body)',
                    cursor: 'pointer'
                  }}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} onClick={handleAddToCart}>
          Add to Cart - ₹{currentPrice}
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;
