import React from 'react';
import './Home.css'; // Import the CSS file

function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <p>WELCOME TO BULLETIN</p>
        <h1>
          Craft narratives <span className="icon">✍️</span> that ignite <span className="highlight">inspiration</span> <span className="icon">💡</span>,<br /> 
          <span className="highlight">knowledge</span> <span className="icon">📚</span>, and 
          <span className="highlight"> entertainment</span> <span className="icon">🎬</span>
        </h1>
      </div>
    </div>
  );
}

export default WelcomeBanner;
