import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin-right: 10px;
`;

const InfoBadge = styled.div`
  display: inline-block;
  background-color: ${({ color }) => color || '#ddd'};
  color: white;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

const CourseDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
`;

const CourseInfoSection = styled.div`
  flex: 1;
`;

const CollageBoardSection = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
`;

const ChatSection = styled.div`
  background-color: #ffecd1;
  padding: 20px;
  border-radius: 10px;
  flex: 2;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;
  width: 30%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CollageBoardContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const FollowButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ isRequested }) => (isRequested ? '#ddd' : '#007bff')};
  color: ${({ isRequested }) => (isRequested ? '#333' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TabButton = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: ${({ active }) => (active ? '#333' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const ChatInput = styled.input`
  border: none;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
`;

const CoursePage = () => {
  const [course, setCourse] = useState({
    course_name: "ECON 101",
    course_description: "Principles of Economics I",
    credits: "4",
    department: "Economics",
    subject: "ECON",
    status: "Open"
  });

  const [friends, setFriends] = useState([
    { user_id: 1, full_name: "Charlie Zhang", major: "Computer Science", profile_img_url: null },
    { user_id: 2, full_name: "Daria Skalitzky", major: "Cognitive Science", profile_img_url: null },
    { user_id: 3, full_name: "Adam Meskouri", major: "Political Science", profile_img_url: null }
  ]);

  const [followStatus, setFollowStatus] = useState({});
  const [activeTab, setActiveTab] = useState('Academic');
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const placeholderQuestions = {
    Academic: "How intense is the course load in Econ 101?",
    Availability: "Will ECON 101 fill up before my registration date?",
    Professional: "How does ECON 101 apply to real-world careers?"
  };

  useEffect(() => {
    // Fetch data from API
    axios.get('/api/course/1').then((res) => setCourse(res.data)).catch(console.error);
    axios.get('/api/friends').then((res) => setFriends(res.data)).catch(console.error);
  }, []);

  const handleFollow = (userId) => {
    axios.post('/api/follow', { user_id: userId, follower_id: 1 })  // Replace `1` with the current user's ID
      .then(() => {
        setFollowStatus((prev) => ({ ...prev, [userId]: 'Requested' }));
      })
      .catch(console.error);
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleCourseFinder = async () => {
    try {
      const res = await axios.post('/api/ai-course-finder', { query });
      setAiResponse(res.data.response || 'No AI response available');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('No AI response available');
    }
  };

  return (
    <Container>
      <Header>
        <SearchBar placeholder="Search for a course, professor, subject, etc." value={query} onChange={(e) => setQuery(e.target.value)} />
      </Header>

      <CourseDetailsContainer>
        <CourseInfoSection>
          <h2>{course.course_name}</h2>
          <p>{course.course_description}</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <InfoBadge color="#FF7878">Credits: {course.credits}</InfoBadge>
            <InfoBadge color="#FFCC99">Subject: {course.subject}</InfoBadge>
            <InfoBadge color="#66CC99">Department: {course.department}</InfoBadge>
            <InfoBadge color="#99CCFF">Status: {course.status}</InfoBadge>
          </div>
        </CourseInfoSection>
      </CourseDetailsContainer>

      <div style={{ display: 'flex', gap: '20px' }}>
        <CollageBoardSection>
          <h3>The Collage Board</h3>
          <CollageBoardContainer>
            {friends.map((friend) => (
              <ProfileCard key={friend.user_id}>
                <img
                  src={friend.profile_img_url || 'images/max-pic.png'}
                  alt={friend.full_name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
                />
                <div>
                  <h4>{friend.full_name}</h4>
                  <p>{friend.major}</p>
                  <FollowButton
                    onClick={() => handleFollow(friend.user_id)}
                    isRequested={followStatus[friend.user_id] === 'Requested'}
                  >
                    {followStatus[friend.user_id] === 'Requested' ? 'Requested' : 'Follow'}
                  </FollowButton>
                </div>
              </ProfileCard>
            ))}
          </CollageBoardContainer>
        </CollageBoardSection>

        <ChatSection>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TabButton active={activeTab === 'Academic'} onClick={() => handleTabChange('Academic')}>Academic</TabButton>
            <TabButton active={activeTab === 'Availability'} onClick={() => handleTabChange('Availability')}>Availability</TabButton>
            <TabButton active={activeTab === 'Professional'} onClick={() => handleTabChange('Professional')}>Professional</TabButton>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '15px', backgroundColor: '#fff' }}>
            {aiResponse || placeholderQuestions[activeTab]}
          </div>
          <ChatInput
            type="text"
            placeholder={placeholderQuestions[activeTab]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleCourseFinder} style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#333', color: '#fff', border: 'none', marginTop: '10px' }}>
            Ask
          </button>
        </ChatSection>
      </div>
    </Container>
  );
};

export default CoursePage;
