import React, {lazy} from "react";
import { Grid, Image } from "@mantine/core";
import '../CSS/userProfile.css';
import '../CSS/Search.css';

const UserProfile = lazy(() => import('./UserProfile'));

const Profile = ({profileUser, handleExploreMore}) => {
    return (
        <div className="full-page">
            <UserProfile loggedIn={true} following={true} profileUser={profileUser} handleExploreMore={handleExploreMore}/>
        </div>
    )
}

export default Profile;