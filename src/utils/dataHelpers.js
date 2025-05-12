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
      // Handle ISO format dates (YYYY-MM-DD)
      const parts = dateString.split(/[-\/]/);
      if (parts.length >= 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
        const day = parseInt(parts[2], 10);
        
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month, day);
        }
      }
      
      // If we couldn't parse it ourselves, try the built-in parser
      const result = new Date(dateString);
      if (!isNaN(result.getTime())) {
        return result;
      }
      
      console.warn(`Invalid date parsed from: ${dateString}`);
      return new Date(); // Return current date as fallback
    }
    
    // Handle 'Month Year' format
    const parts = dateString.trim().split(' ');
    if (parts.length === 2) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // Also handle abbreviated month names
      const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let monthIndex = monthNames.findIndex(m => m.toLowerCase() === parts[0].toLowerCase());
      
      // If not found, try abbreviated month names
      if (monthIndex === -1) {
        monthIndex = monthAbbreviations.findIndex(m => m.toLowerCase() === parts[0].toLowerCase());
      }
      
      const year = parseInt(parts[1], 10);
      
      if (monthIndex !== -1 && !isNaN(year)) {
        return new Date(year, monthIndex, 1); // Use the 1st day of the month
      } else {
        console.warn(`Could not parse month/year from: ${dateString}, Month: ${parts[0]}, Year: ${parts[1]}`);
      }
    }
    
    // Try to parse just the year if it's a 4-digit number
    if (/^\d{4}$/.test(dateString.trim())) {
      const year = parseInt(dateString.trim(), 10);
      return new Date(year, 0, 1); // January 1st of the year
    }
    
    // Fallback to standard parsing
    const fallbackDate = new Date(dateString);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate;
    }
    
    console.warn(`Fallback date parsing failed for: ${dateString}`);
    return new Date(); // Return current date as last resort
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
  
  // Format data for the chart - only include actual prediction points
  const chartData = [];
  
  // Process each expert's predictions individually
  expertMap.forEach((predictions, expertName) => {
    // Sort predictions by date
    const sortedExpertPredictions = [...predictions].sort((a, b) => {
      const dateA = parseMonthYearDate(a.predictionDate);
      const dateB = parseMonthYearDate(b.predictionDate);
      return dateA - dateB;
    });
    
    // Add a data point for each actual prediction
    sortedExpertPredictions.forEach(prediction => {
      // Parse the prediction date
      const predDate = parseMonthYearDate(prediction.predictionDate);
      
      // Check if date is valid before proceeding
      if (isNaN(predDate.getTime())) {
        console.warn(`Skipping invalid prediction date: ${prediction.predictionDate}`);
        return; // Skip this prediction
      }
      
      const predYear = predDate.getFullYear();
      const predMonth = predDate.getMonth();
      
      // Create a decimal representation of the year with month (e.g., 2023.25 for March 2023)
      const yearWithMonth = predYear + (predMonth / 12);
      
      // Format the date as "Month Year" for display
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const formattedDate = `${monthNames[predMonth]} ${predYear}`;
      
      // Create the data point
      const dataPoint = {
        year: predYear,
        yearWithMonth,
        formattedDate,
        [expertName]: prediction.estimatedYear,
        [`${expertName}_source`]: prediction.source,
        [`${expertName}_definition`]: prediction.definition
      };
      
      chartData.push(dataPoint);
    });
  });
  
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