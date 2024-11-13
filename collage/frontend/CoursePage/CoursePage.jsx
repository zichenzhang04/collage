import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../CSS/classPreview.css';

const ChatSection = styled.div`
  background-color: #f0f4ff;
  padding: 20px;
  flex: 2;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #c3c3c3;
  border-radius: 31px;
  height: 453px;
  margin-top: 45px;
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
      <div className="chat-box">

        <ChatSection>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TabButton active={activeTab === 'Academic'} onClick={() => handleTabChange('Academic')}>Academic</TabButton>
            <TabButton active={activeTab === 'Availability'} onClick={() => handleTabChange('Availability')}>Availability</TabButton>
            <TabButton active={activeTab === 'Professional'} onClick={() => handleTabChange('Professional')}>Professional</TabButton>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '15px', backgroundColor: '#fff', height: '100%' }}>

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
  );
};

export default CoursePage;