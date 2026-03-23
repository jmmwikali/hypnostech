import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';

const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dropdownRef = useRef(null);

  const [sortOrder, setSortOrder] = useState("");
  const [showSort, setShowSort] = useState(false);
  const sortRef = useRef(null);

  const navigate = useNavigate();

  const img_url = "https://jmmwikali.alwaysdata.net/static/images/"

  const categories = ["All", ...new Set(products.map((p) => p.product_category).filter(Boolean))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setSearchQuery("");
    if (category === "All") {
      setFilteredProducts(products.slice(4));
      return;
    }
    const results = products.filter((p) => p.product_category === category);
    setFilteredProducts(results);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setShowSort(false);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "high-to-low"
        ? b.product_cost - a.product_cost
        : a.product_cost - b.product_cost
    );
    setFilteredProducts(sorted);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products.slice(4));
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(q) ||
        p.product_description.toLowerCase().includes(q)
    );
    setFilteredProducts(results);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setFilteredProducts(products.slice(4));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategories(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jmmwikali.alwaysdata.net/api/get_products")
      setProducts(response.data);
      setFilteredProducts(response.data.slice(4));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ── Shared dropdown styles ── */
  const dropdownContainerStyle = {
    position: 'absolute',
    top: '30px',
    left: '0',
    backgroundColor: 'rgba(13, 27, 62, 0.97)',
    border: '1px solid rgba(123, 143, 212, 0.22)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(11,15,26,0.5)',
    zIndex: 1000,
    minWidth: '210px',
    overflow: 'hidden',
    backdropFilter: 'blur(14px)',
  };

  const dropdownItemStyle = (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: isActive ? '#B8C4E8' : '#7B8FD4',
    backgroundColor: isActive ? 'rgba(74,107,214,0.18)' : 'transparent',
    fontWeight: isActive ? '600' : '400',
    borderBottom: '1px solid rgba(123,143,212,0.1)',
    transition: 'background 0.15s',
    fontFamily: "'Nunito', sans-serif",
  });

  return (
    <div className='get'>

      {/* ── Navbar ── */}
      <div className="navbar-wrap">
        <span className='brand-logo fw-bold display-6'>
          <span className="moon-icon">☽</span> Hypnos Tech
        </span>
        <div>
          <Link className='btn btn-outline-primary me-2' to={"/signup"} style={{ width: '100px' }}>Sign Up</Link>
          <Link className='btn btn-primary me-2' to={"/signin"} style={{ width: '100px' }}>Sign In</Link>
        </div>
      </div>

      {/* ── Sub-nav: Categories & Sort ── */}
      <div style={{ display: 'flex', gap: '8px', marginLeft: '50px', marginTop: '14px', position: 'relative' }} ref={dropdownRef}>
        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <span
          className='navs'
          onClick={() => setShowCategories(!showCategories)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          All Categories
          <span style={{ fontSize: '10px' }}>{showCategories ? '▲' : '▼'}</span>
        </span>

        {showCategories && (
          <div style={{ ...dropdownContainerStyle, left: '30px' }}>
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category)}
                style={dropdownItemStyle(selectedCategory === category)}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category)
                    e.currentTarget.style.backgroundColor = 'rgba(123,143,212,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category)
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}

        <div style={{ position: 'relative' }} ref={sortRef}>
          <span
            className='ms-4 navs'
            onClick={() => setShowSort(!showSort)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Sort By
            <span style={{ fontSize: '10px' }}>{showSort ? '▲' : '▼'}</span>
          </span>

          {showSort && (
            <div style={dropdownContainerStyle}>
              {[
                { label: "Price: High to Low", value: "high-to-low" },
                { label: "Price: Low to High", value: "low-to-high" }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  style={dropdownItemStyle(sortOrder === option.value)}
                  onMouseEnter={(e) => {
                    if (sortOrder !== option.value)
                      e.currentTarget.style.backgroundColor = 'rgba(123,143,212,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (sortOrder !== option.value)
                      e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Page tabs ── */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '28px' }}>
        <Link className='pages active'>Products</Link>
        <Link className='pages divider'>View Cart</Link>
        <Link className='pages divider' to={"/addproducts"}>Add Products</Link>
      </div>

      {/* ── Search bar ── */}
      <div className="search-card">
        <input
          type="text"
          placeholder='Search for a sleep device…'
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <span><img src="/images/search.png" alt="" width="18px" /></span>
          Search
        </button>
      </div>

      {/* ── Welcome / Hero banner ── */}
      <div className='welcome'>
        <h2>Rest Smarter. Sleep Better.</h2>
        <p className="tagline">Premium sleep technology, crafted for deeper recovery</p>
        <div className='info'>
          <span><img src="images/delivery.png" alt="delivery icon" width="22px" /> Fast Shipping</span>
          <span><img src="images/check.png" alt="check icon" width="22px" /> Secure Payments</span>
          <span><img src="images/dart.png" alt="dart icon" width="22px" /> Top Quality Products</span>
        </div>
      </div>

      {/* ── Loader & errors ── */}
      {loading && <Loader text="Fetching your sleep devices…" />}
      <h4 className="text-danger ms-3">{error}</h4>

      <br />

      {/* ── Best Selling Products ── */}
      <h3 className='section-heading ms-3'>
        <span className="moon-accent">☽</span>
        Best Selling Products
        {selectedCategory !== "All" && (
          <span style={{ fontSize: '1.1rem', color: '#7B8FD4', marginLeft: '10px', fontWeight: '700', fontFamily: "'Nunito', sans-serif" }}>
            — {selectedCategory}
            <span
              onClick={() => handleCategorySelect("All")}
              style={{ cursor: 'pointer', marginLeft: '9px', color: '#E05A6A', fontSize: '1rem' }}>
              ✕
            </span>
          </span>
        )}
      </h3>

      <br />

      <div className="cards-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <div>
                <img
                  src={img_url + product.product_photo}
                  alt="product photo"
                  className='card-img' />
              </div>
              <div className="card-bod">
                <h5 className="text-primary" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{product.product_name}</h5>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{product.product_description.slice(0, 100)}…</p>
                <h4 className="price-tag">KES {product.product_cost}</h4>
                <button
                  className="purchase w-100"
                  onClick={() => navigate("/makepayment", { state: { product } })}>
                  Purchase Now
                </button>
                <button
                  className="w-50 edit-button mt-1"
                  onClick={() => navigate("/editproduct", { state: { product } })}>
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No results found for "<strong>{selectedCategory !== "All" ? selectedCategory : searchQuery}</strong>"</p>
        )}
      </div>

      <br />

      {/* ── Top Deals ── */}
      <div className='top-deals row mx-3'>
        <h3><span style={{ color: '#C9A84C', marginRight: '8px' }}>✦</span> Top Deals</h3>
        <p>Score the lowest prices on Hypnos Tech sleep devices</p>

        {products.slice(0, 4).map((product) => (
          <div className="col-md-3" key={product.id}>
            <div>
              <img
                src={img_url + product.product_photo}
                alt="product photo"
                className='product_img my-2' />
            </div>
            <div className="card-body">
              <h5 style={{ color: '#7B8FD4', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{product.product_name.slice(0, 19)}</h5>
              <div className="badge">
                <span className="arrow">↓</span>
                <span className="amount">Ksh {product.product_cost}</span>
              </div>
              <button
                className="w-100 purchase"
                onClick={() => navigate("/makepayment", { state: { product } })}>
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Getproducts;
