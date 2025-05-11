import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimelineChart = ({ data, isDarkMode }) => {
  const { chartData, experts } = data;
  
  // Generate a color for each expert
  const getExpertColor = (expertName, index) => {
    const colors = [
      '#ff6b1a', // Primary orange
      '#3498db', // Blue
      '#2ecc71', // Green
      '#9b59b6', // Purple
      '#e74c3c', // Red
      '#f39c12'  // Yellow
    ];
    
    // Use consistent colors for known experts
    const expertColors = {
      'Sam Altman': colors[0],
      'Dario Amodei': colors[1],
      'Demis Hassabis': colors[2],
      'Ilya Sutskever': colors[3],
      'Jack Clark': colors[4],
      'Geoffrey Hinton': colors[5],
      'Metaculus': '#000080' // Navy blue
    };
    
    return expertColors[expertName] || colors[index % colors.length];
  };
  
  // Custom tooltip for detailed information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const visiblePayload = payload.filter(p => !p.name.includes('_'));
      
      return (
        <div className={`timeline-tooltip ${isDarkMode ? 'dark' : 'light'}`}>
          <p className="tooltip-year">{`Year: ${label}`}</p>
          {visiblePayload.map((entry, index) => {
            const source = payload.find(p => p.name === `${entry.name}_source`);
            
            return (
              <div key={`item-${index}`} className="tooltip-item">
                <p style={{ color: entry.color }}>
                  <span className="expert-name">{entry.name}:</span> {entry.value} (predicted AGI year)
                </p>
                {source && (
                  <p className="tooltip-source">
                    Source: {source.value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="timeline-chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#555' : '#ccc'} />
          <XAxis 
            dataKey="year" 
            stroke={isDarkMode ? '#eee' : '#333'}
            label={{ 
              value: 'Year Prediction Was Made', 
              position: 'insideBottom', 
              offset: -5,
              fill: isDarkMode ? '#eee' : '#333'
            }}
          />
          <YAxis
            stroke={isDarkMode ? '#eee' : '#333'}
            label={{ 
              value: 'Predicted AGI Year', 
              angle: -90, 
              position: 'insideLeft',
              fill: isDarkMode ? '#eee' : '#333'
            }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {experts.map((expert, index) => (
            <Line
              key={expert}
              type="monotone"
              dataKey={expert}
              stroke={getExpertColor(expert, index)}
              activeDot={{ r: 8 }}
              strokeWidth={2}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;