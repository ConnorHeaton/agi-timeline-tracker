// src/utils/dataHelpers.js

// Sample prediction data for development
export const samplePredictions = [
  {
    id: '1',
    expert: 'Sam Altman',
    organization: 'OpenAI',
    estimatedDate: '2025-2030',
    source: 'Interview with The New York Times',
    sourceUrl: 'https://example.com/interview1',
    predictionDate: '2023-03-15',
    definition: 'AGI refers to highly autonomous systems that outperform humans at most economically valuable work.',
    definitionSummary: 'Systems outperforming humans at economically valuable work'
  },
  {
    id: '2',
    expert: 'Dario Amodei',
    organization: 'Anthropic',
    estimatedDate: '2030-2040',
    source: 'Podcast interview on the Future of Life',
    sourceUrl: 'https://example.com/podcast1',
    predictionDate: '2022-09-20',
    definition: 'AGI is a system that can do anything a human can do intellectually, and probably surpass humans in most domains.',
    definitionSummary: 'System doing anything humans can intellectually & surpassing them'
  },
  {
    id: '3',
    expert: 'Demis Hassabis',
    organization: 'Google DeepMind',
    estimatedDate: '2030-2035',
    source: 'Interview at DeepMind Conference',
    sourceUrl: 'https://example.com/conference1',
    predictionDate: '2023-01-10',
    definition: 'AGI will be a system that can generalise across many different domains and apply its intelligence to solve unfamiliar problems.',
    definitionSummary: 'System generalizing across domains to solve unfamiliar problems'
  },
  {
    id: '4',
    expert: 'Ilya Sutskever',
    organization: 'OpenAI',
    estimatedDate: '2027-2033',
    source: 'AI Safety Summit Keynote',
    sourceUrl: 'https://example.com/keynote1',
    predictionDate: '2022-11-05',
    definition: 'AGI will have the ability to perform any intellectual task that a human can do, and likely exceed human performance in many domains.',
    definitionSummary: 'System performing any human intellectual task & exceeding humans'
  },
  {
    id: '5',
    expert: 'Jack Clark',
    organization: 'Anthropic',
    estimatedDate: '2035-2045',
    source: 'Annual State of AI Report',
    sourceUrl: 'https://example.com/report1',
    predictionDate: '2023-07-12',
    definition: 'AGI is a machine system that can perform the full range of cognitive tasks a human can perform, including reasoning, planning, and creative endeavors.',
    definitionSummary: 'Machine performing full range of human cognitive tasks'
  },
  {
    id: '6',
    expert: 'Geoffrey Hinton',
    organization: 'University of Toronto',
    estimatedDate: '2035-2045',
    source: 'Interview with The Guardian',
    sourceUrl: 'https://example.com/hinton1',
    predictionDate: '2023-05-01',
    definition: 'AGI would mean machines that can learn and reason like humans, but potentially much faster and with vastly more information.',
    definitionSummary: 'Machines learning & reasoning like humans but faster & with more data'
  }
];

// Sample historical prediction data
export const historicalPredictions = [
  // Sam Altman
  {
    expertName: "Sam Altman",
    estimatedDate: "2040-2060",
    source: "Y Combinator Blog Post",
    sourceUrl: "https://example.com/sam1",
    predictionDate: "2018-05-16",
    definition: "AI systems that outperform humans at almost all economically valuable work",
    definitionSummary: "AI systems that outperform humans at economically valuable work"
  },
  {
    expertName: "Sam Altman",
    estimatedDate: "2035-2045",
    source: "Interview at MIT AI Conference",
    sourceUrl: "https://example.com/sam2",
    predictionDate: "2019-10-15",
    definition: "Systems that can perform at human level across most cognitive tasks and continue to improve",
    definitionSummary: "Systems performing at human level across most cognitive tasks"
  },
  {
    expertName: "Sam Altman",
    estimatedDate: "2030-2040",
    source: "OpenAI Keynote Speech",
    sourceUrl: "https://example.com/sam3",
    predictionDate: "2021-06-10",
    definition: "AI systems that match or exceed human intelligence across virtually all domains",
    definitionSummary: "AI matching/exceeding human intelligence across all domains"
  },
  {
    expertName: "Sam Altman",
    estimatedDate: "2025-2030",
    source: "Interview with The New York Times",
    sourceUrl: "https://example.com/sam4",
    predictionDate: "2023-03-15",
    definition: "AGI refers to highly autonomous systems that outperform humans at most economically valuable work.",
    definitionSummary: "Systems outperforming humans at most economically valuable work"
  },
  
  // Demis Hassabis
  {
    expertName: "Demis Hassabis",
    estimatedDate: "2040-2050",
    source: "Lecture at Royal Society",
    sourceUrl: "https://example.com/demis1",
    predictionDate: "2016-09-22",
    definition: "AI capable of mastering multiple domains and transferring knowledge between them autonomously",
    definitionSummary: "AI mastering multiple domains with autonomous knowledge transfer"
  },
  {
    expertName: "Demis Hassabis",
    estimatedDate: "2035-2045",
    source: "Interview with The Guardian",
    sourceUrl: "https://example.com/demis2",
    predictionDate: "2018-11-05",
    definition: "Systems that can learn and reason about the world in the way that humans do",
    definitionSummary: "Systems that learn and reason like humans"
  },
  {
    expertName: "Demis Hassabis",
    estimatedDate: "2030-2040",
    source: "World Economic Forum Panel",
    sourceUrl: "https://example.com/demis3",
    predictionDate: "2020-01-22",
    definition: "AI systems with the generality of human cognition but potentially far greater capabilities",
    definitionSummary: "AI with human-like generality but greater capabilities"
  },
  {
    expertName: "Demis Hassabis",
    estimatedDate: "2030-2035",
    source: "Interview at DeepMind Conference",
    sourceUrl: "https://example.com/demis4",
    predictionDate: "2023-01-10",
    definition: "AGI will be a system that can generalise across many different domains and apply its intelligence to solve unfamiliar problems.",
    definitionSummary: "System generalizing across domains to solve unfamiliar problems"
  },
  
  // Dario Amodei
  {
    expertName: "Dario Amodei",
    estimatedDate: "2040-2060",
    source: "AI Safety Conference",
    sourceUrl: "https://example.com/dario1",
    predictionDate: "2018-06-30",
    definition: "AI systems that can do anything a human brain can do, with at least the same level of generality",
    definitionSummary: "AI doing anything a human brain can with same generality"
  },
  {
    expertName: "Dario Amodei",
    estimatedDate: "2035-2050",
    source: "Interview with MIT Technology Review",
    sourceUrl: "https://example.com/dario2",
    predictionDate: "2020-02-17",
    definition: "AI systems that match human capabilities in virtually all cognitive domains",
    definitionSummary: "AI matching human capabilities in all cognitive domains"
  },
  {
    expertName: "Dario Amodei",
    estimatedDate: "2030-2045",
    source: "Stanford AI Safety Workshop",
    sourceUrl: "https://example.com/dario3",
    predictionDate: "2021-09-06",
    definition: "AI with the ability to learn any intellectual task that a human can, with minimal or no domain-specific training",
    definitionSummary: "AI learning any human intellectual task with minimal training"
  },
  {
    expertName: "Dario Amodei",
    estimatedDate: "2030-2040",
    source: "Podcast interview on the Future of Life",
    sourceUrl: "https://example.com/dario4",
    predictionDate: "2022-09-20",
    definition: "AGI is a system that can do anything a human can do intellectually, and probably surpass humans in most domains.",
    definitionSummary: "System doing anything humans can intellectually & surpassing them"
  }
];

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
  // We'll map from our sample predictions to historical predictions format
  const formattedPredictions = predictions.map(p => ({
    expertName: p.expert,
    estimatedDate: p.estimatedDate,
    source: p.source,
    sourceUrl: p.sourceUrl,
    predictionDate: p.predictionDate,
    definition: p.definition,
    definitionSummary: p.definitionSummary
  }));
  
  // Combine with historical data to create a comprehensive dataset
  const allPredictions = [...historicalPredictions, ...formattedPredictions];
  
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
    return new Date(a.predictionDate) - new Date(b.predictionDate);
  });

  // Create a map of experts and their predictions
  const expertMap = new Map();
  
  sortedPredictions.forEach(prediction => {
    const predDate = new Date(prediction.predictionDate);
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