// Use this file to test your components by adding a link to the one you are trying to see
// Add the route to registration.jsx in order to link here
import React from "react";
import { Link } from 'react-router-dom';

const Dev = () => {
    return (<div>
        <Link to="/home">
            <button>Home</button>
        </Link>
        <Link to="/network">
            <button>Network</button>
        </Link>
        </div>
        
    )
}

export default Dev;