import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <h1>AGI Timeline Tracker</h1>
          <p className="subtitle">
            What experts, researchers and AI CEOs say about their expected timeframes for artificial general intelligence to be achieved (and their definitions of AGI)
          </p>
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#methodology">Methodology</a></li>
            <li><a href="#submit">Suggest an Update</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;