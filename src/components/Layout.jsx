import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import SidebarCart from './SidebarCart';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER, DISPLAY_PHONE, EMAIL_ADDRESS, BUSINESS_HOURS, BUSINESS_ADDRESS } from '../config';

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 80, duration: 700 });
  }, []);

  useEffect(() => {
    AOS.refresh();
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

      {/* Header */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <div className="logo-container">
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img 
                src="/images/butterly-logo-main.png" 
                alt="Butterly Bakery" 
                className="header-logo"
              />
            </NavLink>
          </div>

          {/* Hamburger */}
          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ position: 'relative' }}>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            {totalItems > 0 && !isMobileMenuOpen && (
              <span className="cart-badge hamburger-badge" style={{ position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', fontSize: '0.7rem' }}>{totalItems}</span>
            )}
          </div>

          <nav className={isMobileMenuOpen ? 'mobile-menu-open' : ''}>
            <ul onClick={() => setIsMobileMenuOpen(false)}>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/products">Menu</NavLink></li>
              <li><NavLink to="/customizations">Custom Cakes</NavLink></li>
              <li><NavLink to="/bulk-orders">Bespoke Orders</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li>
                <button 
                  className="cart-nav-btn"
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Open cart"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 01-8 0"></path>
                  </svg>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
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

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <h3>Butterly Bakery</h3>
              <p>Where every bite tells a story. Baked fresh daily with the finest ingredients in Bangalore.</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/butterly.bakers?igsh=MTM1OTExcWxmenFpbg==" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href={`mailto:${EMAIL_ADDRESS}`} aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                {[['/', 'Home'], ['/products', 'Full Menu'], ['/about', 'Our Story'], ['/customizations', 'Custom Cakes'], ['/bulk-orders', 'Bespoke Orders'], ['/contact', 'Contact Us']].map(([to, label]) => (
                  <li key={to}><NavLink to={to}>{label}</NavLink></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-links footer-contact">
              <h4>Visit Us</h4>
              <p>
                {BUSINESS_ADDRESS.split(', ').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}{i !== arr.length - 1 ? ',' : ''}<br/>
                  </React.Fragment>
                ))}<br/>
                {DISPLAY_PHONE}<br/>
                {BUSINESS_HOURS}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} Butterly Bakery. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="whatsapp-btn" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.553 4.186 1.603 6.014L.25 23.75l5.859-1.536c1.765.952 3.746 1.455 5.922 1.455 6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zm6.81 17.387c-.276.78-1.597 1.456-2.203 1.517-.606.061-1.398.118-4.225-1.047-3.415-1.408-5.65-4.945-5.819-5.176-.17-.23-1.385-1.846-1.385-3.522 0-1.676.878-2.497 1.189-2.825.31-.328.674-.412.898-.412.224 0 .448 0 .643.01.205.01.48-.078.75.57.27.649.927 2.261 1.008 2.424.081.163.136.35.027.57-.109.22-.163.35-.326.545-.163.194-.343.412-.489.558-.163.163-.336.34-.145.668.191.328.852 1.407 1.834 2.285 1.266 1.134 2.33 1.488 2.658 1.651.328.163.518.136.709-.081.191-.217.82-1.047 1.038-1.408.218-.36.436-.3.736-.191.3.109 1.895.894 2.222 1.057.327.163.545.245.626.381.082.136.082.79-.194 1.57z"/>
        </svg>
      </a>

      <SidebarCart />

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-dark)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            boxShadow: 'var(--shadow-md)'
          }
        }}
      />
    </>
  );
};

export default Layout;
