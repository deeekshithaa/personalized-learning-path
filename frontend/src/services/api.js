import axios from 'axios';


// Create a new instance of axios with a custom configuration
const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json'
  },
  
  proxy: false 
});

// Now, we define the specific functions that our components can call
export default {
  // A function to register a user.
  registerUser(userData) {
    return api.post('/users/register', userData);
  },

  // A function to login a user.
  loginUser(credentials) {
    return api.post('/users/login', credentials);
  }
};

