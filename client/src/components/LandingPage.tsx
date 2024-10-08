import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <h1 className="main-title">ChatApp</h1> {/* Cool app name */}
        <p className="main-para">
          Connect with friends through instant messaging and video calls!
        </p>
        <div className="buttons">
          <Link to="/login">
            <button className="primary-button">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
