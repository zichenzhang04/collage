import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '@mantine/core';
import './styles/Navbar.css';
import logo from './images/collage-logo.png';


const Navbar = () => {
  const location = useLocation();

  const hiddenPaths = ['/login', '/signup'];

  if(hiddenPaths.includes(location.pathname)){
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <Image style={{ width: '1vw'}} src={logo} className="logo-image"/>
          </Link>
        </li>
        <li className="logo">
          <Link to="/" className="logo-text">Collage</Link>
        </li>
        <li className="link-1">
          <Link to="/about" className="story">About Us</Link>
        </li>
        <li className="link-2">
          <Link to="/forstudents" className="mission">For Students</Link>
        </li>
        <li className="link-3">
          <Link to="/support" className="support">Support</Link>
        </li>
        <li className='link-4'>
          <Link to="/login" className="login">Log in</Link>
        </li>
        <li className='link-5'>
          <Link to="/signup" className="signup">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;