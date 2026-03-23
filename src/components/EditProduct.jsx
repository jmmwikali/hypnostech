import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the product passed from Getproducts
  const product = location.state?.product;

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData with only filled fields
    const formData = new FormData();
    if (productName.trim() !== "") formData.append("product_name", productName);
    if (productDescription.trim() !== "") formData.append("product_description", productDescription);
    if (productCost.trim() !== "") formData.append("product_cost", productCost);
    if (productPhoto) formData.append("product_photo", productPhoto);

    // Check at least one field was changed
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

      // Go back to products after 2 seconds
      setTimeout(() => navigate("/"), 2000);

    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  return (
    <div className="row container justify-content-center mt-5 ms-3 edit">
        <div className="card col-md-6 shadow p-4 " style={{ background: '#F5F7FA' }}>
            <center><h2 className="fw-bold mt-3"style={{color: '#0F52BA'}}>Edit The Product Details</h2></center>

            <h5>{message && <div className="text-success">{message}</div>}</h5>

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Product name</label>
                <input
                type="text"
                className="form-control"
                placeholder={product?.product_name}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                className="form-control"
                placeholder={product?.product_description}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Price (KES)</label>
                <input
                type="number"
                className="form-control"
                placeholder={product?.product_cost}
                value={productCost}
                onChange={(e) => setProductCost(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Product photo</label>
                <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setProductPhoto(e.target.files[0])}
                />
                <small className="text-muted">Leave empty to keep the current photo</small>
            </div>

            <button type="submit" className="button w-100" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
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