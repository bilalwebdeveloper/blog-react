import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './SearchPopup.css';
import { NEWS_API } from '../../api'; // Adjust based on your API file structure
import { Link } from 'react-router-dom';

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState(null);
  const [category, setCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch sources and categories on component mount
  useEffect(() => {
    const fetchSourcesAndCategories = async () => {
      try {
        const sourceResponse = await NEWS_API.endpoints.articles.fetchAllSource();
        const categoryResponse = await NEWS_API.endpoints.categories.fetchCategories();
        
        // Map sources and categories to the format react-select expects
        setSources(sourceResponse.data.map(source => ({ value: source, label: source })));
        setCategories(categoryResponse.data.map(category => ({ value: category.id, label: category.name })));
      } catch (err) {
        console.error('Error fetching sources or categories:', err);
      }
    };

    fetchSourcesAndCategories();
  }, []);

  // Function to fetch search results
  const fetchSearchResults = async (query, date, source, category) => {
    try {
      setLoading(true);
      const response = await NEWS_API.endpoints.articles.articleSearch(
        query,
        date,
        source?.value,
        category?.value
      );

      if (response.status === 200) {
        setResults(response.data);
        setError('');
      } else {
        console.error(`Failed: ${response.statusText}`);
        setError('Failed to fetch results');
      }
    } catch (error) {
      console.error('API error:', error);
      setError('No Result Found');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with a debounce for search
  useEffect(() => {
    if (query.length > 0) {
      const timer = setTimeout(() => {
        fetchSearchResults(query, date, source, category);
      }, 300); // Debounce time

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, date, source, category]);

  if (!isOpen) return null;

  return (
    <div className="search-popup-overlay">
      <div className="search-popup">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search... Keywords, title, description"
          autoFocus
          className="search-input"
        />

        {/* Search Filters */}
        <div className="filters">
          <Select
            options={sources}
            value={source}
            onChange={setSource}
            placeholder="Select Source"
            className="filter-input"
            isClearable
          />
          <Select
            options={categories}
            value={category}
            onChange={setCategory}
            placeholder="Select Category"
            className="filter-input"
            isClearable
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Results Display */}
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {results.length > 0 && (
          <ul className="dropdown-menu">
            {results.map((result) => (
              <li key={result.id} className='single-result'>
              <Link to={`/article/${result.id}`} style={{ textDecoration: 'none' }} onClick={onClose} className="result-link">
                <div className="result-content">
                  <img src={result.UrlToImage} width="70px" alt="" className="result-image" />
                  <h4 className="result-title">{result.title}</h4>
                </div>
              </Link>
            </li>
            
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
