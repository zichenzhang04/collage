import React, {lazy, useState, useEffect} from "react";
import { Grid, Image } from "@mantine/core";
import '../CSS/userProfile.css';
import '../CSS/Search.css';
import Cookies from 'js-cookie';

const UserProfile = lazy(() => import('./UserProfile'));

const Profile = ({profileUser, handleExploreMore}) => {
    console.log(profileUser);
    const [currUser, setCurrUser] = useState();
    const fetchCurrUser = async () => {
        const result = await fetch("/api/current-user/", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get('access_token')}`,
            },
          },)
          .then((response) => response.json())
          .then((data) => {console.log(data); setCurrUser(data.current_user);});
        }   
        useEffect(() => {fetchCurrUser()}, []);
    console.log(currUser);
    return (
        <div className="full-page">
            <UserProfile loggedIn={profileUser == currUser} following={true} profileUser={profileUser} handleExploreMore={handleExploreMore}/>
        </div>
    )
}

export default Profile;