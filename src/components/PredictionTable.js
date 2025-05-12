import React, { useState, useEffect, useRef } from 'react';
import { calculateMeanYear } from '../utils/dataHelpers';

const PredictionTable = ({ predictions, isDarkMode }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipRefs = useRef({});

  // Handle clicks outside of tooltips to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeTooltip && tooltipRefs.current[activeTooltip] && 
          !tooltipRefs.current[activeTooltip].contains(event.target)) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeTooltip]);

  // Toggle tooltip visibility
  const toggleTooltip = (id) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  // For desktop: show on hover, hide on mouse leave
  const handleMouseEnter = (id) => {
    // Only apply hover behavior on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      setActiveTooltip(id);
    }
  };

  const handleMouseLeave = () => {
    // Only apply hover behavior on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      setActiveTooltip(null);
    }
  };
  return (
    <div className="table-container">
      {predictions.length === 0 ? (
        <div className="no-results">No predictions match your filters</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Expert</th>
              <th>Organization</th>
              <th>Estimated AGI Date</th>
              <th>Source</th>
              <th>Prediction Date</th>
              <th>AGI Definition</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <tr key={prediction.id}>
                <td>{prediction.expert}</td>
                <td>{prediction.organization}</td>
                <td>
                  {prediction.estimatedDate}
                  {calculateMeanYear(prediction.estimatedDate)}
                </td>
                <td>
                  <a 
                    href={prediction.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="source-link"
                  >
                    {prediction.source}
                  </a>
                </td>
                <td>{prediction.predictionDate}</td>
                <td className="definition-cell">
                  <div className="tooltip-container">
                    <span className="definition-summary">
                      {prediction.definitionSummary}
                    </span>
                    <button 
                      className="view-more-button"
                      onClick={() => toggleTooltip(prediction.id)}
                      onMouseEnter={() => handleMouseEnter(prediction.id)}
                      onMouseLeave={handleMouseLeave}
                      aria-expanded={activeTooltip === prediction.id}
                    >
                      [More]
                    </button>
                    {activeTooltip === prediction.id && (
                      <div 
                        className="definition-tooltip"
                        ref={el => tooltipRefs.current[prediction.id] = el}
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="tooltip-content">
                          <h4>{prediction.expert}'s AGI Definition</h4>
                          <p>{prediction.definition}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PredictionTable;