import React, { useState, useEffect, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import CharlieProfileImage from '../images/Charlie.svg';
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

const Following = ({ currentUser}) => {
    const [following, setFollowing] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //const navigate = useNavigate();

    // Fetch followers on component load
    useEffect(() => {
        fetchFollowing();
    }, []);

    const fetchFollowing = async () => {
        setFollowing(mockData);
    };

    const handleUnfollow = async (followerId) => {
    };

    const handleViewProfile = (follower) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
    };

    const filteredFollowing = following.filter(follow =>
        follow.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="nav-bar-followers">
            <h2>Following</h2>
            <p>View followers part of your collage network</p>
            <input
                type="text"
                placeholder="Search my following"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
                className="search-box"
            />
            <div className="followers-list">
                {filteredFollowing.map((follow) => (
                    <div key={follow.id} className="user-result-row">
                        <img src={follow.profileImage} alt={`${follow.name}'s profile`} className="profile-image" />
                        <div className="user-info">
                            <div className="user-name">{follow.name}</div>
                            <div className="user-details"> <strong> @{follow.username}</strong> {follow.major} '{follow.gradYear}</div>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleViewProfile(follow)} className="view-profile-button">View Profile</button>
                            <button onClick={() => handleUnfollow(follow.id)} className="remove-button">Unfollow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Following;






// import React, {useState, useEffect} from "react";
// const UserResult = lazy(() => import('./UserResult'));

// const Following = ({currentUser}) => {
//   const [users, setUsers] = ([]);

//   useEffect = (() => {
//     fetch(`/api/following/`)
//     .then(response => response.json())
//     .then(data => {
//       setUsers(data.users);
//     })
//     .catch(error => {
//       console.error('Error fetching users:', error);
//     });
//   }, []);

//   const handleUnfollow = (userId) => {
//     fetch(`/api/unfollow/${userId}`, {
//       method: 'POST',
//       headers:{
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(response => {
//       if(response.ok) {
//         setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
//       } else {
//         console.error('Failed to unfollow user');
//       }
//     })
//     .catch(error => {
//       console.error('Error unfollowing user:', error);
//     });
//   };

//   return (
//     <>
//       {users.map((user) => {
//         <UserResult 
//           key={user.id} 
//           name={user.name} 
//           username={user.username} 
//           profile_image={user.profile_image} 
//           major={user.major} 
//           grad_year={user.grad_year} 
//           right_component={
//             <>
//               <button>View Profile</button>
//               <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
//             </>
//           }
//         />
//       })}
      
//     </>
//   );
// };

// export default Following;