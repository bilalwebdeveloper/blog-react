// SearchPopup.jsx
import React, { useState, useEffect } from 'react';
import './SearchPopup.css'; // Import CSS for styling
import { NEWS_API } from '../../api';


const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock function to simulate fetching data
  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      // Replace this with your actual API call
      const response = await NEWS_API.endpoints.articles.articleSearch(query); // Update as needed

      if (response.status === 200) {
        setResults(response.data); // Adjust based on your API response structure
      } else {
        console.error(`Failed: ${response.statusText}`);
        setError('Failed to fetch results');
      }
    } catch (error) {
      console.error('API error:', error);
      setError('API error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      const timer = setTimeout(() => {
        fetchSearchResults(query);
      }, 300); // Debounce time

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-popup-overlay">
      <div className="search-popup">
        <button className="close-button" onClick={onClose}>&times;</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          autoFocus
        />
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {results.length > 0 && (
          <ul className="dropdown-menu">
            {results.map(result => (
              <li key={result.id}>
                <h4>{result.title}</h4>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
