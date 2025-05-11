// src/utils/dataHelpers.js

// No sample data - using only real data from the API

// Helper function to parse dates in format 'Month Year' (e.g., 'September 2022')
const parseMonthYearDate = (dateString) => {
  if (!dateString) {
    console.warn('Empty date string provided to parseMonthYearDate');
    return new Date();
  }
  
  try {
    // Check if it's already a full date format (e.g., '2022-09-15')
    if (dateString.includes('-') || dateString.includes('/')) {
      const result = new Date(dateString);
      // Check if the date is valid
      if (isNaN(result.getTime())) {
        console.warn(`Invalid date parsed from: ${dateString}`);
      }
      return result;
    }
    
    // Handle 'Month Year' format
    const parts = dateString.split(' ');
    if (parts.length === 2) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = monthNames.findIndex(m => m === parts[0]);
      const year = parseInt(parts[1]);
      
      console.log(`Parsing date: ${dateString}, Month: ${parts[0]} (index: ${monthIndex}), Year: ${year}`);
      
      if (monthIndex !== -1 && !isNaN(year)) {
        return new Date(year, monthIndex, 1); // Use the 1st day of the month
      } else {
        console.warn(`Could not parse month/year from: ${dateString}`);
      }
    }
    
    // Fallback to standard parsing
    const fallbackDate = new Date(dateString);
    if (isNaN(fallbackDate.getTime())) {
      console.warn(`Fallback date parsing failed for: ${dateString}`);
      return new Date(); // Return current date as last resort
    }
    return fallbackDate;
  } catch (error) {
    console.error(`Error parsing date ${dateString}:`, error);
    return new Date(); // Return current date in case of error
  }
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
  console.log('Original predictions count:', predictions.length);
  console.log('Sample prediction:', predictions[0]);
  
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
  
  console.log('Formatted predictions count:', formattedPredictions.length);
  
  // Use only the data from the API
  const allPredictions = formattedPredictions;
  
  // Remove duplicates (if any)
  const uniquePredictions = [];
  const seen = new Set();
  
  allPredictions.forEach(prediction => {
    const key = `${prediction.expertName}-${prediction.predictionDate}`;
    console.log('Processing prediction:', prediction.expertName, prediction.predictionDate, prediction.estimatedDate);
    if (!seen.has(key)) {
      seen.add(key);
      uniquePredictions.push(prediction);
    } else {
      console.log('Skipping duplicate:', key);
    }
  });
  
  console.log('Unique predictions count:', uniquePredictions.length);
  
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
    let estimatedMean;
    
    // Handle case where estimatedDate might be missing or null
    if (!prediction.estimatedDate) {
      console.warn(`Missing estimated date for ${prediction.expertName}. Using current year + 10 as fallback.`);
      estimatedMean = new Date().getFullYear() + 10; // Default to 10 years from now as fallback
    } else {
      // Try to extract 4-digit years from the string
      const years = prediction.estimatedDate.match(/\d{4}/g);
      console.log(`Extracting years from ${prediction.expertName}'s estimate "${prediction.estimatedDate}": `, years);
      
      if (years && years.length > 0) {
        // Normal case: we found year(s) in the string
        if (years.length === 1) {
          estimatedMean = parseInt(years[0]);
          console.log(`Single year found: ${estimatedMean}`);
        } else {
          estimatedMean = Math.round((parseInt(years[0]) + parseInt(years[years.length - 1])) / 2);
          console.log(`Multiple years found, using mean: ${estimatedMean} (from ${years[0]} and ${years[years.length - 1]})`);
        }
      } else {
        // Try to extract 2-digit years (e.g., '30s might mean 2030s)
        const shortYears = prediction.estimatedDate.match(/\b(\d{1,2})(?:s|'s)?\b/g);
        if (shortYears && shortYears.length > 0) {
          // Assume it's referring to a decade in the 21st century
          const decade = parseInt(shortYears[0].replace(/[^0-9]/g, ''));
          estimatedMean = 2000 + decade;
          console.log(`Found decade reference: ${shortYears[0]}, interpreting as ${estimatedMean}`);
        } else if (prediction.estimatedDate.toLowerCase().includes('never') || 
                  prediction.estimatedDate.toLowerCase().includes('impossible')) {
          // Handle "never" or "impossible" estimates
          estimatedMean = 2100; // Set to far future
          console.log(`Found 'never' type estimate, setting to year 2100`);
        } else {
          // Last resort: use current year + 20 as default
          estimatedMean = new Date().getFullYear() + 20;
          console.warn(`No years found in estimated date: "${prediction.estimatedDate}" for ${prediction.expertName}. Using fallback year ${estimatedMean}.`);
        }
      }
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
  const allYears = sortedPredictions.map(p => parseMonthYearDate(p.predictionDate).getFullYear());
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  
  // Create data points for each year
  for (let year = minYear; year <= maxYear; year++) {
    // Create a data point for each month in the year
    for (let month = 0; month < 12; month++) {
      // Create a decimal representation of the year with month (e.g., 2023.0, 2023.08, 2023.17, etc.)
      // This allows more precise positioning on the x-axis while keeping year-only labels
      const yearWithMonth = year + (month / 12);
      const dataPoint = { 
        year, // Keep the integer year for x-axis labels
        yearWithMonth // Use this for more precise positioning
      };
      
      // Create a date object for the current year/month for comparison
      const currentYearMonth = new Date(year, month, 1);
      
      // Add data for each expert at this year/month if available
      expertMap.forEach((predictions, expertName) => {
        // Find predictions from this expert that were made before or during this month/year
        const relevantPredictions = predictions.filter(p => {
          const predDate = parseMonthYearDate(p.predictionDate);
          return predDate <= currentYearMonth;
        });
        
        if (relevantPredictions.length > 0) {
          // Get the most recent prediction
          const latestPrediction = relevantPredictions.reduce((latest, current) => {
            const latestDate = parseMonthYearDate(latest.predictionDate);
            const currentDate = parseMonthYearDate(current.predictionDate);
            return currentDate > latestDate ? current : latest;
          });
          
          dataPoint[expertName] = latestPrediction.estimatedYear;
          dataPoint[`${expertName}_source`] = latestPrediction.source;
          dataPoint[`${expertName}_definition`] = latestPrediction.definition;
        }
      });
      
      // Only add the data point if it has any expert predictions
      const hasData = Object.keys(dataPoint).some(key => 
        !['year', 'yearWithMonth'].includes(key)
      );
      
      if (hasData) {
        chartData.push(dataPoint);
      }
    }
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