import React from "react";
import '../CSS/NetworkWrapper.css';

const NetworkWrapper = ({currentUser}) => {
    
    return (
        <>
            <div className="wrapper">
                <ActivityGlimpse className="activity-glimpse"/> {/* placeholders */}
                <GenericWrapper className="generic-wrapper"/>
            </div>
        </>
    );
};

export default NetworkWrapper;