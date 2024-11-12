import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
const NetworkBox = lazy(() => import('./NetworkBox'));
import CharlieProfileImage from '../images/Charlie.svg';
import '../CSS/NavBarFollowers.css';

const Connect = ({ currentUser }) => {
    const [connects, setConnects] = useState([])

    useEffect(() => {
        axios.get(`/api/connects/${currentUser.id}`)
        .then((response) => setConnects(response.data))
        .catch((err) => console.error(err));
    }, [currentUser.id])


    const handleConnect = (connection) => {
        const payload = {
            user_id: currentUser.id,
            follow_id: connection.username
        };

        axios.post(`/api/follow`, payload)
        .then((response) => console.log(response.data['message']))
        .catch((err) => console.error(err));
    };

    return (
        <>
            <NetworkBox 
                userList={connects} 
                search={true} 
                buttonText1="Connect" 
                handleButton1={handleConnect} 
                headerText="Connect with Collagers" 
                subText="Find meaningful connections based on your followers and interests" 
                searchText="Search Collagers"
            />
        </>
    );
};

export default Connect;
