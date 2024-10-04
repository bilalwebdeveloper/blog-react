// SingleBlog.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NEWS_API } from '../../api';
import './SingleBlog.css';

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const [article, setArticle] = useState(null); // State for storing the single article
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const response = await NEWS_API.endpoints.articles.fetchSingleArticle(id); // Fetch the full article by ID

        if (response.status === 200) {
          setArticle(response.data); // Set the fetched article
        } else {
          console.error(`Failed to fetch article: ${response.statusText}`);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleArticle();
  }, [id]); // Fetch when the component mounts or id changes

  return (
    <div className="single-blog">
      {loading ? (
        <p>Loading...</p>
      ) : article ? (
        <div className="single-article-detail">
          <img src={article.UrlToImage} alt={article.title} className="single-article-image" />
          <div className='single-article-meta'>
            <p className="single-article-author">{article.source}</p>
            <p className="single-article-time red-color">By {article.author} • {article.published_at_human}</p>
          </div>
          <h1 className="single-article-title">{article.title}</h1>
          <div className="single-article-content">{article.description}</div>
        </div>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default SingleBlog;
