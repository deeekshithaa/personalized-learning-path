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
  registerUser(userData) {
    return api.post('/users/register', userData);
  }, // <-- Comma is essential

  loginUser(credentials) {
    return api.post('/users/login', credentials);
  }, // <-- Comma is essential

  updateUserProfile(profileData, token) {
    return api.put('/users/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } // <-- No comma needed on the last one
};