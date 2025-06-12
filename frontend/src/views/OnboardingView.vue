<template>
  <div class="onboarding-container">
    <form @submit.prevent="submitProfile" class="onboarding-form">
      <h2>Tell Us About Yourself</h2>
      <p>This will help us create the perfect learning path for you.</p>

      <div class="form-group">
        <label for="goal">What is your primary goal?</label>
        <select id="goal" v-model="profile.goal" required>
          <option disabled value="">Please select one</option>
          <option>Web Development</option>
          <option>Data Science</option>
          <option>Mobile Development</option>
        </select>
      </div>

      <div class="form-group">
        <label for="skillLevel">What is your current skill level?</label>
        <select id="skillLevel" v-model="profile.skillLevel" required>
          <option disabled value="">Please select one</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div class="form-group">
        <label for="learningStyle">What is your preferred learning style?</label>
        <select id="learningStyle" v-model="profile.learningStyle" required>
          <option disabled value="">Please select one</option>
          <option>Video Tutorials</option>
          <option>Reading Articles</option>
          <option>Hands-on Projects</option>
        </select>
      </div>

      <button type="submit">Generate My Path!</button>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'OnboardingView',
  data() {
    return {
      profile: {
        goal: '',
        skillLevel: '',
        learningStyle: ''
      }
    };
  },
    methods: {
    async submitProfile() {
      try {
        // First, we need the user's token to prove they are logged in
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in again.');
          this.$router.push('/login');
          return; // Stop the function here
        }

        // Now, we call our API service to update the profile
        // We pass the profile data and the token
        await api.updateUserProfile(this.profile, token);

        alert('Profile updated successfully! Welcome!');
        this.$router.push('/dashboard'); // Go to the real dashboard

      } catch (error) {
        console.error('Profile update failed:', error);
        // Let's use our robust error handling
        let errorMessage = 'An error occurred while updating your profile.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        alert(`Update failed: ${errorMessage}`);
      }
    }
  }
};
</script>

<style scoped>
/* Let's borrow the login form styles, they look great! */
.onboarding-container { display: flex; justify-content: center; align-items: center; padding: 2rem; }
.onboarding-form { width: 100%; max-width: 450px; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f9f9f9; }
.onboarding-form h2 { text-align: center; margin-bottom: 0.5rem; }
.onboarding-form p { text-align: center; margin-bottom: 2rem; color: #666; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; }
.form-group select { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; background-color: white; }
button { width: 100%; padding: 0.75rem; background-color: #42b983; color: white; border: none; border-radius: 4px; font-size: 1.2rem; cursor: pointer; transition: background-color 0.2s; }
button:hover { background-color: #36a473; }
</style>