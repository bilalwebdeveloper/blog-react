import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import './Comman.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NEWS_API } from '../api'; 

const Header = ({ isLoggedIn, onLogout, onSignUp, onOpenSearch }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');

  // Fetch user data if token exists in local storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        // Check if a token exists in local storage
        const token = localStorage.getItem('token');
        if (token) {
          const preferencesResponse = await NEWS_API.endpoints.Auth.fetchUser();

            // Assuming the response contains the user object with username and email
            const user = preferencesResponse.data;
            
            // Set username from user data
            setUsername(user.name || '');
            setDropdownVisible(false);
          
         }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isLoggedIn,onLogout,username]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={'/'}>
          Bulletin
        </Link>
      </div>
      <nav className="nav">
        <Menu />
      </nav>
      <div className="user-section">
        {isLoggedIn && username ? (
          <div
            className="user-info"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="username">Welcome, {username}
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </span>
            {dropdownVisible && (
              <div className="dropdown">
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <button onClick={onLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <a href="#login" className="login" onClick={onSignUp}>Sign Up/Login</a>
        )}
        <button onClick={onOpenSearch} className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </header>
  );
};

export default Header;
