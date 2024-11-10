import React, { Suspense, useState, lazy } from "react";
// import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Title, Button, Group } from '@mantine/core';
const LandingNew = lazy(() => import('./Landing/Landing-new'));
const About = lazy(() => import('./About'));
const ForStudents = lazy(() => import('./ForStudents'));
const Signup = lazy(() => import('./Signup/Wrapper'));
const Login = lazy(() => import('./Login/Wrapper'));
const Classpreview = lazy(() => import('./Class/Preview'));
const Personal = lazy(() => import('./UserProfile/Personal'));
const FileUpload = lazy(() => import('./UserProfile/FileUpload'));
const Requests = lazy(() => import('./Network/Requests'));
const Savedcourses = lazy(() => import('./UserProfile/Savedcourses'));
const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
const Schedule = lazy(() => import('./UserProfile/Schedule'));
const ActivityGlimpse = lazy(() => import('./UserProfile/ActivityGlimpse'));
// const Dev = lazy(() => import('./HomeWrapper'));
const Dev = lazy(() => import('./UserProfile/UserProfile'));
const Home = lazy(() => import('./HomeWrapper'));
const Connections = lazy(() => import('./Connections'));
const NetworkWrapper = lazy(() => import('./Network/NetworkWrapper'));

export default function Registration() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  return (
    <>
    <Suspense fallback={<h1>loading...</h1>}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LandingNew />} />
              <Route path="/about" element={<About />} />
              <Route path="/forstudents" element={<ForStudents />} />
              <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} registered={registered} setRegistered={setRegistered}/>} />
              <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setRegistered={setRegistered}/>} />
              <Route path="/classpreview" element={<Classpreview />} />
              <Route path="/savedcourses" element={<Savedcourses />} />
              <Route path="/profile" element={<Personal isUser={true} userName="hello"/>}/>
              <Route path="/file" element={<FileUpload />}/>
              <Route path="/classpreview" element={<Classpreview />} />
              <Route path="/savedcourses" element={<Savedcourses />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/dev" element={<Dev />} />
              <Route path="/home" element={<Home />} />
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/network" element={<NetworkWrapper/>}/>
            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  );
};
