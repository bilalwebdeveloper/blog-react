import React, { useEffect, useState } from 'react';
import WelcomeBanner from './Welcome';
import FullArticle from './FullArticle';
import FullSlider from './FullSlider';
import { NEWS_API } from '../../api';
import './Home.css';

const Home = () => {
  const [newsData, setNewsData] = useState([]); // State for news data
  const [loading, setLoading] = useState(true); // State for loading
  const [singleNews, setSingleNews] = useState([]); // State for single data
  const [singleLoading, setSingleLoading] = useState(true); // State for loading

  const fetchCategoriesArticles = async () => {
    try {
      const response = await NEWS_API.endpoints.Home.FetchCategoriesArticles(); 

      if (response.status === 200) {
        setNewsData(response.data); 
      } else {
        console.error(`Failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesArticles();
  }, []);

  const fetchFullArticle = async () => {
    try {
      const response = await NEWS_API.endpoints.Home.fetchFullArticle(); 

      if (response.status === 200) {
        setSingleNews(response.data); 
      } else {
        console.error(`Failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setSingleLoading(false);
    }
  };

  useEffect(() => {
    fetchFullArticle();
  }, []);
  return (
    <div className="Home">
      <WelcomeBanner />
      {singleLoading ? (
          <p>Loading...</p>
        ) : ( 
      <FullArticle singleNews={singleNews}/>
        )}
      {loading ? (
          <p>Loading...</p>
        ) : ( 
          newsData.map((news, index) => (
            <FullSlider 
              key={index}
              newsData={news.articles} 
              title={news.parent_category} 
              seeAllLink="/all-news" 
            />
          ))
        )}
    </div>
  );
};

export default Home;
