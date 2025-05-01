const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchPredictions = async () => {
  try {
    const response = await fetch(`${API_URL}/predictions`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};

export const fetchTimelineData = async () => {
  try {
    const response = await fetch(`${API_URL}/timeline`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    throw error;
  }
}; 