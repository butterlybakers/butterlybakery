import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AnimatedButterfly from './AnimatedButterfly';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import SidebarCart from './SidebarCart';
import { useCart } from '../context/CartContext';


const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [loading, setLoading] = useState(true);


  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);




  useEffect(() => {
    AOS.init({ once: true, offset: 100 });
  }, []);

  useEffect(() => {
    // Reset AOS on route change
    AOS.refresh();
    
    // Simulate premium loader
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollTotal > 0) {
        setScrollProgress((window.scrollY / scrollTotal) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      {/* Page Loader */}
      {loading && (
        <div id="page-loader" style={{ opacity: loading ? 1 : 0 }}>
          <div className="loader-butterflies">
            <AnimatedButterfly style={{ width: 60, height: 60, animationDelay: '0s' }} />
            <AnimatedButterfly style={{ width: 80, height: 80, animationDelay: '0.1s' }} />
            <AnimatedButterfly style={{ width: 60, height: 60, animationDelay: '0.2s' }} />
          </div>
        </div>
      )}


      {/* Horizontal Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}>
          <div className="flying-butterfly">
            <AnimatedButterfly style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Background Blobs Removed per user request */}

      {/* Header */}
      <header id="main-header" className={scrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <div className="logo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <NavLink to="/" className="logo-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Logo Image */}
              <img 
                src="/images/butterly-logo-main.png" 
                alt="Butterly Bakery Logo" 
                className={`header-logo ${scrolled ? 'scrolled-logo' : ''}`}
              />
            </NavLink>
          </div>
          
          {/* Hamburger Icon */}
          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          </div>

          <nav style={{ marginTop: '10px' }} className={isMobileMenuOpen ? 'mobile-menu-open' : ''}>
            <ul onClick={() => setIsMobileMenuOpen(false)}>
              <li><NavLink to="/" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Home</NavLink></li>
              <li><NavLink to="/products" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Products</NavLink></li>
              <li><NavLink to="/customizations" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Custom Cakes</NavLink></li>
              <li><NavLink to="/bulk-orders" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Bulk/Corporate</NavLink></li>
              <li><NavLink to="/about" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>About</NavLink></li>
              <li><NavLink to="/contact" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Contact</NavLink></li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
                  onClick={() => setIsCartOpen(true)}
                >
                  <img src="/images/shopping-cart.png" alt="Cart" style={{ width: '30px', height: '30px' }} />
                  {totalItems > 0 && (
                    <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', padding: '2px 7px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                      {totalItems}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Rich Footer */}
      <footer style={{ background: 'var(--secondary)', color: '#FFF8E7', padding: '4rem 2rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: '"Cinzel", serif', fontSize: '1.8rem', color: '#F9A03F', marginBottom: '1rem' }}>Butterly Bakery</h3>
            <p style={{ opacity: 0.7, lineHeight: '1.8', fontSize: '0.95rem' }}>Where every bite is a fairy tale. Baked with love and a sprinkle of magic in Bangalore.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', fontSize: '1.5rem' }}>
              <a href="https://www.instagram.com/butterly.bakers?igsh=MTM1OTExcWxmenFpbg==" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', opacity: 0.8 }}>📸</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', opacity: 0.8 }}>💬</a>
              <a href="mailto:butterly.bakers@gmail.com" style={{ textDecoration: 'none', opacity: 0.8 }}>✉️</a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: '"Cinzel", serif', color: '#F9A03F', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['/', 'Home'], ['/products', 'Products'], ['/about', 'Our Story'], ['/customizations', 'Custom Cakes'], ['/bulk-orders', 'Bulk Orders'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><NavLink to={to} style={{ color: '#FFF8E7', textDecoration: 'none', opacity: 0.7, fontSize: '0.95rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity=1} onMouseLeave={e => e.target.style.opacity=0.7}>{label}</NavLink></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: '"Cinzel", serif', color: '#F9A03F', marginBottom: '1rem' }}>Visit Us</h4>
            <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.8' }}>📍 03, Sarjapura - Attibele Rd,<br/>Sarjapura, Karnataka 562125</p>
            <p style={{ opacity: 0.7, fontSize: '0.95rem', marginTop: '1rem' }}>📞 +91 98765 43210</p>
            <p style={{ opacity: 0.7, fontSize: '0.95rem', marginTop: '0.5rem' }}>🕐 Mon–Sat: 8am – 9pm</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>
          © 2026 Butterly Bakery. Crafted with passion & fairy dust. ✨
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/919876543210" className="whatsapp-btn" target="_blank" rel="noreferrer" style={{ bottom: '30px', right: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white" style={{ marginTop: '2px' }}>
          <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.553 4.186 1.603 6.014L.25 23.75l5.859-1.536c1.765.952 3.746 1.455 5.922 1.455 6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zm6.81 17.387c-.276.78-1.597 1.456-2.203 1.517-.606.061-1.398.118-4.225-1.047-3.415-1.408-5.65-4.945-5.819-5.176-.17-.23-1.385-1.846-1.385-3.522 0-1.676.878-2.497 1.189-2.825.31-.328.674-.412.898-.412.224 0 .448 0 .643.01.205.01.48-.078.75.57.27.649.927 2.261 1.008 2.424.081.163.136.35.027.57-.109.22-.163.35-.326.545-.163.194-.343.412-.489.558-.163.163-.336.34-.145.668.191.328.852 1.407 1.834 2.285 1.266 1.134 2.33 1.488 2.658 1.651.328.163.518.136.709-.081.191-.217.82-1.047 1.038-1.408.218-.36.436-.3.736-.191.3.109 1.895.894 2.222 1.057.327.163.545.245.626.381.082.136.082.79-.194 1.57z"/>
        </svg>
      </a>




      <SidebarCart />

      {/* Toaster for Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--glass-bg)',
            color: 'var(--text-dark)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '0'
          }
        }}
      />
    </>
  );
};

export default Layout;
