import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AnimatedButterfly from './AnimatedButterfly';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import SidebarCart from './SidebarCart';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';


const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const cursorDotRef = React.useRef(null);
  const cursorRingRef = React.useRef(null);
  const cursorExpand = false;
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);





  useEffect(() => {
    AOS.init({ once: true, offset: 100 });
    
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
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

  const toggleDarkMode = (e) => {
    e.preventDefault();
    const isDark = !darkMode;
    
    // Calculate click coordinates for the circle origin
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Fallback for browsers that don't support startViewTransition
    if (!document.startViewTransition) {
      setDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return;
    }

    const transition = document.startViewTransition(() => {
      setDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : clipPath.reverse()
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
        }
      );
    });
  };

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
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Logo Image */}
              <img 
                src="/images/butterly-logo-main.png" 
                alt="Butterly Bakery Logo" 
                style={{ 
                  height: scrolled ? '80px' : '150px', 
                  transition: 'height 0.4s ease, transform 0.4s ease',
                  objectFit: 'contain',
                  marginTop: scrolled ? '0' : '10px',
                  marginBottom: scrolled ? '0' : '25px',
                  transform: scrolled ? 'scale(1.5)' : 'scale(2.5)',
                  filter: 'brightness(1.3)'
                }} 
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
              <li><NavLink to="/customizations" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Customization</NavLink></li>
              <li><NavLink to="/bulk-orders" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Bulk/Corporate</NavLink></li>
              <li><NavLink to="/about" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>About</NavLink></li>
              <li><NavLink to="/contact" onMouseEnter={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3'); a.volume=0.1; a.play().catch(()=>{}); }}>Contact</NavLink></li>
              <li>
                <a href="#" onClick={toggleDarkMode}>
                  {darkMode ? '☀️' : '🌙'}
                </a>
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
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
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
      <a href="https://wa.me/919876543210" className="whatsapp-btn" target="_blank" rel="noreferrer" style={{ bottom: '30px', right: '30px' }}>
        💬
      </a>



      {/* Floating Cart Button */}
      <button 
        className="btn" 
        style={{ position: 'fixed', bottom: '100px', right: '30px', zIndex: 9999, borderRadius: '50px', padding: '12px 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', fontSize: '0.9rem' }}
        onClick={() => setIsCartOpen(true)}
      >
        🛍️ {totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}
      </button>

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
            borderRadius: '15px'
          }
        }}
      />
    </>
  );
};

export default Layout;
