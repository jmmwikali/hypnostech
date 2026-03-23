import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const product = location.state?.product;

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Belt-and-suspenders check
    if (!isAdmin) {
      setMessage("Unauthorised: Admin access required.");
      return;
    }

    const formData = new FormData();
    if (productName.trim() !== "")       formData.append("product_name", productName);
    if (productDescription.trim() !== "") formData.append("product_description", productDescription);
    if (productCost.trim() !== "")        formData.append("product_cost", productCost);
    if (productPhoto)                     formData.append("product_photo", productPhoto);

    if ([...formData.keys()].length === 0) {
      setMessage("Please fill in at least one field to update.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://jmmwikali.alwaysdata.net/api/edit_product/${product.product_id}`,
        formData
      );
      setMessage(response.data.message);
      setLoading(false);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setLoading(false);
      setMessage(err.message);
    }
  };

  return (
    <div className="row container justify-content-center mt-5 ms-3 edit">
      <div className="card col-md-6 shadow p-4">

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '2rem', color: '#C9A84C' }}>✦</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#B8C4E8', fontWeight: 400, fontSize: '1.8rem', margin: '6px 0 0' }}>
            Edit Device Details
          </h2>
          <span className="role-badge role-badge--admin" style={{ marginTop: '8px', display: 'inline-block' }}>🛡 Admin</span>
        </div>

        {message && <h5 className={message.toLowerCase().includes("unauthor") ? "text-danger" : "text-success"}>{message}</h5>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product name</label>
            <input type="text" className="form-control" placeholder={product?.product_name}
              value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" placeholder={product?.product_description}
              value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (KES)</label>
            <input type="number" className="form-control" placeholder={product?.product_cost}
              value={productCost} onChange={(e) => setProductCost(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Product photo</label>
            <input type="file" className="form-control" accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])} />
            <small className="text-muted">Leave empty to keep the current photo</small>
          </div>
          <button type="submit" className="button w-100" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" className="edit-button w-100 mt-2" onClick={() => navigate("/")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
