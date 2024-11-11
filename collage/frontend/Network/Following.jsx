import React, { useState, useEffect, startTransition, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import CharlieProfileImage from '../images/Charlie.svg';
import FollowerTabIcon from '../images/follower-tab-icon.svg';
import axios from 'axios';
import '../CSS/NavBarFollowers.css';
const NetworkBox = lazy(() => import('./NetworkBox'))

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

const Following = ({ currentUser, profileUser, handleViewProfile}) => {
  const handleRemoveFollowing = async (followerId) => {
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

  return (
    <>
      <NetworkBox 
        userList={mockData} 
        search={true} 
        buttonText1="View Profile" 
        handleButton1={handleViewProfile} 
        buttonText2="Unfollow" 
        handleButton2={handleRemoveFollowing} 
        headerText="Following" 
        subText="View following part of your collage network" 
        searchText="Search my following"
      />
    </>
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