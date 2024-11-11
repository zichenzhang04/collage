import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
`;

const CourseCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const CourseInfo = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const CourseImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const CollageBoard = styled.div`
  margin-top: 30px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 10px;
`;

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
`;

const CourseFinder = styled.div`
  margin-top: 30px;
`;

const AvailabilityTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Tab = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#333' : '#ddd')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 5px;
`;

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [friends, setFriends] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Fetch course data
    axios.get('/api/course/1').then((res) => setCourse(res.data)).catch((err) => console.error(err));
    // Fetch friends data
    axios.get('/api/friends').then((res) => {setFriends(res.data); console.log(res.data)}).catch((err) => console.error(err));
  }, []);

  const handleCourseFinder = async () => {
    try {
      const res = await axios.post('/api/ai-course-finder', { query });
      setAiResponse(res.data.response);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const handleSaveCourse = (courseId) => {
    axios.post('/api/save-course', { user_id: 1, course_id: courseId })
      .then((res) => alert(res.data.message))
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Header>
        <SearchBar
          placeholder="Search for a course, professor, subject, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FilterButton onClick={handleCourseFinder}>All Filters</FilterButton>
      </Header>

      {course && (
        <CourseCard>
          <CourseInfo>
            <h2>{course.course_name}</h2>
            <h3>{course.course_description}</h3>
            <div>
              <span>Credits: {course.credits}</span> |
              <span>Department: {course.department}</span>
            </div>
            <button onClick={() => course.course_id && handleSaveCourse(course.course_id)}>Save</button>
          </CourseInfo>
          <CourseImage src={course.ai_img_url} alt={course.course_name} />
        </CourseCard>
      )}

      <CollageBoard>
        <h3>The Collage Board</h3>
        <p>With Collage Board, you can view what your friends are doing with their schedules...</p>
        {friends.map((friend) => (
          <ProfileCard key={friend.user_id}>
            <ProfilePic src={friend.profile_img_url || `default-profile.jpg`} alt={friend.full_name} />
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleCourseFinder}>Search</button>
        {aiResponse && <p>{aiResponse}</p>}
      </CourseFinder>
    </Container>
  );
};

export default CoursePage;
