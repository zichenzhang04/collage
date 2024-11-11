import React, {useState, useEffect, lazy} from "react";
import { Button, ActionIcon, rem } from '@mantine/core';
import { IconBookmark, IconStar } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import '../CSS/Search.css';
import '../CSS/classPreview.css';
import '../CSS/course_tag.css';
import starFilled from '../Icons/starFilled.svg';
import starEmpty from '../Icons/starEmpty.svg';
// import fullLogo from '../images/full-logo.png';
import icon from '../images/temp.png';
const Rating = lazy(() => import('./rating'))

const Classpreview = () => {
    const stars = Array(5).fill(0).map((_, index) => (
    <span key={index} className="star">
        {index < 3 ? (
        <img className='star' src= {starFilled} alt="S" />
        ) : (
        <img src= {starEmpty} alt="E" />
        )}
    </span>
    ));
    return (<>
        <div className="content">
            <div className="preview">
                <div className="card">
                    <div className="title-grid">
                        <img src={icon} alt="classicon" className="icon" />
                        <div className="middle">
                            <h1>Biology 212</h1>
                            <p>Plant and Human Health</p>
                            <p className="match">96% match</p>
                        </div>
                        <div className="rating-flex">
                            <div className="rate-and-save">
                                <Button variant="default" radius="xl" rightSection={<IconBookmark size={20} stroke={1}/>}>Save</Button>
                                <Button variant="default" radius="xl" rightSection={<IconStar size={20} stroke={1}/>}>Rate</Button>
                            </div>
                            <div className="rating-row">
                            <div>
                                {stars}
                            </div>
                                <span className='star-text'>(Out of 150 people)</span>
                            </div>
                        </div>
                    </div>
                    <div className="newLine">
                        <div className="class-info">
                            <p className="class-title">Credits</p>
                            <p className="value credits">3</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Subject</p>
                            <p className="value subject">Biology</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Department</p>
                            <p className="value department">LSA</p>
                        </div>
                        <div className="class-info">
                            <p className="class-title">Status</p>
                            <p className="value status">Open</p>
                        </div>
                    </div>
                </div>
                <div className="class-description">
                    <h2 className="desTitle">Course Description</h2>
                    <p className="desc">
                        This course explores basic botany, the human use of plants for food and medicine, and the relationship between environment and human health, requiring active participation in discussions, field trips, and a self-designed project for independent learning. By the end of the course, students will have gained a comprehensive understanding of the vital role plants play in sustaining life on Earth and the complex interplay between human society and the natural world.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Classpreview