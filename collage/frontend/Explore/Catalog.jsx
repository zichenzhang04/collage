import React, {useState, lazy, useEffect} from 'react';
import courseIcon from '../images/temp.png';
const Sidebar = lazy(() => import('./Sidebar'));
const CourseTag = lazy(() => import('./CourseTag'));
const IndividualCourse = lazy(() => import('../Class/IndividualCourse'));

const Catalog = (currData) => {
    const sampleData = [{course_code: "ECON 101", course_name: "Principles of Economics I", percent_match: "95%",
                        rating: 3, num_ratings: 243, tags: ["Intro", "Econ", "LSA"], icon_url: courseIcon, credit_hours: 4,
                        credit_color: "red", header_color: "green", icon_color: "blue"
                        }, {course_code: "ECON 201", course_name: "Principles of Economics I", percent_match: "95%",
                        rating: 3, num_ratings: 243, tags: ["Intro", "Econ", "LSA"], icon_url: courseIcon, credit_hours: 4,
                        credit_color: "red", header_color: "green", icon_color: "blue"
                        }]
    const [course, setCourse] = useState(false);
    const [courseId, setCourseId] = useState('econ101');
    const handleBack = () => {
        setCourse(false);
    };
    return (<>
            {!course && <>
                <div className="left-col"><Sidebar/></div>
                <div className="right-col">
                    <div className="wrapper-grid">
                        {currData.length < 1 && <Title>No Results Found</Title>}
                        {sampleData.length > 0 && sampleData.map((data) => <CourseTag key={data.course_id} data={data} onClick={() => {setCourse(true); setCourseId(data.course_id);}}></CourseTag>)}
                    </div>
                </div></>}
            {course && <IndividualCourse courseId={courseId} handleBack={handleBack}/>}</>
    )
};

export default Catalog;