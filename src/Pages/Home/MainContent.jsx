import React from 'react';
import LatestNews from './LatestNews';
import './Home.css';

const MainContent = () => {
  return (
    <main>
      <section className="top-news">
        <img src="path-to-image" alt="John Wick Chapter 4" className="hero-image"/>
        <div className="top-news-content">
          <h1>Where To Watch 'John Wick: Chapter 4'</h1>
          <p>There’s been no official announcement regarding John Wick: Chapter 4's streaming release...</p>
        </div>
      </section>

      <LatestNews />
      {/* Add other sections such as Must Read, Editor's Pick, Business, etc. */}
    </main>
  );
};

export default MainContent;
