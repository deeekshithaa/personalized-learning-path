<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister" class="register-form">
      <h2>Create Your Account</h2>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Register</button>
      <button type="button" @click="handleRegister" style="background-color: #e74c3c; margin-top: 10px;">
        Test Button (Direct Call)
      </button>
      
      <!-- We can add a message area for errors or success later -->
    </form>
  </div>
</template>


<script>
import api from '@/services/api'; // Import our new service

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    // Make this method async
    async handleRegister() {
      try {
        // Create a user data object from our form state
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        // Call the registerUser function from our service and wait for the response
        const response = await api.registerUser(userData);

        // Log the successful response from the backend
        console.log('Registration successful!', response.data);
        alert('Success! You have been registered.');
        
        // Optional: Redirect to login page after successful registration
        this.$router.push('/login');

      } catch (error) {
        // If the backend returns an error (e.g., user already exists)
        console.error('Registration failed:', error.response.data);
        alert(`Registration failed: ${error.response.data.message}`);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important for padding and width */
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #42b983;
}
</style>