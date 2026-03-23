import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const img_url = "https://jmmwikali.alwaysdata.net/static/images/";

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
  }, []);

  // Persist every change back to localStorage
  const saveCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleIncrease = (productId) => {
    const updated = cartItems.map((item) =>
      item.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
  };

  const handleDecrease = (productId) => {
    const updated = cartItems
      .map((item) =>
        item.product_id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const handleRemove = (productId) => {
    const updated = cartItems.filter((item) => item.product_id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

  return (
    <div className="cart-page">

      {/* ── Navbar ── */}
      <div className="navbar-wrap">
        <span className="brand-logo fw-bold">
          <span className="moon-icon">☽</span> Hypnos Tech
        </span>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/signup" style={{ width: '100px' }}>Sign Up</Link>
          <Link className="btn btn-primary me-2" to="/signin" style={{ width: '100px' }}>Sign In</Link>
        </div>
      </div>

      {/* ── Page tabs ── */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '28px', alignItems: 'center' }}>
        <Link className="pages" to="/">Products</Link>
        <Link className="pages active divider" style={{ position: 'relative' }}>
          🛒 View Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        <Link className="pages divider" to="/addproducts">Add Products</Link>
      </div>

      {/* ── Page heading ── */}
      <div style={{ textAlign: 'center', padding: '36px 20px 8px' }}>
        <span style={{ fontSize: '2rem', color: '#C9A84C' }}>🛒</span>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#E8ECF7', margin: '8px 0 4px' }}>
          Your Cart
        </h2>
        <p style={{ color: 'rgba(184,196,232,0.6)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
        </p>
      </div>

      <div className="cart-layout">

        {/* ── Cart items list ── */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span style={{ fontSize: '4rem' }}>☽</span>
              <p style={{ fontSize: '1.1rem', marginTop: '16px' }}>No items yet — browse our sleep devices</p>
              <button className="button" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item-card" key={item.product_id}>

                <img
                  src={img_url + item.product_photo}
                  alt={item.product_name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <h5 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#B8C4E8', margin: '0 0 4px' }}>
                    {item.product_name}
                  </h5>
                  <p style={{ fontSize: '0.82rem', margin: '0 0 10px', color: 'rgba(184,196,232,0.6)' }}>
                    {item.product_description?.slice(0, 80)}…
                  </p>
                  <span className="price-tag" style={{ fontSize: '0.9rem' }}>
                    KES {(item.product_cost * item.quantity).toLocaleString()}
                  </span>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(184,196,232,0.4)', margin: '4px 0 0' }}>
                    KES {Number(item.product_cost).toLocaleString()} each
                  </p>
                </div>

                <div className="cart-item-controls">
                  {/* Quantity stepper */}
                  <div className="qty-stepper">
                    <button className="qty-btn" onClick={() => handleDecrease(item.product_id)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(item.product_id)}>+</button>
                  </div>

                  {/* Checkout for this item */}
                  <button
                    className="purchase"
                    style={{ fontSize: '0.82rem', padding: '7px 12px', marginTop: '8px', width: '100%' }}
                    onClick={() => navigate('/makepayment', { state: { product: item } })}>
                    Buy Now
                  </button>

                  {/* Remove */}
                  <button className="cart-remove-btn" onClick={() => handleRemove(item.product_id)}>
                    Remove
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* ── Order summary ── */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h4 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#E8ECF7', marginBottom: '20px', fontSize: '1.4rem' }}>
              Order Summary
            </h4>

            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>KES {totalCost.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#2ECC8E' }}>Free</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>KES {totalCost.toLocaleString()}</span>
            </div>

            <button
              className="button w-100"
              style={{ marginTop: '20px', fontSize: '1rem' }}
              onClick={() => navigate('/makepayment', { state: { product: { ...cartItems[0], product_cost: totalCost, product_name: `Cart (${totalItems} items)` } } })}>
              Checkout All — KES {totalCost.toLocaleString()}
            </button>

            <button
              className="cart-remove-btn"
              style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}
              onClick={handleClearCart}>
              🗑 Clear Cart
            </button>

            <button
              className="edit-button"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => navigate('/')}>
              ← Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
