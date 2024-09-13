// BlogList.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NEWS_API } from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import './BlogList.css';

const BlogList = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [articles, setArticles] = useState([]); // State for articles
  const [loading, setLoading] = useState(true); // State for loading
  const [hasMore, setHasMore] = useState(true); // State to handle infinite scrolling
  const [page, setPage] = useState(1); // State to keep track of the page number

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (id) {
          response = await NEWS_API.endpoints.articles.fetchArticlesByCategory(id, page);
        } else {
          response = await NEWS_API.endpoints.articles.fetchArticles(page);
        }

        if (response.status === 200) {
          const fetchedArticles = response.data.articles;
          setArticles(prevArticles => [...prevArticles, ...fetchedArticles]);
          setHasMore(response.data.has_more);
        } else {
          console.error(`Failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id, page]);

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="blog-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading more articles...</p>}
          endMessage={<p>No more articles</p>}
        >
          <div className="articles-container">
            {articles.map((article, index) => (
              <div className="article-card"  key={`${article.id}-${index}`}>
                <img src={article.UrlToImage} alt={article.title} className="article-image" />
                <div className="article-content">
                  <p className="article-category">{article.category}</p>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-author">By {article.author}</p>
                  <p className="article-time red-color">{article.source} • {article.published_at_human}</p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default BlogList;
