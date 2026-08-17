import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import AnimatedButterfly from './AnimatedButterfly';
const SidebarCart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsCartOpen(false); // Close cart so we can see the explosion!
    setShowConfetti(true);
    
    // Proceed to WhatsApp
    let message = "Hi Butterly Bakery! I'd like to order:\n\n";
    cartItems.forEach(item => {
      message += `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal: ₹${cartTotal}\n\nPlease confirm my order. ✨`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = whatsappUrl;
      setTimeout(() => setShowConfetti(false), 2000);
    }, 2500); // 2.5 seconds to enjoy confetti before redirect!
  };

  if (!isCartOpen && !showConfetti) return null;

  return (
    <>
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999, backgroundColor: 'rgba(10, 10, 10, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ position: 'relative', textAlign: 'center', animation: 'zoomIn 0.5s ease-out forwards' }}>
            <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: '3rem', color: '#F9A03F' }}>Thank you from the heart ❤️✨</h1>
          </div>
        </div>
      )}
      
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart <AnimatedButterfly style={{ width: 24, height: 24, display: 'inline-block' }} /></h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧺</div>
                  <p>Your magical cart is empty.</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    {/* Product thumbnail */}
                    {item.image && (
                      <div style={{ width: '60px', height: '60px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0', flexShrink: 0, marginRight: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    )}
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Total:</h3>
                  <h3>₹{cartTotal}</h3>
                </div>
                <button className="btn" style={{ width: '100%', marginTop: '1rem', background: '#25D366', color: 'white' }} onClick={handleCheckout}>
                  Checkout via WhatsApp ✨
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarCart;
