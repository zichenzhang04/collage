import { Image, Button } from "@mantine/core";
import React from "react";
import temp from '../images/tempHeadshot.png';
import '../CSS/requests.css';

const Requests = () => {
    return (
        <div className="requests">
            <ul>
                <li className="request">
                    <Image src={ temp } className="headshot"/>
                    <div className="info">
                        <h2 className="name">Sasha May</h2>
                        <p className="basic">
                            <span className="handle">@SashaMay </span> 
                            <span className="major">Chemical Engineering </span> 
                            <span className="year">'26</span>
                        </p>
                        <p className="subtext">
                            <span className="follower1">Charlie, </span> 
                            <span className="follower2">Max, </span> 
                            <span className="followerCount">12 </span> 
                            <span className="others">others follow Sasha May</span>
                        </p>
                    </div>
                    <div className="timer">
                        <span className="time">1 </span>
                        <span className="measure">day</span>
                    </div>
                    <div className="buttons">
                        <Button className="button approve">Connect</Button>
                        <Button className="button reject" variant="default">Dismiss</Button>
                    </div>
                </li>
                <li className="request">
                    <Image src={ temp } className="headshot"/>
                    <div className="info">
                        <h2 className="name">Tasha Diaz</h2>
                        <p className="basic">
                            <span className="handle">@TashaD19 </span> 
                            <span className="major">Enviromental science </span> 
                            <span className="year">'25</span>
                        </p>
                        <p className="subtext"> 
                            <span className="follower2">Max, </span> 
                            <span className="followerCount">3 </span> 
                            <span className="others">others follow Sasha May</span>
                        </p>
                    </div>
                    <div className="timer">
                        <span className="time">2 </span>
                        <span className="measure">weeks</span>
                    </div>
                    <div className="buttons">
                        <Button className="button approve">Connect</Button>
                        <Button className="button reject" variant="default">Dismiss</Button>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default Requests;