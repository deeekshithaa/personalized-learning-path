// frontend/src/services/api.js

import axios from 'axios';

// This is our proxy config from vue.config.js
const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Handles user registration
  registerUser(userData) {
    return api.post('/users/register', userData);
  },

  // Handles user login
  loginUser(credentials) {
    return api.post('/users/login', credentials);
  },

  // Updates the user's profile after the quiz
  updateUserProfile(profileData, token) {
    return api.put('/users/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Gets the personalized learning path
  getLearningPath(token) {
    return api.get('/users/learning-path', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};