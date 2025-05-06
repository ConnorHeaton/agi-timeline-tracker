import React from 'react';

const DonationSection = () => {
  return (
    <div className="donation-section">
      <h2>Support Our Work</h2>
      <p>Help us continue tracking and analyzing AGI timeline predictions.</p>
      
      <div className="donation-options">
        <a 
          href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button"
        >
          Donate via PayPal
        </a>
        <a 
          href="https://www.patreon.com/agitimeline" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button"
        >
          Support on Patreon
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
    </div>
  );
};

export default DonationSection;