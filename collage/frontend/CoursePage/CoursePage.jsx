import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div;
const Header = styled.div;
const SearchBar = styled.input;
const FilterButton = styled.button;

const CourseCard = styled.div;
const CourseInfo = styled.div;
const CourseImage = styled.img;

const CollageBoard = styled.div;
const ProfileCard = styled.div;
const ProfilePic = styled.img;

const CourseFinder = styled.div;
const AvailabilityTabs = styled.div;
const Tab = styled.button;

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [friends, setFriends] = useState([]);
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    // Fetch course data
    axios.get('/api/course/1').then((res) => setCourse(res.data));
    // Fetch friends data
    axios.get('/api/friends').then((res) => setFriends(res.data));
  }, []);

  const handleCourseFinder = async (query) => {
    const res = await axios.post('/api/ai-course-finder', { query });
    setAiResponse(res.data.response);
  };

  const handleSaveCourse = (courseId) => {
    axios.post('/api/save-course', { user_id: 1, course_id: courseId })
      .then((res) => alert(res.data.message))
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Header>
        <SearchBar placeholder="Search for a course, professor, subject, etc." />
        <FilterButton>All Filters</FilterButton>
      </Header>

      {course && (
        <CourseCard>
          <CourseInfo>
            <h2>{course.course_name}</h2>
            <h3>{course.course_description}</h3>
            <p>{course.course_description}</p>
            <div>
              <span>Credits: {course.credits}</span> |
              <span>Subject: {course.subject}</span> |
              <span>Department: {course.department}</span> |
              <span>Status: {course.status}</span>
            </div>
            <button onClick={() => handleSaveCourse(course.course_id)}>Save</button>
          </CourseInfo>
          <CourseImage src={course.ai_img_url} alt={course.course_name} />
        </CourseCard>
      )}

      <CollageBoard>
        <h3>The Collage Board</h3>
        <p>With Collage Board, you can view what your friends are doing with their schedules...</p>
        {friends.map((friend) => (
          <ProfileCard key={friend.user_id}>
            <ProfilePic src={`profile_images/${friend.user_id}.jpg`} alt={friend.full_name} />
            <div>
              <h4>{friend.full_name}</h4>
              <p>Major: {friend.major}</p>
              <button>Follow</button>
            </div>
          </ProfileCard>
        ))}
      </CollageBoard>

      <CourseFinder>
        <h3>AI Course Finder</h3>
        <p>Search for an AI class, and we'll help you</p>
        <AvailabilityTabs>
          <Tab active>Availability</Tab>
          <Tab>Professional</Tab>
          <Tab>Academic</Tab>
        </AvailabilityTabs>
        <input
          type="text"
          placeholder="Will BIOLOGY 212 fill up before my registration date?"
          onChange={(e) => handleCourseFinder(e.target.value)}
        />
        {aiResponse && <p>{aiResponse}</p>}
      </CourseFinder>
    </Container>
  );
};

export default CoursePage;
