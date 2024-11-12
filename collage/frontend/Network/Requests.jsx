import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
const NetworkBox = lazy(() => import('./NetworkBox'));
import CharlieProfileImage from '../images/Charlie.svg';
import '../CSS/NavBarFollowers.css';

const Requests = ({ currentUser }) => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        axios.get(`/api/requests/${currentUser.id}`)
        .then((response) => setRequests(response.data))
        .catch((err) => console.error(err));
    }, [currentUser.id])


    const handleDismiss = async (requestId) => {
        const payload = {user_id: currentUser.id, follow_id: requestId.username};
        axios.delete(`/api/remove_user`, payload)
        .then((response) => console.log(response.data['message']))
        .catch((err) => console.error(err));
    };

    const handleConnect = (request) => {
        //navigate('/profile', { state: { follower } }); 
        //TODO: figure out how to intergrate this
        const payload = {
            user_id: currentUser.id,
            follow_id: request.username
        };

        axios.post(`/api/follow`, payload)
        .then((response) => console.log(response.data['message']))
        .catch((err) => console.error(err));
    };

    return (
        <>
            <NetworkBox 
                userList={requests} 
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