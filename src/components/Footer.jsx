import React from 'react';

const Footer = () => {
  return (
    <>
      <div className='row footer'>
        <div className="col-md-6">
          <h3>Customer Support</h3>
          <input
            type="email"
            placeholder='Enter your email'
            className='form-control'
            required />
          <br />
          <textarea
            placeholder='How can we help you rest better?'
            className='form-control'
            required></textarea>
          <a href="mailto:jmmwikali936@gmail.com" className='btn btn-primary mt-4'>Send Message</a>
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
