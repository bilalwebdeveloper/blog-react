import React from 'react';
import './Home.css';

const LatestNews = () => {
  return (
    <section className="latest-news">
      <h2>Latest News</h2>
      <div className="news-cards">
        {/* Map through an array of news items here */}
        <div className="news-card">
          <img src="path-to-image" alt="news" />
          <h3>News Title</h3>
          <p>Short description of the news...</p>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
