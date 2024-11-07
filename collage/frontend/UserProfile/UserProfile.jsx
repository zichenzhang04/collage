import React, {lazy} from "react";
import { Grid, Image } from "@mantine/core";
import '../CSS/userProfile.css';

const Personal = lazy(() => import('./Personal'));
const Upload = lazy(() => import('./FileUpload'));
const Saved = lazy(() => import('./Savedcourses'));
const Schedule = lazy(() => import('./Schedule'));
const ActivityGlimpse = lazy(() => import('./ActivityGlimpse'));

import saved from '../images/blurredSaved.png';
import schedule from '../images/blurredSchedule.png';

function UserProfile(loggedIn, following) {
    if (loggedIn) {
        return(
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
                            <Schedule/>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <h3>Saved Courses</h3>
                        <Saved/>
                    </Grid.Col>
                </Grid>
            </div>
        )
    } else {
        if (following) {
            return (
                // following
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
                            {/* <ActivityGlimpse/> */}
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
            )
        } else {
            return (
                // Outside
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
                            {/* <ActivityGlimpse/> */}
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <p>You must be following Alex to view his schedule and saved courses</p> 
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Image src={ schedule } className="sample"/>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Image src={ saved } className="sample"/>
                        </Grid.Col>
                    </Grid>
                </div>
            )
        }
    }
}

export default UserProfile;