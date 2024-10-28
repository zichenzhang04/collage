import React, {useState, useEffect} from "react";
const UserResult = lazy(() => import('./UserResult'));

const Following = ({currentUser}) => {
  const [users, setUsers] = ([]);

  useEffect = (() => {
    fetch(`/api/following/`)
    .then(response => response.json())
    .then(data => {
      setUsers(data.users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleUnfollow = (userId) => {
    fetch(`/api/unfollow/${userId}`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if(response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        console.error('Failed to unfollow user');
      }
    })
    .catch(error => {
      console.error('Error unfollowing user:', error);
    });
  };

  return (
    <>
      {users.map((user) => {
        <UserResult 
          key={user.id} 
          name={user.name} 
          username={user.username} 
          profile_image={user.profile_image} 
          major={user.major} 
          grad_year={user.grad_year} 
          right_component={
            <>
              <button>View Profile</button>
              <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
            </>
          }
        />
      })}
      
    </>
  );
};

export default Following;