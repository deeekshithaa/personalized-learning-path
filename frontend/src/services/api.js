import axios from 'axios';

// Create a new instance of axios with a custom configuration

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Now, we define the specific functions that our components can call
export default {
  loginUser(credentials) {
  return api.post('/users/login', credentials);
  },
  // A function to register a user. It takes the user's data as an argument.
  registerUser(userData) {
    // It makes a POST request to the '/users/register' endpoint
    // The full URL will be http://localhost:8080/api/users/register
    return api.post('/users/register', userData);
  } 

  
};


