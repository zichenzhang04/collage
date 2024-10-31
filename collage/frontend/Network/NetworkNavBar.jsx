import React, { useState, lazy } from 'react';
import "../CSS/NetworkNavBar.css";
const NavBarFollowers = lazy(() => import('./NavBarFollowers'));

const NetworkNavBar = (followerData) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Connect');

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Conditionally render based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Connect':
        return <div>Connect Component Placeholder</div>;
        //can add the components here once they are completed
      case 'Requests':
        return <div>Requests Component Placeholder</div>;
      case 'Followers':
        return <NavBarFollowers/>;
      case 'Following':
        return <div>Following Component Placeholder</div>;
      default:
        return null;
    }
  };

  return (
    <div className="network-navbar-wrapper">
      <nav className="navbar">
        <button
          className={`nav-button ${activeTab === 'Connect' ? 'red-highlight' : ''}`}
          onClick={() => handleTabChange('Connect')}
        >
          Connect
        </button>
        <button
          className={`nav-button ${activeTab === 'Requests' ? 'blue-highlight' : ''}`}
          onClick={() => handleTabChange('Requests')}
        >
          Requests
        </button>
        <button
          className={`nav-button ${activeTab === 'Followers' ? 'green-highlight' : ''}`}
          onClick={() => handleTabChange('Followers')}
        >
          Followers
        </button>
        <button
          className={`nav-button ${activeTab === 'Following' ? 'green-highlight' : ''}`}
          onClick={() => handleTabChange('Following')}
        >
          Following
        </button>
      </nav>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default NetworkNavBar;
