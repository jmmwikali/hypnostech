import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    const {product} = useLocation().state || {}

    const img_url = "https://jmmwikali.alwaysdata.net/static/images/"

    const navigate = useNavigate()

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const formdata = new FormData()
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

            setLoading(false);
            setSuccess(response.data.message);
        }
        catch(error){
            setLoading(false);
            setError(error.message);
        }
    }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>

      {/* ── Page heading ── */}
      <div style={{ textAlign: 'center', paddingTop: '32px', marginBottom: '8px' }}>
        <span style={{ fontSize: '2.2rem', color: '#C9A84C' }}>☽</span>
        <h1 className="heading" style={{ marginTop: '4px' }}>Lipa na M-Pesa</h1>
        <p style={{ color: 'rgba(184,196,232,0.6)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Secure checkout for your sleep device
        </p>
      </div>

      {/* ── Back button ── */}
      <div style={{ padding: '0 28px 16px' }}>
        <input type="button"
          className="back-button"
          value="← Back"
          onClick={() => navigate("/")} />
      </div>

      {/* ── Product + Payment card ── */}
      <div className="row justify-content-center">
        <div className="col-md-6 card shadow p-4 mt-2">

          <img
            src={img_url + product.product_photo}
            alt="Product Photo"
            className='card-img2' />

          <div className="card-body" style={{ padding: '16px 0 0' }}>
            <h2 className="text-primary" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
              {product.product_name}
            </h2>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{product.product_description}</p>

            <div className="price-tag" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              KES {product.product_cost}
            </div>

            <form onSubmit={handleSubmit}>
              {loading && <Loader />}
              <h3 className="text-success">{success}</h3>
              <h4 className="text-danger">{error}</h4>

              <input type="tel"
                className='form-control'
                placeholder='Phone number: 254XXXXXXX'
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)} />
              <br />

              <input type="submit"
                value="Complete Payment"
                className='purchase w-100'
                style={{ fontSize: '1rem', padding: '12px' }} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Makepayment;
