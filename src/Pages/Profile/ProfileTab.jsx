import React, { useState, useEffect } from 'react';
import { NEWS_API } from '../../api'; // Adjust the import path as needed
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileTab = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        NEWS_API.init(); // Initialize the API
        const preferencesResponse = await NEWS_API.endpoints.Auth.fetchUser(); 
        
        // Assuming the response contains the user object with username and email
        const user = preferencesResponse.data;

        setFormData({
          username: user.name || '', // Set username from user data
          email: user.email || '', // Set email from user data
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for the update request, excluding the email
      const { email, ...updateData } = formData;
      
      NEWS_API.init();
      // Call the API to update the user profile
      const response = await NEWS_API.endpoints.Auth.profileUpdate(updateData);
      if(response.status === 200){
        // Show success toast
        toast.success('Username updated successfully! ');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
        />
      </label>
      <label>
        Email:
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          disabled // Make email field disabled
        />
      </label>
      <button type="submit">Update Profile</button>
      <ToastContainer position="top-right" />
    </form>
  );
};

export default ProfileTab;
