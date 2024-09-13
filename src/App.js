import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home.jsx';
import Popup from './auth/PopUp.jsx';
import Categories from './Pages/Categories/Categories.jsx';
import BlogList from './Pages/Blogs/BlogList.jsx';
import SearchPopup from './Pages/PopUps/SearchPopup.jsx';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchPopupOpen, setSearchPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleOpenSearchPopup = () => setSearchPopupOpen(true);
  const handleCloseSearchPopup = () => setSearchPopupOpen(false);

  useEffect(() => {
    // Check if username exists in localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsUserLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogin = (user) => {
    setIsUserLoggedIn(true);
    setUsername(user); // Set the username after login
    setIsPopupOpen(false); // Close the pop-up on successful login
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username'); // Remove username from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isUserLoggedIn}
          username={username}
          onLogout={handleLogout}
          onSignUp={handleOpenPopup} // Pass the function to open the pop-up
          onOpenSearch={handleOpenSearchPopup} // Pass the function to open the search popup
        />
        
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onLogin={handleLogin} // Pass the function to handle login
        />

        <SearchPopup
          isOpen={isSearchPopupOpen}
          onClose={handleCloseSearchPopup}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/sub-categories/:id" element={<BlogList />} />
          <Route path="/articles" element={<BlogList />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
