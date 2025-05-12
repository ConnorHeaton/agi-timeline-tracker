import React from 'react';
import { calculateMeanYear } from '../utils/dataHelpers';

const PredictionTable = ({ predictions, isDarkMode, onViewDefinition }) => {
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
                  <span className="definition-summary">
                    {prediction.definitionSummary}
                  </span>
                  <button 
                    className="view-more-button"
                    onClick={() => onViewDefinition(prediction.definition)}
                  >
                    [More]
                  </button>
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