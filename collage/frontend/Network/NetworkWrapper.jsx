import React, { lazy } from "react";
const NetworkNavBar = lazy(() => import('./NetworkNavBar'));
const ActivityGlimpse = lazy(() => import('../UserProfile/ActivityGlimpse'));
import '../CSS/NetworkWrapper.css';
import '../CSS/Search.css';

const NetworkWrapper = ({currentUser}) => {
    
    return (
        <div className="full-page">
            <div className="network-wrapper">
                <NetworkNavBar/>
                <ActivityGlimpse className="activity-glimpse"/>
            </div>
        </div>
    );
};

export default NetworkWrapper;
