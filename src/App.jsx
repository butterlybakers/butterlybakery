import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import IntroScreen from './components/IntroScreen';
import ScrollToTop from './components/ScrollToTop';

import About from './pages/About';
import Products from './pages/Products';
import Customizations from './pages/Customizations';
import BulkOrders from './pages/BulkOrders';
import Contact from './pages/Contact';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {!introFinished && <IntroScreen onComplete={() => setIntroFinished(true)} />}
      <div style={{ display: introFinished ? 'block' : 'none' }}>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="customizations" element={<Customizations />} />
                <Route path="bulk-orders" element={<BulkOrders />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
