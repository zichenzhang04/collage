import React, {useState, useEffect} from "react";
import headerImage from '../images/profile-header.png';
import batman from '../images/max-pic.png';
import gmail64 from '../images/gmail64.svg.png';
import linkedin64 from '../images/linkedin64.png';
import camera from '../images/change-profile.png';
import '../CSS/Personal.css';
import '../CSS/Search.css';
import { Popover, Group, Button, Text, rem} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX} from '@tabler/icons-react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, getMetadata, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyDc5B7m__Z77iTyQYmb9cXxrn7Bo3a9C18',
  authDomain: "collage-849c3.firebaseapp.com",
  projectId: "collage-849c3",
  storageBucket: "collage-849c3.appspot.com",
  messagingSenderId: "302505148937",
  appId: "1:302505148937:web:05f9caf3eb3bf860ac2ed8",
  measurementId: "G-FZFTH0MVNY"
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let userData = {
  profilePicture: batman,
  name: "Max Feldman",
  userTag: "MaxFeldman",
  pronouns: "he/him",
  followers: "200",
  following: "124",
  major: "Philosophy, Politics, Economics",
  minor: "Creative Writing and Entrepreneurship",
  college: "Undergraduate LSA",
  graduationYear: "2026",
  email: "maxfeld@umich.edu",
  linkedin: "https://www.linkedin.com/in/maxbfeldman/"
}

const Personal = ({isUser, userName}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [profile, setProfile] = useState(userData);
  const [imageFileName, setImageFileName] = useState('');
  const [imageFile, setImageFile] = useState();
  const [opened, setOpened] = useState(false);
  
  useEffect(() => {
    
  })

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Make POST request here
    userData = profile;
  }
  const handleImageUpload = (files) => {
    if (files && files[0]) {
      setImageFile(files[0]);
      setImageFileName(files[0].name);

      const storageRef = ref(storage, `photos/${userName}/${files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on("state_changed", 
        (snapshot) => {
          //can track progress here
        },
        (error) => {
          console.error('Photo upload failed:', error);
        },
        () => {
          console.log('Photo uploaded successfully');
        }
      );
    }
    setOpened(false);
  };


  console.log(isUser);
  console.log(typeof isUser);
  return (
    <>
      {/* {userData ? ( */}
        <div className="personal-container">
          <div className="personal-header">
            <div className="header-image-container">
              {/* top header image */}
              <img src={headerImage} alt="image" className="header-image"/>

              {/* pencil button */}
              {isUser && (
                <button onClick={togglePopup} className="pencil-button" style={{backgroundColor: "transparent"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="pencil-icon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                  </svg>
                </button>
              )}

              {/* popup box */}
              {isPopupVisible && (
                <div className="popup-overlay" onClick={togglePopup}>
                  <div className="popup-box" onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                      <h2>Edit Profile</h2>
                      <button onClick={togglePopup} className="close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="popup-content">
                      <div className="form-group">
                        <p>Name</p>
                        <input 
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Major</p>
                        <input 
                          type="text"
                          name="major"
                          value={profile.major}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Minor</p>
                        <input 
                          type="text"
                          name="minor"
                          value={profile.minor}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Minor</p>
                        <input 
                          type="text"
                          name="college"
                          value={profile.college}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Graduation Year</p>
                        <input 
                          type="text"
                          name="graduationYear"
                          value={profile.graduationYear}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>LinkedIn</p>
                        <input 
                          type="text"
                          name="linkedin"
                          value={profile.linkedin}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <p>Gmail</p>
                        <input 
                          type="text"
                          name="gmail"
                          value={profile.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="popup-footer">
                      <button onClick={() => { handleSubmit(); togglePopup(); }} className="save-btn">Save Changes</button>
                    </div>
                  </div>
                </div>
              )}

              {/* profile picture */}
              <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
              
              {/* camera button */}
              {isUser && (
                <Popover width={300} opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setOpened(false)} trapFocus position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <button onClick={() => setOpened(true)} className="camera-button"> 
                      <img src={camera} alt="Camera" className="camera"/>
                    </button>
                  </Popover.Target>
                <Popover.Dropdown  styles={{dropdown: {color: "black", backgroundColor: "white"}}} radius="md">
                <Dropzone
                  multiple={false}
                  style={{ height: "100%", color: '#5d5d5d' }}
                  onDrop={handleImageUpload}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  className="resume-drop"
                >
                  <Group position="center" spacing="xl" mih={60} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload
                        style={{ width: "100%", height: "100%", color: 'var(--mantine-color-blue-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{ width: "100%", height: "100%", color: 'var(--mantine-color-red-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconUpload
                        style={{ width: rem(30), height: rem(30), color: 'var(--mantine-color-dimmed)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Idle>
                    <Text size="md">
                      {'Click or drag file here to upload photo'}
                    </Text>
                  </Group>
                </Dropzone>
                  <div className='filters-footer'>
                    <div className='confirm-button'>
                      <Button 
                              styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                              radius="xl" onClick={() => {console.log("confirm"); setOpened(false);}} size="xs">
                                  Confirm
                      </Button>
                    </div>
                    <div className='cancel-button'>
                      <Button 
                              styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                              radius="xl" onClick={() => {console.log("cancel"); setOpened(false);}} size="xs">
                                  Cancel
                      </Button>
                    </div>
                  </div>
                </Popover.Dropdown>
                </Popover>
                
              )}
            </div>

            <div className="header-content">
              <h1 className="name">{userData.name}</h1>
              <p className="user-tag">@{userData.userTag} &nbsp; | &nbsp; {userData.pronouns}</p>
              
              {/* edit profile button */}
              {isUser && (
                <button className="edit-icon" style={{padding: "15px 0px 0px 0px"}} onClick={togglePopup}>edit profile</button>
              )}

              <div className="icons">
                {userData.email ? (
                  <button onClick={() => window.location.href = `mailto:${userData.email}`} className="email">
                    <img src={gmail64} alt="gmail"/>
                  </button>
                ) : (
                  <button disabled className="email-disabled">
                    <img src={gmail64} alt="gmail"/>
                  </button>
                )}
                
                {userData.linkedin ? (
                  <button onClick={() => window.open(userData.linkedin, '_blank')} className="linkedin">
                    <img src={linkedin64} alt="gmail"/>
                  </button>
                ) : (
                  <button disabled className="linkedin-disabled">
                    <img src={linkedin64} alt="gmail"/>
                  </button>
                )}
              </div>

              <div className="followers">
                <p>{userData.followers} followers</p>
                <p>{userData.following} following</p>
              </div>
            </div>

          </div>
          <div className="personal-info">
            <p className="label">MAJOR</p>
            <p className="data">{userData.major}</p>
            <p className="label">MINOR</p>
            <p className="data">{userData.minor}</p>
            <p className="label">COLLEGE</p>
            <p className="data">{userData.college}</p>
            <p className="label">GRADUATION YEAR</p>
            <p className="data">{userData.graduationYear}</p>
          </div>

        </div>
      {/* ) : (
        <p>Loading...</p>
      )} */}
    </>
  );
};

export default Personal;