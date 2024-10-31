import React, { useState, useEffect, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import CharlieProfileImage from '../images/Charlie.svg';
import FollowerTabIcon from '../images/follower-tab-icon.svg';
import axios from 'axios';

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
    const [followers, setFollowers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //const navigate = useNavigate();

    // Fetch followers on component load
    useEffect(() => {
        fetchFollowers();
    }, []);

    const fetchFollowers = async () => {
        // try {
        //     const response = await axios.post('/api/followers', { userId: currentUser.id });
        //     startTransition(() => {
        //         setFollowers(response.data.followers);
        //     });
        // } catch (error) {
        //     console.error("Error fetching followers:", error);
        // }

        setFollowers(mockData);
    };

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

    const filteredFollowers = followers.filter(follower =>
        follower.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="nav-bar-followers">
            <h2>My followers</h2>
            <p>View followers part of your collage network</p>
            <input
                type="text"
                placeholder="Search my followers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
                className="search-box"
            />
            <div className="followers-list">
                {filteredFollowers.map((follower) => (
                    <div key={follower.id} className="user-result-row">
                        <img src={follower.profileImage} alt={`${follower.name}'s profile`} className="profile-image" />
                        <div className="user-info">
                            <div className="user-name">{follower.name}</div>
                            <div className="user-details"> <strong> @{follower.username}</strong> {follower.major} '{follower.gradYear}</div>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleViewProfile(follower)} className="view-profile-button">View Profile</button>
                            <button onClick={() => handleRemoveFollower(follower.id)} className="remove-button">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavBarFollowers;
