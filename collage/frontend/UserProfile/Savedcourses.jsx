import { Image, Button, Rating, ActionIcon } from "@mantine/core";
import { IconBookmark } from '@tabler/icons-react';
import React from "react";
import '../CSS/savedCourses.css';
import courseLogo1 from '../images/tempLogo1.png';
import courseLogo2 from '../images/tempLogo2.png';
import courseLogo3 from '../images/tempLogo3.png';
import courseLogo4 from '../images/tempLogo4.png';
import '../CSS/course_tag.css';
import starFilled from '../Icons/starFilled.svg';
import starEmpty from '../Icons/starEmpty.svg';

const stars = (numStars) => {
    const starComponent = Array(5).fill(0).map((_, index) => (
    <span key={index} className="star">
      {index < numStars ? (
        <img className='star' src= {starFilled} alt="S" />
      ) : (
        <img src= {starEmpty} alt="E" />
      )}
    </span>
    ));
    return starComponent;
}

const Savedcourses = () => {
    
    return (
        <ul className="courses">
            <li>
                <div className="course">
                    <Image src={ courseLogo1 } className="logo"></Image>
                    <div className="saved-text">
                        <p className="saved-course-title">BIO 212</p>
                        <p className="description">Plant and Human Health</p>
                    </div>
                    <div className="rating-saved">
                        {stars(3)}
                    </div>
                    <div className="bookmark">
                        <Button>Bookmark</Button>
                    </div>
                </div>
            </li>
            <li>
                <div className="course">
                    <Image src={ courseLogo2 } className="logo"></Image>
                    <div className="saved-text">
                        <p className="saved-course-title">EECS 183</p>
                        <p className="description">Elementary Programming Concepts</p>
                    </div>
                    <div className="rating-saved">
                       {stars(3)}
                    </div>
                    <div className="bookmark">
                        <Button>Bookmark</Button>
                    </div>
                </div>
            </li>
            <li>
                <div className="course">
                    <Image src={ courseLogo3 } className="logo"></Image>
                    <div className="saved-text">
                        <p className="saved-course-title">DATASCI 315</p>
                        <p className="description">Statistics and Artificial Intelligence</p>
                    </div>
                    <div className="rating-saved">
                        {stars(2)}
                    </div>
                    <div className="bookmark-row">
                        <Button>Bookmark</Button>
                    </div>
                </div>
            </li>
            <li>
                <div className="course">
                    <Image src={ courseLogo4 } className="logo"></Image>
                    <div className="saved-text">
                        <p className="saved-course-title">FTVM 272</p>
                        <p className="description">Classic Film Theory I</p>
                    </div>
                    <div className="rating-saved">
                        {stars(5)}
                    </div>
                    <div className="bookmark">
                        <Button>Bookmark</Button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Savedcourses;
