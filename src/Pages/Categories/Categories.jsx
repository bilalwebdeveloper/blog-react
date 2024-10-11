// Categories.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullSlider from '../Home/FullSlider';
import { NEWS_API } from '../../api';


const Categories = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [newsData, setNewsData] = useState([]); // State for news data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchCategoriesArticles = async () => {
      try {
        console.log("Fetching articles for category ID: " + id);
        const response = await NEWS_API.endpoints.articles.fetchSubCategoriesArticles(id);

        if (response.status === 200) {
            console.log(response.data.subcategories);
          setNewsData(response.data.subcategories);
        } else {
          console.error(`Failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoriesArticles();
    }
  }, [id]); 

  return (
    <div className="Category">
      {loading ? (
        <p>Loading...</p>
      ) : (
        newsData.map((news, index) => (
          <FullSlider
            key={index} // Add key to help React identify elements
            newsData={news.articles}
            title={news.subcategory_name}
            seeAllLink={`/sub-categories/${news.subcategory_id}`}
          />
        ))
      )}
    </div>
  );
};

export default Categories;
