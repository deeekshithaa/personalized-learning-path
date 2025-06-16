<template>
  <div class="register-container">
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

      <!-- This button now correctly calls the real function -->
      <button type="button" @click="handleRegister">Register</button>
      
    </form>
  </div>
</template>

<script>
// We are importing axios DIRECTLY, not our api service.
import axios from 'axios';

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
    handleRegister() {
      // We are not using async/await. We are not using our api service.
      console.log('--- DIRECT AXIOS TEST: Button Clicked ---');
      
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      // This is the most direct test possible.
      // It uses the proxy URL we set up in vue.config.js
      axios.post('/api/users/register', userData)
        .then(response => {
          // If this runs, the connection works.
          alert('HOLY CRAP, IT WORKED! Check the console!');
          console.log('SUCCESS:', response.data);
        })
        .catch(error => {
          // If this runs, we get a REAL error message.
          alert('IT FAILED, BUT WE GOT A REAL ERROR! Check the console!');
          console.error('FAILURE:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Styles are perfect and stay the same */
.register-container { display: flex; justify-content: center; align-items: center; padding: 2rem; }
.register-form { width: 100%; max-width: 400px; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f9f9f9; }
.register-form h2 { text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
button { width: 100%; padding: 0.75rem; background-color: #2c3e50; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: background-color 0.2s; }
button:hover { background-color: #42b983; }
</style>