import React from 'react';

const DonationSection = () => {
  return (
    <section className="donation-section">
      <h2>Support AGI Timeline Tracker</h2>
      <p>
        This resource is provided for free to the AI safety and alignment community.
        Your donations help cover hosting costs and fund ongoing maintenance.
      </p>
      
      <div className="donation-options">
        <a href="#donate" className="donation-button">
          Donate $5 to hosting costs
        </a>
      </div>
      
      <div className="subscription-section">
        <h3>Stay Updated on AI Progress</h3>
        <p>
          Read analysis of AI progress and other topics on Connor's Substack
        </p>
        <a 
          href="https://connorhmain.substack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button"
        >
          Subscribe to the Newsletter
        </a>
      </div>
      
      <p className="donation-note">
        For tax-deductible donations or other support options, please 
        <a href="mailto:support@agitimeline.org"> contact us</a>.
      </p>
    </section>
  );
};

export default DonationSection;