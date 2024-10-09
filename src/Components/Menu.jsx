import React, { useEffect, useState } from 'react';
import { NEWS_API } from '../api';
import './Comman.css';

const Menu = () => {
  const [menuData, setMenuData] = useState([]); // State for parent categories and subcategories
  const [loading, setLoading] = useState(true); // State for loading
  const [mobileMenuActive, setMobileMenuActive] = useState(false); // State for mobile menu

  const fetchMenu = async () => {
    try {
      const response = await NEWS_API.endpoints.Commons.fetchHeaderMenu();

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

  // const toggleMobileMenu = () => {
  //   setMobileMenuActive(!mobileMenuActive);
  // };

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      {/* <div className={`hamburger ${mobileMenuActive ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div> */}

      {/* Navigation Menu */}
      <nav className={`menu ${mobileMenuActive ? 'active' : ''}`}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="parent-menu">
            <li key="0012">
              <a href={`/articles/`}>Latest News</a>
            </li>
            {menuData.map((category, index) => (
              <li key={index}>
                <a href={`/categories/${category.parent_category_id}`}>{category.parent_category}</a>
                <ul className="submenu">
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
      </nav>
    </div>
  );
};

export default Menu;
