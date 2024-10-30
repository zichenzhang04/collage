import React, {useState, lazy, useEffect} from 'react';
import {Image } from '@mantine/core';
import profPic from '../images/prof-pic.jpg';
import fullLogo from '../images/full-logo.png';
import '../CSS/Search.css';
import { GolfCourse } from '@mui/icons-material';
import courseIcon from '../images/temp.png';
const Sidebar = lazy(() => import('./Sidebar'));
const CourseTag = lazy(() => import('./CourseTag'));

const Catalog = (currData, updatePage) => {
    const sampleData = [{courseNumber: "ECON 101", courseName: "Principles of Economics I", percentMatch: "95%",
                        rating: 3, numRatings: 243, tags: ["Intro", "Econ", "LSA"], icon: courseIcon, credits: 4,
                        creditColor: "red", headerColor: "green", iconColor: "blue"
                        }, {courseNumber: 'ECON 201', courseName: 'Principles of Economics II', percentMatch: '96%',
                            rating: 4, numRatings: 850, tags: ['microeconomics', 'competition', 'trade', 'supply and demand', 'taxes'],
                            icon: courseIcon, credits: 3, creditColor: '#c2d7fe', headerColor: '#eff4ff', iconColor: '#000',
                          }]
    const [course, setCourse] = useState(false);
    const renderCourse = () => {
        alert("navigating to course page...");
    };
    return (<>
            {!course && <>
                <div className="left-col"><Sidebar/></div>
                <div className="right-col">
                    <div className="wrapper-grid">
                        {currData.length < 1 && <Title>No Results Found</Title>}
                        {sampleData.length > 0 && sampleData.map((data) => <CourseTag key={data.courseNumber} data={data} onClick={renderCourse}></CourseTag>)}
                    </div>
                </div></>}</>
    )
};

export default Catalog;