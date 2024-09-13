import React, { useEffect, useState } from 'react';
import { NEWS_API } from '../api';
import './Comman.css';

const Footer = () => {
  const [menuData, setMenuData] = useState([]); // State for parent categories and subcategories
  const [loading, setLoading] = useState(true); // State for loading

  const fetchMenu = async () => {
    try {
      const response = await NEWS_API.endpoints.Commons.fetchMenu(4);

      if (response.status === 200) {
        setMenuData(response.data);
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
    fetchMenu();
  }, []);

  return (
    <footer className="footer">
      <div className="subscribe">
        <div className='content'>
            <p>GET FIRST UPDATE</p>
            <h2>Get the news in front line by</h2>
            <h2><span>Subscribe</span> Our Latest Updates</h2>
        </div>
        <div className='subscribe-form'>
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-links">
        {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="parent-menu-footer">
              {menuData.map((category, index) => (
                <li key={index}>
                  <a href={`/categories/${category.parent_category_id}`}>{category.parent_category}</a>
                  <ul className="submenu-footer">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <a href={`/sub-categories/${subcategory.id}`}>{subcategory.name}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="footer-bottom ">
        <p><span className='red-color'>&copy; 2024 Innoscripta. All Rights Reserved.</span></p>
      </div>
    </footer>
  );
};

export default Footer;
