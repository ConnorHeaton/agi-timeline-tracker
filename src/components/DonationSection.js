import React from 'react';

const DonationSection = () => {
  return (
    <div className="donation-section">
      <h3>Support My Work</h3>
      <p>Support hosting costs to keep the site running.</p>
      
      <div className="donation-options">
        <a 
          href="https://www.paypal.com/ncp/payment/N8TP2UD8KG2DY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button"
        >
          Donate via PayPal
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
    </div>
  );
};

export default DonationSection;