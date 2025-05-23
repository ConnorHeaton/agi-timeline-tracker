import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>AGI Timeline Tracker</h3>
          <p>Tracking expert predictions on artificial general intelligence timelines.</p>
        </div>
        
        <div className="footer-section">
          <h3>Links</h3>
          <ul className="footer-links">
            <li><a href="#methodology">Methodology</a></li>
            <li><a href="https://github.com/agitimeline/tracker" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AGI Timeline Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;