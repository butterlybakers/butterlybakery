import React, { useState } from 'react';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';

import AnimatedButterfly from '../components/AnimatedButterfly';

const productsList = [
  {
    id: 'p1',
    name: 'Chocolate Truffle Cake',
    price: 150,
    description: 'Decadent, rich, and utterly irresistible. Our signature chocolate experience with a delicate coconut crunch.',
    image: '/images/truffle_cake_1785271864770.png',
    spell: 'Spell of Eternal Indulgence',
    rune: '✦',
    ingredients: ['Belgian chocolate', 'Coconut crumble', 'Ganache drizzle'],
  },
  {
    id: 'p2',
    name: 'Korean Cream Cheese Bun',
    price: 120,
    description: 'Soft, fluffy, and filled with creamy, buttery garlic goodness. A savory-sweet masterpiece.',
    image: '/images/cream_bun_1785271874235.png',
    spell: 'Enchantment of Morning Warmth',
    rune: '❧',
    ingredients: ['Cream cheese', 'Garlic butter', 'Brioche dough'],
  },
  {
    id: 'p3',
    name: 'Classic Tres Leches',
    price: 180,
    description: 'A light, airy sponge cake soaked in three kinds of milk. The ultimate melt-in-your-mouth experience.',
    image: '/images/tres_leches_1785271883022.png',
    spell: 'Potion of Cloudlike Bliss',
    rune: '☽',
    ingredients: ['Whole milk', 'Condensed milk', 'Whipped cream'],
  },
  {
    id: 'p4',
    name: 'Macaron Box (6 pcs)',
    price: 450,
    description: 'A beautiful assortment of our delicate, melt-in-your-mouth macarons. Comes in various magical flavors.',
    image: '/images/macarons_1785271892400.png',
    spell: 'Aria of Colorful Dreams',
    rune: '✿',
    ingredients: ['Almond flour', 'French meringue', 'Magical ganache'],
  },
];

const Products = () => {
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="section-container" style={{ paddingTop: '4rem', minHeight: '100vh', position: 'relative' }}>
      


      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: '3.5rem', color: 'var(--secondary)' }} data-aos="fade-down">
          Our Enchanted Menu
        </h1>
        <p style={{ color: 'var(--text-dark)', opacity: 0.8, fontSize: '1.2rem', marginTop: '1rem' }} data-aos="fade-up" data-aos-delay="200">
          Discover our magical creations crafted with passion and fairy dust.
        </p>
      </div>

      <div className="products-grid">
        {productsList.map((product, i) => (
          <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={i * 150} style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="product-img-wrapper" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '15px 15px 0 0' }}>
              <div className="product-card-overlay">
                <button className="btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }} onClick={() => setSelectedProduct(product)}>View Details</button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
              {/* Optional Ingredients display if they want it */}
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {product.ingredients.map((ing, j) => (
                  <span key={j} style={{ fontSize: '0.75rem', color: 'var(--secondary)', background: 'rgba(249, 160, 63, 0.1)', border: '1px solid var(--accent)', borderRadius: '4px', padding: '0.2rem 0.5rem' }}>
                    {ing}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <p className="price">₹{product.price}</p>
                <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => addToCart(product)}>Add ✨</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default Products;
