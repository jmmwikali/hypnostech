import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';

const Getproducts = () => {

  // Initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Declare the navigate hook
  const navigate = useNavigate();

  // Below we specify the image base URL
  const img_url = "https://jmmwikali.alwaysdata.net/static/images/" 

  // Create a function to help you fetch the products from your API
  const fetchProducts = async() => {
    try{

      // Update the loading hook.
      setLoading(true);

      // Interact with your endpoint for fetching the products.
      const response = await axios.get("https://jmmwikali.alwaysdata.net/api/get_products")

      // Update the products hook with the response given from the api
      setProducts(response.data);

      // Set the loading hook back to default
      setLoading(false);
    }
    catch(error){
      // If there is an error:
      // Set loading hook back to default
      setLoading(false)

      // Update the error hook with a message
      setError(error.message)
    }
  }

  // We shall use the useEffect hook. This hook enables us to outomatically re-render new features incase of any changes
  useEffect(() => {
    fetchProducts()
  }, []);

  // console.log(products)


  return (
    <div className='get'>

      <div style={{ display: 'flex',justifyContent: 'space-between'}}>
        <span className='fw-bold display-6 m-3' style={{ color: ' #1F2A37' }}>Hypnos Tech</span>
        <div>
          <Link className='btn btn-outline-primary me-2 mt-4' to={"/signup"} style={{ width: '100px' }} >Sign Up</Link>
          <Link className='btn btn-primary me-2 mt-4' to={"/signin"} style={{ width: '100px' }} >Sign In</Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginLeft: '50px'}}>
        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link className='navs'>All Categories</Link>
        <Link className='ms-4 navs'>Sort By</Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px'}}>
        <Link className='pages active'>Products</Link>
        <Link className='pages divider'>View Cart</Link>
        <Link className='pages divider' to={"/addproducts"}>Add Products</Link>

      </div>

      <div className="search-card">
        <input type="text" placeholder='Search for an item' />
        
        <button><span><img src="/images/search.png" alt="" width="20px" /></span> Search</button>
      </div>

      <div className='welcome'>
        <h2 className='pt-4'>Welcome to Hypnos Tech</h2>

        <div className='info'> 
          <span className='ms-5'><img src="images/delivery.png" alt="delivery icon" width="25px"/> Fast Shipping</span>
          <span><img src="images/check.png" alt="check icon" width="25px"/> Secure Payments</span>
          <span className='me-5'><img src="images/dart.png" alt="dart icon" width="25px"/> Top Quality Products</span>
        </div>
      </div>

      {loading && <Loader text="Loading products..."/> }
      <h4 className="text-danger">{error}</h4>

      {/* Map the products fetched from the api to the user interface */}

      <div className='top-deals row mx-3 ms-5'>
        <h3>Top Deals</h3>
        <p>Score the lowest prices on Hypnos Tech</p> <br />

        {products.slice(0, 4).map((product) => (
        
          <div className="col-md-3" >
            <div>
              <img 
            src={img_url + product.product_photo} 
            alt="product photo"
            className='product_img my-2' />
            </div>

            <div className="card-body">
              <h5 style={{ color: '#0F52BA'}}>{product.product_name.slice(0, 18)}</h5>

              <div className="badge">
                <span className="arrow">↓</span>
                <span className="amount">Ksh {product.product_cost}</span> <br />
              </div> 

              <button className="w-100 purchase" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
            </div>
          </div>
          
        ) )} 
        
      </div> <br />

      <h3 className='ms-3'>Best Selling Products</h3>

      <div className="cards-container">
        

        {products.slice(4, 20).map((product) => (
        
        <div className="card">
          <div>
            <img 
          src={img_url + product.product_photo} 
          alt="product photo"
          className='card-img' />
          </div>

          <div className="card-body">
            <h5 className="text-primary">{product.product_name}</h5>

            <p className="text-dark">{product.product_description.slice(0,100)}...</p>

            <h4 className="price-tag">KES {product.product_cost} </h4>

            <button className="purchase w-100" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
          </div>
        </div>
        
      ) )}
      </div>

      <div className='row footer'>
        <div className="col-md-6">
          <h3>Customer Support</h3>
          <input type="email"
          placeholder='Enter your email'
          className='form-control'
          required /> <br />
          
          <textarea
           placeholder='How can we help you?'
           className='form-control'
           required></textarea>

          <a href="mailto:jmmwikali936@gmail.com" className='btn btn-primary mt-4'>Send Message</a>
        </div>

        <div className="col-md-6 mt-5">
          <h5>Stay updated with our newest products and special offers—follow us on:</h5>

          <a href="https://www.instagram.com" target='blank'><img src="/images/instagram.png" alt="instagram icon" width="50px" /></a>
          <a href="https://www.tiktok.com" target='blank'><img src="/images/tik-tok.png" alt="tiktok icon" width="50px"  className='mx-3'/></a>
          <a href="https://www.facebook.com" target='blank'><img src="/images/facebook.png" alt="facebook icon" width="50px" /></a>
          <a href="https://www.twitter.com" target='blank'><img src="/images/twitter.png" alt="twitter icon" width="50px" className='mx-3'/></a>
        </div>

      </div>

      <footer className="text-center text-white bg-dark p-2">
          <b>Developed by Jessica. &copy; 2026 All rights Reserved</b>
      </footer>

      

    </div>
  )
}

export default Getproducts;
