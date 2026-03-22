import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Addproducts = () => {

  const navigate = useNavigate()

  // Introduce the hooks
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // Declare the additional hooks to manage the state of the application
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a function that will handle the submit action
  const handleSubmit = async (e) => {
    // Prevent the site from reloading
    e.preventDefault()

    // Set loading hook with a message (activate it)
    setLoading(true)

    try{
      // Create a form data
      const formdata = new FormData()

      // Append the details to the formdata created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // Interact with axios to help you use the method post
      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/add_product", formdata);

      // Set the loading hook back to default
      setLoading(false)

      // Update the success hook with a message
      setSuccess(response.data.message)

      
      // Clearing the hooks/setting them back to default/empty
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error){
      // Set loading hook back to default
      setLoading(false);

      // Update the error hook with a message
      setError(error.message);
    }
  }

  return (
    <div className='add'>

      <div style={{ display: 'flex',justifyContent: 'space-between'}}>
        <span className='fw-bold display-6 m-3' style={{ color: ' #1F2A37' }}>Hypnos Tech</span>
        <div>
          <Link className='btn btn-outline-primary me-2 mt-4' to={"/signup"} style={{ width: '100px' }} >Sign Up</Link>
          <Link className='btn btn-primary me-2 mt-4' to={"/signin"} style={{ width: '100px' }} >Sign In</Link>
        </div>
      </div>

      <div>
            <input type="button"
            className="back-button ms-5"
            value="← Back"
            onClick={() => navigate("/")} />
        </div>

    <div className='row justify-content-center mt-5'>
      <div className="col-md-6 p-4 card shadow" style={{ background: '#F5F7FA' }}>
        <center><h1 className="fw-bold "style={{color: '#0F52BA'}}>Add a Product</h1></center>

        {/* Bind the loading hook */}
        {loading && <Loader />}
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>

          <input type="text"
          placeholder='Enter the product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)} /> <br />

          {/* {product_name} */}

          <input type="text"
          placeholder='Enter the product description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)} /> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter the price of the product'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)} /> <br />

          {/* {product_cost} */}

          <label>Product Image</label>
          <input type="file"
          className='form-control'
          required
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />

          {/* {product_photo} */}

          <input type="submit"
          value={"Add Device"}
          className='button w-100' />
        </form>
      </div>
      
    </div>
    </div>
  )
}

export default Addproducts;
