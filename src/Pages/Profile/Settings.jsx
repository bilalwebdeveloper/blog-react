import './Settings.css';
import React, { useState } from 'react';
import ProfileTab from './ProfileTab';
import NewsFeedTab from './NewsFeedTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'newsfeed':
        return <NewsFeedTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="settings">
      <div className="tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={activeTab === 'newsfeed' ? 'active' : ''} 
          onClick={() => setActiveTab('newsfeed')}
        >
          News Feed
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
