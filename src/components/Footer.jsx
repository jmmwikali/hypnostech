import axios from 'axios';
import React, { useState } from 'react';
import Loader from './Loader';

const Footer = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try{
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("message", message);

      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/contact_us", formdata);
      setLoading(false);

      setSuccess(response.data.message)

      setTimeout(() => setSuccess(""), 5000)

      setEmail("");
      setMessage("");
      
    }
    catch(error){
      setLoading(false)
      setError("Oops! Seems like something went wrong. Please try again later...")
      setTimeout(() => setError(""), 5000)

    }
  }

  return (
    <>
      <div className='row footer'>
        <div className="col-md-6">
          <h3>Customer Support</h3>

          {loading && <Loader />}
          <h4 className="text-success">{success}</h4>
          <h4 className="text-danger">{error}</h4>
          
          <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder='Enter your email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <br />

          {/* {email} */}

          <textarea
            placeholder='How can we help you rest better?'
            className='form-control'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required></textarea>

            {/* {message} */}
          
          <input type="submit" 
          value="Send Message"
          className='btn btn-primary mt-4' />
          </form>
        </div>

        <div className="col-md-6 mt-5">
          <h5>Stay updated with our newest products and special offers — follow us on:</h5>
          <a href="https://www.instagram.com" target='blank'><img src="/images/instagram.png" alt="instagram icon" width="46px" /></a>
          <a href="https://www.tiktok.com" target='blank'><img src="/images/tik-tok.png" alt="tiktok icon" width="46px" className='mx-3' /></a>
          <a href="https://www.facebook.com" target='blank'><img src="/images/facebook.png" alt="facebook icon" width="46px" /></a>
          <a href="https://www.twitter.com" target='blank'><img src="/images/twitter.png" alt="twitter icon" width="46px" className='mx-3' /></a>
        </div>
      </div>

      <footer className="text-center text-white bg-dark p-2">
        <b>Developed by Jessica. &copy; 2026 All rights Reserved</b>
      </footer>
    </>
  );
};

export default Footer;
