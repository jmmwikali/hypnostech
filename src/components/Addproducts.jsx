import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Addproducts = () => {

  const navigate = useNavigate()

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_category, setProductCategory] = useState("")
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const formdata = new FormData()
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_category", product_category)
      formdata.append("product_photo", product_photo);

      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/add_product", formdata);

      setLoading(false)
      setSuccess(response.data.message)

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductCategory("")
      setProductPhoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error){
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='add'>

      {/* ── Navbar ── */}
      <div className="navbar-wrap">
        <span className='brand-logo fw-bold'>
          <span className="moon-icon">☽</span> Hypnos Tech
        </span>
        <div>
          <Link className='btn btn-outline-primary me-2' to={"/signup"} style={{ width: '100px' }}>Sign Up</Link>
          <Link className='btn btn-primary me-2' to={"/signin"} style={{ width: '100px' }}>Sign In</Link>
        </div>
      </div>

      <div style={{ padding: '20px 0 0 28px' }}>
        <input type="button"
          className="back-button"
          value="← Back"
          onClick={() => navigate("/")} />
      </div>

      <div className='row justify-content-center mt-4'>
        <div className="col-md-6 p-4 card shadow">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <span style={{ fontSize: '2rem', color: '#C9A84C' }}>☽</span>
            <h1 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: '#B8C4E8',
              fontWeight: 400,
              fontSize: '2rem',
              margin: '6px 0 0'
            }}>Add a Device</h1>
            <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'rgba(184,196,232,0.6)' }}>
              List a new sleep technology product
            </p>
          </div>

          {loading && <Loader />}
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>

            <input type="text"
              placeholder='Product name'
              className='form-control'
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)} />
            <br />

            <input type="text"
              placeholder='Product description'
              className='form-control'
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)} />
            <br />

            <input type="number"
              placeholder='Price (KES)'
              className='form-control'
              required
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)} />
            <br />

            <label className="form-label" htmlFor="product-category">Category</label>
            <select id="product-category" name="product_category" className='form-control'>
              <option value="Sleep Tracking">Sleep Tracking</option>
              <option value="Smart Sleep Devices">Smart Sleep Devices</option>
              <option value="Sleep Comfort">Sleep Comfort</option>
              <option value="Sleep Aids">Sleep Aids</option>
            </select>
            <br /><br />

            <label className="form-label">Product Image</label>
            <input type="file"
              className='form-control'
              required
              accept='image/*'
              onChange={(e) => setProductPhoto(e.target.files[0])} />
            <br />

            <input type="submit"
              value="Add Device"
              className='button w-100' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addproducts;
