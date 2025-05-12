import React, { useState } from 'react';

const SuggestUpdateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    expert: '',
    otherExpert: '',
    predictionDate: '',
    estimatedDate: '',
    sourceUrl: '',
    definition: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  // List of experts for the dropdown
  const experts = [
    'Sam Altman',
    'Dario Amodei',
    'Demis Hassabis',
    'Metaculus',
    'Mustafa Suleyman',
    'Yann LeCun',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Prepare the data for submission
    const submissionData = {
      ...formData,
      // If "Other" is selected, use the otherExpert value
      expert: formData.expert === 'Other' ? formData.otherExpert : formData.expert,
      'form-name': 'suggest-update'
    };

    try {
      // Submit the form data to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(submissionData).toString()
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      // Reset form and show success message
      setFormData({
        expert: '',
        otherExpert: '',
        predictionDate: '',
        estimatedDate: '',
        sourceUrl: '',
        definition: ''
      });
      setFormStatus({ submitting: false, submitted: true, error: null });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ submitting: false, submitted: false, error: error.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="suggest-update-modal" onClick={e => e.stopPropagation()}>
        <h2>Suggest an Update</h2>
        
        {formStatus.submitted ? (
          <div className="success-message">
            <p>Thank you for your submission! We'll review it soon.</p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <p className="form-description">
              Use this form to suggest a new expert prediction to add to our database.
            </p>
            
            <form 
              name="suggest-update" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
            >
              {/* Hidden input for Netlify Forms */}
              <input type="hidden" name="form-name" value="suggest-update" />
              
              <div className="form-group">
                <label htmlFor="expert">Expert Name*</label>
                <select 
                  id="expert" 
                  name="expert" 
                  value={formData.expert} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an expert</option>
                  {experts.map(expert => (
                    <option key={expert} value={expert}>{expert}</option>
                  ))}
                </select>
                
                {formData.expert === 'Other' && (
                  <div className="form-group">
                    <label htmlFor="otherExpert">Other Expert Name*</label>
                    <input 
                      type="text" 
                      id="otherExpert" 
                      name="otherExpert" 
                      value={formData.otherExpert} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="predictionDate">Prediction Date* (When was the prediction made?)</label>
                <input 
                  type="text" 
                  id="predictionDate" 
                  name="predictionDate" 
                  placeholder="e.g., March 2023" 
                  value={formData.predictionDate} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="estimatedDate">Estimated AGI Date/Range* (What did they predict?)</label>
                <input 
                  type="text" 
                  id="estimatedDate" 
                  name="estimatedDate" 
                  placeholder="e.g., 2030 or 2030-2035" 
                  value={formData.estimatedDate} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sourceUrl">Source URL* (Where was this prediction made?)</label>
                <input 
                  type="url" 
                  id="sourceUrl" 
                  name="sourceUrl" 
                  placeholder="https://example.com/article" 
                  value={formData.sourceUrl} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="definition">AGI Definition* (How did they define AGI?)</label>
                <textarea 
                  id="definition" 
                  name="definition" 
                  rows="4" 
                  value={formData.definition} 
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={formStatus.submitting}
                  className="submit-button"
                >
                  {formStatus.submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              
              {formStatus.error && (
                <div className="error-message">
                  <p>Error: {formStatus.error}</p>
                  <p>Please try again or contact us directly.</p>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestUpdateModal;
