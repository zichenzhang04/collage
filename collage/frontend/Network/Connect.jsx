import React, { useState, useEffect, lazy } from 'react';
const NetworkBox = lazy(() => import('./NetworkBox'));
import CharlieProfileImage from '../images/Charlie.svg';
import '../CSS/NavBarFollowers.css';

 const mockData = [
    {
        id: 1,
        name: "Alice Smith",
        username: "alice123",
        profileImage: CharlieProfileImage,
        major: "Computer Science",
        gradYear: 2025,
        followersCount: 120,
        mutuals: ["John Doe", "Jane Doe"],
    },
    {
        id: 2,
        name: "Bob Johnson",
        username:"bobJohn",
        profileImage: CharlieProfileImage,
        major: "Electrical Engineering",
        gradYear: 2024,
        followersCount: 80,
        mutuals: ["Alice Smith", "Emily Davis"],
    },
    {
        id: 3,
        name: "Charlie Brown",
        username: "charlie_0",
        profileImage: CharlieProfileImage,
        major: "Mechanical Engineering",
        gradYear: 2023,
        followersCount: 95,
        mutuals: ["Bob Johnson", "Alice Smith"],
    },
    // Add more mock users as needed
];

const Connect = ({ currentUser }) => {

    const handleConnect = (connection) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
        console.log("connect");
    };

    return (
        <>
            <NetworkBox 
                userList={mockData} 
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
