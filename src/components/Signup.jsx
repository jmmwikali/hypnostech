import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);
      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/signup", formdata);
      setLoading(false);
      setSuccess(response.data.message);
      setUsername(""); setEmail(""); setPassword(""); setPhone("");
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className='signup'>
      <div className="auth-wrapper">

        {/* ── Left panel ── */}
        <div className="auth-left">
          <div className="auth-left-inner">
            <div className="auth-moon-icon">☽</div>
            <div className="auth-logo">
              <h1>Hypn<span className="blur">o</span>s</h1>
              <div className="tech-line"><span>TECH</span></div>
            </div>
            <p className="auth-tagline">Rest smarter.<br />Sleep better.</p>
            <p className="auth-desc">
              Hypnos Tech is your gateway to premium sleep technology — from intelligent sleep trackers to smart comfort devices designed to help you recover, recharge, and wake up renewed.
            </p>
            <div className="auth-features">
              <div className="auth-feature-item"><span className="auth-feature-icon">☽</span><span>Sleep Tracking Devices</span></div>
              <div className="auth-feature-item"><span className="auth-feature-icon">✦</span><span>Smart Comfort Systems</span></div>
              <div className="auth-feature-item"><span className="auth-feature-icon">◎</span><span>Science-backed Sleep Aids</span></div>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="auth-right">
          <h3 className="auth-form-title">Create your account</h3>
          <p className="auth-form-subtitle">Start your journey to better sleep</p>

          {loading && <Loader text="Registering your account…" />}
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="form-label">Username</label>
              <input type="text" placeholder='Choose a username' className='form-control'
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="form-label">Email address</label>
              <input type="email" placeholder='you@example.com' className='form-control'
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="form-label">Password</label>
              <input type="password" placeholder='Create a password' className='form-control'
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="form-label">Mobile number</label>
              <input type="tel" placeholder='254XXXXXXX' className='form-control'
                value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <input type="submit" value="Sign Up" className='button w-100' />
            <p className="auth-switch">
              Already have an account? <Link to={'/signin'}>Sign in</Link>
            </p>
            <p className="auth-terms">I agree to Hypnos Tech Terms &amp; Conditions and Privacy Policy</p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
