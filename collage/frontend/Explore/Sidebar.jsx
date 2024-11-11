import React, {useState, lazy, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Image } from '@mantine/core';
import profPic from '../images/prof-pic.jpg';
import fullLogo from '../images/full-logo.png';
import '../CSS/ProfBar.css';

const Sidebar = () => {
    return (
        <div className="full-bar">
          <div className="prof-header-container">
            <Image src={ fullLogo } className="collage-header"/>
            <Image radius="md" src={profPic} className="prof-pic" /> 
          </div>

          <h2 style={{ textAlign: "center" }}>Lego Batman</h2>
          <p style={{ textAlign: "center" }}>Forensics Major at the University of Gotham</p>

          <div className="social-grid">
            <div className="social-titles">
              <p>Profile viewers</p>
              <p>Followers</p>
            </div>

            <div className="social-stats">
              <p>858</p>
              <p>1,025</p>
            </div>
          </div>
          
          <div style={{borderBottom: "1px solid #ECECEC"}} className="social-grid">
            <div className="social-titles">
              <p>Graduation year</p>
              <p>Credits completed</p>
              <p>Credits to complete</p>
              <p>Registration term</p>
            </div>

            <div className="social-stats">
              <p>2026</p>
              <p>91</p>
              <p>23</p>
              <p>FA '24</p>
            </div>
          </div>

          <div className="registration-info">
            <p style={{ textAlign: "center", fontSize: "1.3rem", marginBottom: "15px"}}>Registration Date:</p>
            <p style={{ textAlign: "center" }} className="registration-time">November 28th at 3:00pm</p>
          </div>
        </div>
    )
};

export default Sidebar;