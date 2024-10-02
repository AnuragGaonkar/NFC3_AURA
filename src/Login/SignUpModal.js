import React, { useState } from 'react';
import { signIn, signUp } from './authService'; // Import signIn and signUp functions from authService
import './Modal.css';

// Enum for tab states
const TABS = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP'
};

const SignUpModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // New state for Full Name
  const [emergencyNumber, setEmergencyNumber] = useState(''); // New state for Emergency Number
  const [error, setError] = useState('');
  const [tab, setTab] = useState(TABS.LOGIN); // Start with LOGIN tab
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      setSuccessMessage('Logged in successfully!');
      setTimeout(() => onClose(), 2000); // Close modal after 2 seconds
    } catch (error) {
      setError('Invalid Email or Password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp(email, password);
      setSuccessMessage('Signed up successfully!');
      setTimeout(() => onClose(), 2000); // Close modal after 2 seconds
    } catch (error) {
      setError('Error signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-box">
        {loading && (
          <div className="loader">
            {/* Loader CSS applied here */}
          </div>
        )}
        {successMessage && (
          <div className="notification">
            {successMessage}
          </div>
        )}
        <div className="tabs">
          <button
            className={`tab ${tab === TABS.LOGIN ? 'active' : ''}`}
            onClick={() => setTab(TABS.LOGIN)}
          >
            Login
          </button>
          <button
            className={`tab ${tab === TABS.SIGNUP ? 'active' : ''}`}
            onClick={() => setTab(TABS.SIGNUP)}
          >
            Sign Up
          </button>
        </div>
        <form className="form" onSubmit={tab === TABS.LOGIN ? handleLogin : handleSignUp}>
          <span className="title">{tab === TABS.LOGIN ? 'LOGIN' : 'SIGN UP'}</span>
            <span>{tab === TABS.LOGIN ? 'Login using Google Email and Password' : 'Sign Up using Google Email and Password'}</span>
          <div className="form-container">
            {tab === TABS.SIGNUP && (
              <>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Emergency Number" 
                  value={emergencyNumber}
                  onChange={(e) => setEmergencyNumber(e.target.value)}
                />
              </>
            )}
            <input 
              type="email" 
              className="input" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              className="input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{tab === TABS.LOGIN ? 'Login' : 'Sign Up'}</button>
        </form>
        <button className="close-btn" onClick={onClose}>←</button>
      </div>
    </div>
  );
};

export default SignUpModal;
