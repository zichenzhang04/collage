import React, { lazy } from "react";
const NetworkNavBar = lazy(() => import('./NetworkNavBar'));
const ActivityGlimpse = lazy(() => import('./ActivityGlimpse'));
import '../CSS/NetworkWrapper.css';

const NetworkWrapper = ({currentUser}) => {
    
    return (
        <>
            <div className="wrapper">
                <NetworkNavBar/>
                <ActivityGlimpse className="activity-glimpse"/>
            </div>
        </>
    );
};

export default NetworkWrapper;
