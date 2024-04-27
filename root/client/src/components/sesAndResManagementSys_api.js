import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Update the base URL to match your backend server

const fetchTotalSessions = async () => {
  // Function to fetch total sessions
  try {
    const response = await axios.get(`${baseURL}/sessions/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total sessions:', error);
    throw error;
  }
};

const fetchTotalReservations = async () => {
  // Function to fetch total reservations
  try {
    const response = await axios.get(`${baseURL}/reservations/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching total reservations:', error);
    throw error;
  }
};

const fetchTotalRevenue = async () => {
  // Function to fetch total revenue
  try {
    const response = await axios.get(`${baseURL}/reservations/total-revenue`);
    return response.data.totalRevenue;
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    throw error;
  }
};

const fetchTotalParticipants = async () => {
  try {
    const response = await axios.get(`${baseURL}/reservations/total-students`);
    console.log('Total Students Response:', response.data); // Log the response data
    return response.data.totalParticipants; // Return the count value from the response object
  } catch (error) {
    console.error('Error fetching total participants:', error);
    throw error;
  }
};






export { fetchTotalSessions, fetchTotalReservations, fetchTotalRevenue,fetchTotalParticipants };
