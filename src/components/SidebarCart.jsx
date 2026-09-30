import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../config';

const SidebarCart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = (e) => {
    e.preventDefault();
    
    let message = "Hi Butterly Bakery! I'd like to order:\n\n";
    cartItems.forEach(item => {
      message += `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal: ₹${cartTotal}\n\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setIsCartOpen(false);
    window.location.href = whatsappUrl;
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.95rem' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}>Browse our menu and add items to get started.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                {item.image && item.image.startsWith('/') && (
                  <div className="cart-item-thumb" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                )}
                <div className="cart-item-info" style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} style={{ fontSize: '0.75rem' }}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <h3 style={{ fontSize: '1rem' }}>Total</h3>
              <h3 style={{ fontSize: '1rem' }}>₹{cartTotal}</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', background: 'var(--bg-warm)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
              <strong>* Store Pickup Only *</strong>
            </p>
            <button 
              className="btn" 
              style={{ width: '100%', marginTop: '1rem', background: '#25D366', color: 'white', borderRadius: 'var(--radius-md)', justifyContent: 'center' }} 
              onClick={handleCheckout}
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarCart;
