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

const Requests = ({ currentUser }) => {

    const handleDismiss = async (requestId) => {
        console.log("dismiss");
    };

    const handleConnect = (request) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
        console.log("connect");
    };

    return (
        <>
            <NetworkBox 
                userList={mockData} 
                search={false} 
                buttonText1="Connect" 
                handleButton1={handleConnect} 
                buttonText2="Dismiss" 
                handleButton2={handleDismiss} 
                headerText="Friend requests" 
                subText="Keep up with who wants to join your network" 
            />
        </>
    );
};

export default Requests;






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





// import { Image, Button } from "@mantine/core";
// import React from "react";
// import temp from '../images/tempHeadshot.png';
// import '../CSS/requests.css';

// const Requests = () => {


//     return (
//         <div className="requests">
//             <ul>
//                 <li className="request">
//                     <Image src={ temp } className="headshot"/>
//                     <div className="info">
//                         <h2 className="name">Sasha May</h2>
//                         <p className="basic">
//                             <span className="handle">@SashaMay </span> 
//                             <span className="major">Chemical Engineering </span> 
//                             <span className="year">'26</span>
//                         </p>
//                         <p className="subtext">
//                             <span className="follower1">Charlie, </span> 
//                             <span className="follower2">Max, </span> 
//                             <span className="followerCount">12 </span> 
//                             <span className="others">others follow Sasha May</span>
//                         </p>
//                     </div>
//                     <div className="timer">
//                         <span className="time">1 </span>
//                         <span className="measure">day</span>
//                     </div>
//                     <div className="buttons">
//                         <Button className="button approve">Connect</Button>
//                         <Button className="button reject" variant="default">Dismiss</Button>
//                     </div>
//                 </li>
//                 <li className="request">
//                     <Image src={ temp } className="headshot"/>
//                     <div className="info">
//                         <h2 className="name">Tasha Diaz</h2>
//                         <p className="basic">
//                             <span className="handle">@TashaD19 </span> 
//                             <span className="major">Enviromental science </span> 
//                             <span className="year">'25</span>
//                         </p>
//                         <p className="subtext"> 
//                             <span className="follower2">Max, </span> 
//                             <span className="followerCount">3 </span> 
//                             <span className="others">others follow Sasha May</span>
//                         </p>
//                     </div>
//                     <div className="timer">
//                         <span className="time">2 </span>
//                         <span className="measure">weeks</span>
//                     </div>
//                     <div className="buttons">
//                         <Button className="button approve">Connect</Button>
//                         <Button className="button reject" variant="default">Dismiss</Button>
//                     </div>
//                 </li>
//             </ul>
//         </div>
//     )
// };

// export default Requests;