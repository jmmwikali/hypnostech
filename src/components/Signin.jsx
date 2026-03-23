import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useAuth } from './AuthContext';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post("https://jmmwikali.alwaysdata.net/api/signin", formdata);
      setLoading(false);

      if (response.data.user) {
        // login() saves user (with role) into context + localStorage
        login(response.data.user);
        navigate("/");
      } else {
        setError("The email or password is incorrect. Please try again");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setLoading(false);
      setError("Oops, something went wrong. Please try again...");
    }
  };

  return (
    <div className='signin'>
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
          <h3 className="auth-form-title">Welcome back</h3>
          <p className="auth-form-subtitle">Sign in to continue your sleep journey</p>

          {loading && <Loader text="Authenticating your account…" />}
          <h4 className="text-success">{success}</h4>
          <h5 className="text-danger">{error}</h5>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="form-label">Email address</label>
              <input type="email" placeholder='you@example.com' className='form-control'
                required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="auth-field">
              <label className="form-label">Password</label>
              <input type="password" placeholder='Your password' className='form-control'
                required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Sign In" className='button w-100' />
            <p className="auth-switch">
              Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
            </p>
            <p className="auth-terms">I agree to Hypnos Tech Terms &amp; Conditions and Privacy Policy</p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signin;
