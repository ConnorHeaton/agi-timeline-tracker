import React from 'react';

const FilterPanel = ({
  searchTerm,
  onSearchChange,
  timeframeFilter,
  onTimeframeChange,
  sortBy,
  onSortChange,
  sortDirection,
  onToggleSortDirection
}) => {
  return (
    <div className="filter-panel">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by expert, organization, source, or definition..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-options">
        <div className="filter-group">
          <label htmlFor="timeframe-filter">Timeframe:</label>
          <select
            id="timeframe-filter"
            value={timeframeFilter}
            onChange={onTimeframeChange}
          >
            <option value="all">All Predictions</option>
            <option value="near">Near-term (≤ 10 years)</option>
            <option value="mid">Mid-term (11-30 years)</option>
            <option value="far">Long-term (> 30 years)</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={onSortChange}
          >
            <option value="expert">Expert Name</option>
            <option value="date">Estimated Date</option>
            <option value="organization">Organization</option>
            <option value="predictionDate">Prediction Date</option>
          </select>
          
          <button 
            className="sort-direction-button" 
            onClick={onToggleSortDirection}
            aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;