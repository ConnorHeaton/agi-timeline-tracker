import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictionTable from './components/PredictionTable';
import TimelineChart from './components/TimelineChart';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';
import './App.css';

// Import API functions
import { fetchTimelineData } from './services/api';
// Keep the helper for data preparation
import { prepareTimelineData, getLatestPredictionsByExpert } from './utils/dataHelpers';

function App() {
  const [predictions, setPredictions] = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [timelineData, setTimelineData] = useState({ chartData: [], experts: [] });
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [error, setError] = useState(null);

  // Load predictions on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTimelineData();
        const latestPredictions = getLatestPredictionsByExpert(data);
        setPredictions(latestPredictions);
        setFilteredPredictions(latestPredictions);
        setTimelineData(prepareTimelineData(latestPredictions));
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };

    loadData();
  }, []);

  // Handle definition click
  const handleDefinitionClick = (definition) => {
    setSelectedDefinition(definition);
  };

  // Close definition modal
  const closeDefinitionModal = () => {
    setSelectedDefinition(null);
  };

  // Calculate median predicted year
  const calculateMedianYear = () => {
    const years = predictions.map(p => {
      const dateMatch = p.estimatedDate.match(/\d{4}/g);
      if (dateMatch && dateMatch.length > 0) {
        if (dateMatch.length === 1) return parseInt(dateMatch[0]);
        return Math.round((parseInt(dateMatch[0]) + parseInt(dateMatch[dateMatch.length - 1])) / 2);
      }
      return null;
    }).filter(y => y !== null);
    
    if (years.length === 0) return null;
    
    years.sort((a, b) => a - b);
    const mid = Math.floor(years.length / 2);
    return years.length % 2 === 0 ? Math.round((years[mid - 1] + years[mid]) / 2) : years[mid];
  };

  const medianYear = calculateMedianYear();

  return (
    <div className="app-container dark-mode">
      <Header />
      
      <main className="main-content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {medianYear && (
              <>
                <div className="metrics-dashboard">
                  <div className="metric-box">
                    <h3>Median Predicted Year</h3>
                    <div className="metric-value">{medianYear}</div>
                  </div>
                  <div className="metric-box">
                    <h3>Time Until Median Prediction</h3>
                    <div className="metric-value countdown">{medianYear - new Date().getFullYear()} Years</div>
                  </div>
                </div>
                <p className="browser-compatibility-note">
                  Note: There isn't a single agreed definition of AGI, but achieving even the lowest bar definition would likely result in significant economic impacts.
                </p>
              </>
            )}
            
            <PredictionTable 
              predictions={filteredPredictions} 
              isDarkMode={true}
              onViewDefinition={handleDefinitionClick}
            />
            
            <div className="timeline-section">
              <h2>Historical AGI Timeline Predictions</h2>
              <p className="timeline-description">
                How expert predictions have changed over time (showing mean year for date ranges)
              </p>
              <TimelineChart data={timelineData} isDarkMode={true} />
            </div>
            
            <DonationSection />
          </>
        )}
      </main>
      
      <Footer />
      
      {selectedDefinition && (
        <div className="modal-overlay" onClick={closeDefinitionModal}>
          <div className="definition-modal" onClick={e => e.stopPropagation()}>
            <h3>AGI Definition</h3>
            <p>{selectedDefinition}</p>
            <button onClick={closeDefinitionModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;