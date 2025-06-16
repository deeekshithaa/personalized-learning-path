<template>
  <div class="login-container">
    <!-- FIX: The form tag no longer has the @submit listener -->
    <form class="login-form">
      <h2>Login to Your Account</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <!-- FIX: The button is now type="button" and has the @click listener -->
      <button type="button" @click="handleLogin">Login</button>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    // The bulletproof version for Login
    handleLogin() {
      const credentials = { email: this.email, password: this.password };
      
      api.loginUser(credentials)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          alert('Login successful!');
          this.$router.push('/onboarding');
        })
        .catch(error => {
          let errorMessage = 'An unexpected error occurred.';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.request) {
            errorMessage = 'Could not connect to the server.';
          } else {
            errorMessage = error.message;
          }
          console.error('Login failed:', error);
          alert(`Login failed: ${errorMessage}`);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
}

.login-form h2 {
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
  box-sizing: border-box;
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