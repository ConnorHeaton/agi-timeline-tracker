// src/utils/dataHelpers.js

// No sample data - using only real data from the API

// Helper function to parse dates in format 'Month Year' (e.g., 'September 2022')
const parseMonthYearDate = (dateString) => {
  if (!dateString) return new Date();
  
  // Check if it's already a full date format (e.g., '2022-09-15')
  if (dateString.includes('-') || dateString.includes('/')) {
    return new Date(dateString);
  }
  
  // Handle 'Month Year' format
  const parts = dateString.split(' ');
  if (parts.length === 2) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.findIndex(m => m === parts[0]);
    const year = parseInt(parts[1]);
    
    if (monthIndex !== -1 && !isNaN(year)) {
      return new Date(year, monthIndex, 1); // Use the 1st day of the month
    }
  }
  
  // Fallback to standard parsing
  return new Date(dateString);
};

// Calculate mean year from date range (e.g., "2030-2040" => " (2035)")
export const calculateMeanYear = (dateRange) => {
  const years = dateRange.match(/\d{4}/g);
  if (!years || years.length === 0) return '';
  
  if (years.length === 1) return '';
  
  const startYear = parseInt(years[0]);
  const endYear = parseInt(years[years.length - 1]);
  const meanYear = Math.round((startYear + endYear) / 2);
  
  return ` (${meanYear})`;
};

// Format data for timeline visualization
export const prepareTimelineData = (predictions) => {
  // Map from our API predictions to the format needed for the chart
  // NOTE: We're now using ONLY the data from the API instead of combining with hardcoded historical data
  const formattedPredictions = predictions.map(p => ({
    expertName: p.expert,
    estimatedDate: p.estimatedDate,
    source: p.source,
    sourceUrl: p.sourceUrl,
    predictionDate: p.predictionDate,
    definition: p.definition,
    definitionSummary: p.definitionSummary
  }));
  
  // Use only the data from the API
  const allPredictions = formattedPredictions;
  
  // Remove duplicates (if any)
  const uniquePredictions = [];
  const seen = new Set();
  
  allPredictions.forEach(prediction => {
    const key = `${prediction.expertName}-${prediction.predictionDate}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniquePredictions.push(prediction);
    }
  });
  
  // Sort predictions by expert and date
  const sortedPredictions = uniquePredictions.sort((a, b) => {
    // First sort by expert name
    if (a.expertName !== b.expertName) {
      return a.expertName.localeCompare(b.expertName);
    }
    // Then sort by prediction date
    return parseMonthYearDate(a.predictionDate) - parseMonthYearDate(b.predictionDate);
  });

  // Create a map of experts and their predictions
  const expertMap = new Map();
  
  sortedPredictions.forEach(prediction => {
    const predDate = parseMonthYearDate(prediction.predictionDate);
    const predYear = predDate.getFullYear();
    
    // Extract years from estimated date
    const years = prediction.estimatedDate.match(/\d{4}/g);
    let estimatedMean;
    
    if (years && years.length > 0) {
      if (years.length === 1) {
        estimatedMean = parseInt(years[0]);
      } else {
        estimatedMean = Math.round((parseInt(years[0]) + parseInt(years[years.length - 1])) / 2);
      }
    } else {
      return; // Skip if no years found
    }
    
    if (!expertMap.has(prediction.expertName)) {
      expertMap.set(prediction.expertName, []);
    }
    
    expertMap.get(prediction.expertName).push({
      year: predYear,
      estimatedYear: estimatedMean,
      predictionDate: prediction.predictionDate,
      source: prediction.source,
      definition: prediction.definition
    });
  });
  
  // Format data for the chart (all points on the same timeline)
  const chartData = [];
  
  // Find min and max years to create the full range
  const allYears = sortedPredictions.map(p => new Date(p.predictionDate).getFullYear());
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  
  // Create data points for each year
  for (let year = minYear; year <= maxYear; year++) {
    const dataPoint = { year };
    
    // Add data for each expert at this year if available
    expertMap.forEach((predictions, expertName) => {
      // Find the most recent prediction for this expert that's before or equal to the current year
      const relevantPredictions = predictions.filter(p => p.year <= year);
      if (relevantPredictions.length > 0) {
        // Get the most recent prediction
        const latestPrediction = relevantPredictions.reduce((latest, current) => 
          new Date(latest.predictionDate) > new Date(current.predictionDate) ? latest : current
        );
        
        dataPoint[expertName] = latestPrediction.estimatedYear;
        dataPoint[`${expertName}_source`] = latestPrediction.source;
        dataPoint[`${expertName}_definition`] = latestPrediction.definition;
      }
    });
    
    chartData.push(dataPoint);
  }
  
  return { chartData, experts: Array.from(expertMap.keys()) };
};

export const getLatestPredictionsByExpert = (predictions) => {
  // Group predictions by expert
  const expertGroups = predictions.reduce((groups, prediction) => {
    const expert = prediction.expert;
    if (!groups[expert]) {
      groups[expert] = [];
    }
    groups[expert].push(prediction);
    return groups;
  }, {});

  // For each expert, get their most recent prediction
  return Object.values(expertGroups).map(expertPredictions => {
    return expertPredictions.reduce((latest, current) => {
      const latestDate = new Date(latest.predictionDate);
      const currentDate = new Date(current.predictionDate);
      return currentDate > latestDate ? current : latest;
    });
  });
};