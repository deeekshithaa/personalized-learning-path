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
    </form>
  </div>
</template>

<script>
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
    async handleRegister() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        const response = await api.registerUser(userData);

        console.log('Registration successful!', response.data);
        alert('Success! You have been registered.');
        this.$router.push('/login');

      } catch (error) {
        // This is the robust error handling block
        let errorMessage = 'An unexpected error occurred.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage = 'Could not connect to the server. Please try again later.';
        } else {
          errorMessage = error.message;
        }
        
        console.error('Registration failed:', error);
        alert(`Registration failed: ${errorMessage}`);
      }
    }
  }
};
</script>

<style scoped>
/* All your beautiful styles are perfect, I'm just pasting them back in */
.register-container { display: flex; justify-content: center; align-items: center; padding: 2rem; }
.register-form { width: 100%; max-width: 400px; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f9f9f9; }
.register-form h2 { text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
button { width: 100%; padding: 0.75rem; background-color: #2c3e50; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: background-color 0.2s; }
button:hover { background-color: #42b983; }
</style>