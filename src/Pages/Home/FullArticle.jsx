import React from 'react';
import './Home.css'; // Import the CSS file

function FullArticle({ singleNews }) {
  if (!singleNews || !singleNews.article || !singleNews.category) {
    return <p>No article available.</p>; // Handle case when no article is available
  }

  const { article, category } = singleNews;

  return (
    <div className="content-section">
      <div className="image-container-half">
        <img 
          src={article.UrlToImage || "https://via.placeholder.com/600x400"} 
          alt={article.title || "Article Image"} 
          className="image"
        />
      </div>
      <div className="content-container">
        <div className="content-header">
          <div className='red-color'>{article.source || "Source not varified"}</div>
          
        </div>
        <h2 className="content-title">{article.title || "Article Title"}</h2>
        <p className="content-description">
          {article.description || "No description available for this article."}
        </p>
        <div className="content-footer">
          <span className="category">{category || "Category"}</span>  • 
          <span className="time-info">{article.published_at_human || "Some time ago"}</span>
        </div>
      </div>
    </div>
  );
}

export default FullArticle;
