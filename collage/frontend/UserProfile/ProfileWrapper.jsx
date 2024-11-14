import React, {lazy, useState, useEffect} from "react";
import { Grid, Image } from "@mantine/core";
import '../CSS/userProfile.css';
import '../CSS/Search.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserProfile = lazy(() => import('./UserProfile'));

const Profile = ({profileUser, handleExploreMore}) => { //profileUser is user.id
    console.log(profileUser);
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        axios.get(`/api/current-user-id`, {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('access_token')}`,
            },
        })
        .then((response) => setCurrUser(response.data))
        .catch((err) => console.error(err));
    }, []);
    
    console.log("CURR USER: ", currUser);

    return (
        <div className="full-page">
            <UserProfile loggedIn={profileUser == currUser} following={true} profileUser={profileUser} handleExploreMore={handleExploreMore}/>
        </div>
    )
}

export default Profile;