import React from 'react';
import Menu from './Menu';
import './Comman.css';

const Header = ({ isLoggedIn, username, onLogout, onSignUp, onOpenSearch }) => {
  return (
    <header className="header">
      <div className="logo">Bulletin</div>
      <nav className="nav">
        <Menu />
      </nav>
      <div className="user-section">
        {isLoggedIn && username ? (
          <div className="user-info">
            <span className="username">Welcome, {username}</span>
            <button onClick={onLogout} className="logout">Logout</button>
          </div>
        ) : (
          <a href="#login" className="login" onClick={onSignUp}>Sign Up/Login</a>
        )}
        <button onClick={onOpenSearch} className="search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
