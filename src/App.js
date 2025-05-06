import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictionTable from './components/PredictionTable';
import FilterPanel from './components/FilterPanel';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframeFilter, setTimeframeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('expert');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  // Handle filters
  useEffect(() => {
    // Filtering and sorting logic
    let result = [...predictions];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.expert.toLowerCase().includes(term) || 
        p.organization.toLowerCase().includes(term) ||
        p.source.toLowerCase().includes(term) ||
        p.definition.toLowerCase().includes(term)
      );
    }
    
    // Apply timeframe filter
    if (timeframeFilter !== 'all') {
      const currentYear = new Date().getFullYear();
      
      switch (timeframeFilter) {
        case 'near':
          result = result.filter(p => {
            const year = parseInt(p.estimatedDate.split('-')[0]);
            return year && year <= currentYear + 10;
          });
          break;
        case 'mid':
          result = result.filter(p => {
            const year = parseInt(p.estimatedDate.split('-')[0]);
            return year && year > currentYear + 10 && year <= currentYear + 30;
          });
          break;
        case 'far':
          result = result.filter(p => {
            const year = parseInt(p.estimatedDate.split('-')[0]);
            return year && year > currentYear + 30;
          });
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'expert':
          comparison = a.expert.localeCompare(b.expert);
          break;
        case 'date':
          const getFirstYear = date => parseInt(date.split('-')[0]);
          comparison = getFirstYear(a.estimatedDate) - getFirstYear(b.estimatedDate);
          break;
        case 'predictionDate':
          const dateA = new Date(a.predictionDate);
          const dateB = new Date(b.predictionDate);
          comparison = dateA - dateB;
          break;
        case 'organization':
          comparison = a.organization.localeCompare(b.organization);
          break;
        default:
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredPredictions(result);
  }, [predictions, searchTerm, timeframeFilter, sortBy, sortDirection]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

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
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header 
        onToggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
      />
      
      <main className="main-content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {medianYear && (
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
            )}
            
            {/* Temporarily disabled for simplified UI
            <FilterPanel 
              searchTerm={searchTerm}
              onSearchChange={e => setSearchTerm(e.target.value)}
              timeframeFilter={timeframeFilter}
              onTimeframeChange={e => setTimeframeFilter(e.target.value)}
              sortBy={sortBy}
              onSortChange={e => setSortBy(e.target.value)}
              sortDirection={sortDirection}
              onToggleSortDirection={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            />
            */}
            
            <PredictionTable 
              predictions={filteredPredictions} 
              isDarkMode={isDarkMode}
              onViewDefinition={handleDefinitionClick}
            />
            
            <div className="timeline-section">
              <h2>Historical AGI Timeline Predictions</h2>
              <p className="timeline-description">
                How expert predictions have changed over time (showing mean year for date ranges)
              </p>
              <TimelineChart data={timelineData} isDarkMode={isDarkMode} />
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