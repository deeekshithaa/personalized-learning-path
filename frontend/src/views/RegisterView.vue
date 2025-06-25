<template>
  <div class="register-container">
    <!-- Using a direct @click handler on the button -->
    <form class="register-form">
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

      <button type="button" @click="handleRegister">Register</button>
    </form>
  </div>
</template>

<script>
// Importing our service
import api from '@/services/api';

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
    // Using the Promise-based .then().catch() syntax for maximum compatibility
    handleRegister() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      api.registerUser(userData)
        .then(response => {
          console.log('Registration successful!', response.data);
          alert('Success! You have been registered.');
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Registration failed:', error);
          let errorMessage = 'An unexpected error occurred.';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else {
            errorMessage = 'Could not connect to the server. Please check your setup.';
          }
          alert(`Registration failed: ${errorMessage}`);
        });
    }
  }
};
</script>

<style scoped>
/* Your beautiful styles */
.register-container { display: flex; justify-content: center; align-items: center; padding: 2rem; }
.register-form { width: 100%; max-width: 400px; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f9f9f9; }
.register-form h2 { text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
button { width: 100%; padding: 0.75rem; background-color: #2c3e50; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: background-color 0.2s; }
button:hover { background-color: #42b983; }
</style>