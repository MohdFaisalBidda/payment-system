import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your server's URL

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logIn = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const reportFraud = async (upiNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/report-fraud`, { upiNumber });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payment`, paymentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    throw error.response.data;
  }
};
