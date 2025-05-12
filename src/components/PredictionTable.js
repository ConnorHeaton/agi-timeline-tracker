import React, { useState, useEffect, useRef } from 'react';
import { calculateMeanYear } from '../utils/dataHelpers';

const PredictionTable = ({ predictions, isDarkMode }) => {
  // State to track which tooltip is active (if any)
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const tooltipRef = useRef(null);
  const buttonRefs = useRef({});

  // Find the active prediction
  const activePrediction = predictions.find(p => p.id === activeTooltipId);
  
  // Position the tooltip after it's rendered
  const positionTooltip = () => {
    const tooltip = tooltipRef.current;
    const activeButton = activeTooltipId ? buttonRefs.current[activeTooltipId] : null;
    
    if (tooltip && activeButton) {
      const buttonRect = activeButton.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Position above the button
      let top = buttonRect.top - tooltipRect.height - 10;
      let left = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);
      
      // Ensure tooltip stays within viewport
      if (top < 10) top = buttonRect.bottom + 10; // Position below if not enough space above
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      
      // Apply position
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.visibility = 'visible';
    }
  };

  // Position tooltip whenever it changes
  useEffect(() => {
    if (activeTooltipId) {
      // Use requestAnimationFrame to ensure the tooltip is rendered before positioning
      requestAnimationFrame(positionTooltip);
      
      // Also reposition on resize
      window.addEventListener('resize', positionTooltip);
      return () => window.removeEventListener('resize', positionTooltip);
    }
  }, [activeTooltipId]);

  // Handle clicks outside of the active tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close tooltip if clicking outside both the tooltip and its trigger button
      if (activeTooltipId && 
          tooltipRef.current && 
          !tooltipRef.current.contains(event.target) &&
          buttonRefs.current[activeTooltipId] && 
          !buttonRefs.current[activeTooltipId].contains(event.target)) {
        setActiveTooltipId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeTooltipId]);

  // Toggle tooltip visibility
  const toggleTooltip = (id) => {
    setActiveTooltipId(prevId => prevId === id ? null : id);
  };

  // For desktop: show on hover, hide on mouse leave
  const handleMouseEnter = (id) => {
    // Only apply hover behavior on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      setActiveTooltipId(id);
    }
  };

  const handleMouseLeave = () => {
    // Only apply hover behavior on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      setActiveTooltipId(null);
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
                      aria-expanded={activeTooltipId === prediction.id}
                      ref={el => buttonRefs.current[prediction.id] = el}
                    >
                      [More]
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Single tooltip that moves to the active button */}
      {activeTooltipId && activePrediction && (
        <div 
          className="definition-tooltip"
          ref={tooltipRef}
          style={{
            position: 'fixed',
            visibility: 'hidden' // Initially hidden until positioned
          }}
        >
          <div className="tooltip-content">
            <h4>{activePrediction.expert}'s AGI Definition</h4>
            <p>{activePrediction.definition}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionTable;