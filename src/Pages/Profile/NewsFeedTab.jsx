import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import { NEWS_API } from '../../api'; // Adjust the path as needed
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsFeedTab = () => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newsFeedSettings, setNewsFeedSettings] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  // Fetch sources, categories, authors, and user preferences
  useEffect(() => {
    const fetchSourcesAndCategories = async () => {
      try {
        // Check if a token exists in local storage
        const token = localStorage.getItem('token');
        if (token) {

          // Fetch sources, categories, and authors
          const sourceResponse = await NEWS_API.endpoints.articles.fetchAllSource();
          const categoryResponse = await NEWS_API.endpoints.categories.fetchCategories();
          const authorResponse = await NEWS_API.endpoints.articles.fetchAuthors(); // Fetch authors data
          
          // Set sources, categories, and authors in the format expected for react-select
          setSources(sourceResponse.data.map(source => ({ value: source, label: source })));
          setCategories(categoryResponse.data.map(category => ({ value: category.id, label: category.name })));
          setAuthors(authorResponse.data.map(author => ({ value: author, label: author }))); 
          
          // Fetch user preferences and set them as initial values
          NEWS_API.init();
          const preferencesResponse = await NEWS_API.endpoints.preferences.fetchPreferences();
          if (preferencesResponse.data) {
            setNewsFeedSettings({
              sources: preferencesResponse.data.preferred_sources || [],
              categories: preferencesResponse.data.preferred_categories || [],
              authors: preferencesResponse.data.preferred_authors || [],
            });
          }
        }else{
          toast.error('Failed to save preferences. Please login or register first.');
        }
      } catch (err) {
        console.error('Error fetching sources, categories, authors, or preferences:', err);
      }
    };

    fetchSourcesAndCategories();
  }, []);

  // Handle multi-select change for sources
  const handleSourcesChange = (selectedOptions) => {
    setNewsFeedSettings((prevSettings) => ({
      ...prevSettings,
      sources: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  // Handle multi-select change for categories
  const handleCategoriesChange = (selectedOptions) => {
    setNewsFeedSettings((prevSettings) => ({
      ...prevSettings,
      categories: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  // Handle multi-select change for authors
  const handleAuthorsChange = (selectedOptions) => {
    setNewsFeedSettings((prevSettings) => ({
      ...prevSettings,
      authors: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the function to save the news feed preferences
    await saveNewsFeed(newsFeedSettings);
  };

  // Save news feed settings function
  const saveNewsFeed = async (settings) => {
    try {
      NEWS_API.init();
      const response = await NEWS_API.endpoints.preferences.storePreferences(settings); // Call your API
      if(response.status === 200){

        // Show success toast
        toast.success('Preferences updated successfully! ');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='feed-fields'>
        <legend>Select Sources:</legend>
        <Select
          options={sources}
          isMulti
          onChange={handleSourcesChange}
          placeholder="Select sources..."
          className="react-select" // Optional class for styling
          classNamePrefix="select" // Optional class prefix for styling
          value={sources.filter(source => newsFeedSettings.sources.includes(source.value))} // Set the selected options
        />
      </fieldset>

      <fieldset className='feed-fields'>
        <legend>Select Categories:</legend>
        <Select
          options={categories}
          isMulti
          onChange={handleCategoriesChange}
          placeholder="Select categories..."
          className="react-select" // Optional class for styling
          classNamePrefix="select" // Optional class prefix for styling
          value={categories.filter(category => newsFeedSettings.categories.includes(category.value))} // Set the selected options
        />
      </fieldset>

      <fieldset className='feed-fields'>
        <legend>Select Authors:</legend>
        <Select
          options={authors}
          isMulti
          onChange={handleAuthorsChange}
          placeholder="Select authors..."
          className="react-select" // Optional class for styling
          classNamePrefix="select" // Optional class prefix for styling
          value={authors.filter(author => newsFeedSettings.authors.includes(author.value))} // Set the selected options
        />
      </fieldset>

      <button type="submit">Save News Feed Settings</button>
      <ToastContainer position="top-right" />
    </form>
  );
};

export default NewsFeedTab;
