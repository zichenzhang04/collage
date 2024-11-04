import React, { useState, useEffect, startTransition, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import CharlieProfileImage from '../images/Charlie.svg';
const NetworkBox = lazy(() => import('./NetworkBox'));
import FollowerTabIcon from '../images/follower-tab-icon.svg';
import axios from 'axios';
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

const NavBarFollowers = ({ currentUser}) => {

    const handleRemoveFollower = async (followerId) => {
        // try {
        //     await axios.post('/api/removeFollower', {
        //         userId: currentUser.id,
        //         followerId
        //     });
        //     startTransition(() => {
        //         setFollowers((prevFollowers) => prevFollowers.filter(follower => follower.id !== followerId));
        //     });
        // } catch (error) {
        //     console.error("Error removing follower:", error);
        // }
    };

    const handleViewProfile = (follower) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
    };

    return (
        <>
            <NetworkBox 
                userList={mockData} 
                search={true} 
                buttonText1="View Profile" 
                handleButton1={handleViewProfile} 
                buttonText2="Remove" 
                handleButton2={handleRemoveFollower} 
                headerText="My followers" 
                subText="View followers part of your collage network" 
                searchText="Search my followers"
            />
        </>
    );


};

export default NavBarFollowers;
