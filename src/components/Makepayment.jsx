import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    // Destructure the details passed from the GetProducts component
    // The useLocation hook allows us to get/ destructure the properties passed from the previous component
    const {product} = useLocation().state || {}

    // console.log("The details passed from getproducts are:", product)

    // Below we specify the image base URL
    const img_url = "https://jmmwikali.alwaysdata.net/static/images/"

    // Declare the navigate hook
    const navigate = useNavigate()

    // Initialize hooks to manage the state of the applictaion
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Create a function that will handle the submit action
    const handleSubmit = async (e) => {
        // Prevent the site from reloading
        e.preventDefault();
        // Update the loading hook
        setLoading(true);

        try{
            // Create a formdata object
            const formdata =new FormData()
            
            // Append the form to the FormData
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

            // Set loading back to default
            setLoading(false);

            // Update the succes hook with the message
            setSuccess(response.data.message);
        }
        catch(error){
            // If there is an error, respond to the error
            setLoading(false);

            // Update the error hook with the error message
            setError(error.message);
        }
    }


  return (
    <div className='row justify-content-center'>
        {/* <button className="btn btn-primary">← Back to Products</button> */}

        <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1>

          <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="← Back"
            onClick={() => navigate("/")} />
        </div>

        <div className="col-md-6 card shadow p-4 mt-4">
            <img 
            src={img_url + product.product_photo} 
            alt="Product Photo" 
            className='product_img' />

            <div className="card-body">
                <h2 className="text-primary"> {product.product_name} </h2>

                <p className='text-dark'> {product.product_description} </p>

                <b className="text-warning"><h3>KES {product.product_cost} </h3></b> <br /> 

                <form onSubmit={handleSubmit}>

                    {/* Bind the loading hook */}
                    {loading && <Loader />}
                    <h3 className="text-success">{success}</h3>
                    <h4 className="text-danger">{error}</h4>

                    <input type="tel"
                    className='form-control'
                    placeholder='Enter your phone number 254XXXXXXX'
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)} /> <br />

                    {/* {number} */}

                    <input type="submit"
                    value={"Make Payment"}
                    className='btn btn-success w-100' />
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default Makepayment;
