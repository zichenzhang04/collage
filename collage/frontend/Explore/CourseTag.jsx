import React from 'react';
import '../CSS/course_tag.css';
import starFilled from '../Icons/starFilled.svg';
import starEmpty from '../Icons/starEmpty.svg';
import tinycolor from "tinycolor2";

function CourseCard({
  // courseNumber,
  // courseName,
  // percentMatch,
  // rating,
  // numRatings,
  // tags,
  // icon,
  // credits,
  // creditColor,
  // headerColor,
  // iconColor,
  data,
  onClick,
}) {

  const darkCreditColor = tinycolor(data.creditColor).darken(30).toString();
  const stars = Array(5).fill(0).map((_, index) => (
  <span key={index} className="star">
    {index < data.rating ? (
      <img className='star' src= {starFilled} alt="S" />
    ) : (
      <img src= {starEmpty} alt="E" />
    )}
  </span>
  ));

  return (
    <div className="course-tag" onClick={onClick}>
        
      <div className="header" style={{ backgroundColor: data.headerColor }}>
        <img src={data.icon} alt="Course Icon" style={{ color: data.iconColor }} className="course-icon" />
        
        <div className="course-info">
            <div className="top-row">
                
            <h3 className="course-number"> {data.courseNumber}</h3>
            
            <div className="credits" style={{ backgroundColor: data.creditColor, color:darkCreditColor }}>
                {data.credits} credits
            </div>
            </div>
            
            <h4 className="course-name">{data.courseName}</h4>
          
        </div>
        
      </div>
      

      <div className="body">
            <div className='rating-text'>
                Rating
            </div>
        
        <div className="top-section">
            <div className="match">
            <p>{data.percentMatch} match</p>
            </div>
            
            <div className="rating">
                <div>
                    {stars}
                </div>
                <span className='star-text'>(Out of {data.numRatings} people)</span>
            </div>
        </div>
    
        <span className='course-tag-text'>Course tags</span>
        
        <div className="tags">
          {data.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default CourseCard;
