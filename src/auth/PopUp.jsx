import React, { useState, useEffect } from 'react';
import './PopUp.css'; // Import your CSS file for styling
import { NEWS_API } from '../api';

const PopUp = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track if login or registration is successful

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
        // Assuming `formData.email` is not the actual username
        onLogin(localStorage.getItem('username')); // Replace with actual username if available
      }, 2000); // Close popup after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [success, onClose, onLogin, formData.email]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormErrors({});
    setTouchedFields({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleBlur = (e) => {
    const field = e.target.name;
    setTouchedFields({ ...touchedFields, [field]: true });
    validateField(field, formData[field]);
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === 'email') {
      if (!value) {
        errors.email = 'Email is required';
      } else if (!emailPattern.test(value)) {
        errors.email = 'Invalid email format';
      } else {
        delete errors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      } else if (value.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      } else {
        delete errors.password;
      }
    }

    if (name === 'confirmPassword' && activeTab === 'register') {
      if (value !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
      } else {
        delete errors.confirmPassword;
      }
    }

    if (name === 'firstName' && activeTab === 'register') {
      if (!value) {
        errors.firstName = 'First Name is required';
      } else {
        delete errors.firstName;
      }
    }

    if (name === 'lastName' && activeTab === 'register') {
      if (!value) {
        errors.lastName = 'Last Name is required';
      } else {
        delete errors.lastName;
      }
    }

    setFormErrors(errors);
  };

  const handleLogin = async () => {
    try {
      const response = await NEWS_API.endpoints.Auth.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setMessage('Login successful!');
        setSuccess(true);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("username", response.data.data.user.name);
        
        console.log(response.data.data);
        const username = response.data.data.user.name;
        onLogin(username); 
      } else {
        setMessage('Login failed. Please try again.');
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Login error. Please try again later.');
      setSuccess(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await NEWS_API.endpoints.Auth.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (response.status === 200) {
        setMessage('Registration successful!');
        setSuccess(true);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("username", response.data.data.name);
        console.log(response.data.data);
      } else {
        setMessage('Registration failed. Please try again.');
        setSuccess(false);
      }
    } catch (error) {
      setMessage('Registration error. Please try again later.');
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Object.keys(formErrors));
    if (Object.keys(formErrors).length === 0) {
      if (activeTab === 'login') {
        await handleLogin();
      } else if (activeTab === 'register') {
        await handleRegister();
      }
    } else {
      setMessage('Please fix the validation errors.');
    }
  };

  const getInputClass = (name) => {
    if (!touchedFields[name]) return '';
    if (formErrors[name]) return 'invalid';
    return 'valid';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="popup-modal">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>×</button>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {activeTab === 'register' && (
              <div className="form-group half-input">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('firstName')}
                  required
                />
                {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('lastName')}
                  required
                />
                {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('email')}
                required
              />
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('password')}
                required
              />
              {formErrors.password && <span className="error-text">{formErrors.password}</span>}
            </div>
            {activeTab === 'register' && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('confirmPassword')}
                  required
                />
                {formErrors.confirmPassword && <span className="error-text">{formErrors.confirmPassword}</span>}
              </div>
            )}
            <button type="submit" className="submit-btn">{activeTab === 'login' ? 'Login' : 'Register'}</button>
          </form>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default PopUp;
