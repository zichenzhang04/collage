import React, { useState, useEffect } from 'react';
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
    const [connections, setConnections] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch followers on component load
    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        setConnections(mockData);
    };

    const handleConnect = (connection) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
    };

    const filteredConnections = connections.filter(connection =>
        connection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="nav-bar-followers">
            <h2>Connect with Collagers</h2>
            <p>Find meaningful connections based on your followers and interests</p>
            <input
                type="text"
                placeholder="Search Collagers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
                className="search-box"
            />
            <div className="followers-list">
                {filteredConnections.map((connection) => (
                    <div key={connection.id} className="user-result-row">
                        <img src={connection.profileImage} alt={`${connection.name}'s profile`} className="profile-image" />
                        <div className="user-info">
                            <div className="user-name">{connection.name}</div>
                            <div className="user-details"> <strong> @{connection.username}</strong> {connection.major} '{connection.gradYear}</div>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleConnect(connection)} className="view-profile-button">Connect</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connect;
