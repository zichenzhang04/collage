import React, {lazy} from "react";
import { Grid, Overlay, Image } from "@mantine/core";
import { Link } from 'react-router-dom';
import '../CSS/userProfile.css';

const Personal = lazy(() => import('./Personal'));
const Upload = lazy(() => import('./FileUpload'));
const Saved = lazy(() => import('./Savedcourses'));
import saved from '../images/blurredSaved.png';
import schedule from '../images/blurredSchedule.png';

const UserProfile = () => {
    return (
        // personal
        <div className="body">
            <Grid>
                <Grid.Col span={12}>
                    <div className="title">
                        <h1>Profile</h1>
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Personal/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <ActivityGlimpse/>
                </Grid.Col>
                <Grid.Col span={12}>
                    <h2>Schedule Builder</h2>
                    <div className="builder">
                        <Upload/>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className="schedule">
                        
                        <h2>Alex's' Schedule</h2>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <h3>Saved Courses</h3>
                    <Saved/>
                </Grid.Col>
            </Grid>
        </div>

        // following
        // <div className="body">
        //     <Grid>
        //         <Grid.Col span={12}>
        //             <div className="title">
        //                 <h1>Profile</h1>
        //             </div>
        //         </Grid.Col>
        //         <Grid.Col span={6}>
        //             <Personal/>
        //         </Grid.Col>
        //         <Grid.Col span={6}>
        //             <ActivityGlimpse/>
        //         </Grid.Col>
        //         <Grid.Col span={12}>
        //             <div className="schedule">
                        
        //                 <h2>Alex's' Schedule</h2>
        //             </div>
        //         </Grid.Col>
        //         <Grid.Col span={12}>
        //             <h3>Saved Courses</h3>
        //             <Saved/>
        //         </Grid.Col>
        //     </Grid>
        // </div>
        
        // Outside
        // <div className="body">
        //     <Grid>
        //         <Grid.Col span={12}>
        //             <div className="title">
        //                 <h1>Profile</h1>
        //             </div>
        //         </Grid.Col>
        //         <Grid.Col span={6}>
        //             <Personal/>
        //         </Grid.Col>
        //         <Grid.Col span={6}>
        //             <ActivityGlimpse/>
        //         </Grid.Col>
        //         <Grid.Col span={12}>
        //             <p>You must be following Alex to view his schedule and saved courses</p> 
        //         </Grid.Col>
        //         <Grid.Col span={12}>
        //             <Image src={ schedule } className="sample"/>
        //         </Grid.Col>
        //         <Grid.Col span={12}>
        //             <Image src={ saved } className="sample"/>
        //         </Grid.Col>
        //     </Grid>
        // </div>
    )
}

export default UserProfile;