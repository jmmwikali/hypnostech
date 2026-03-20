import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

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
    <div className='row'>
      <h3 className="text-primary">Availabe Products</h3>

      {loading && <Loader /> }
      <h4 className="text-danger">{error}</h4>

      {/* Map the products fetched from the api to the user interface */}

      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-3">
          <div className="card shadow">
            <img 
            src={img_url + product.product_photo} 
            alt="product photo"
            className='product_img mt-2' />

            <div className="card-body">
              <h5 className="text-primary">{product.product_name}</h5>

              <p className="text-dark">{product.product_description.slice(0,100)}...</p>

              <h4 className="text-warning">KES {product.product_cost} </h4>

              <button className="btn btn-success w-100" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
            </div>
          </div>
        </div>
      ) )}

    </div>
  )
}

export default Getproducts;
