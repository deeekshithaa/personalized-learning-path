<template>
  <div class="dashboard">
    <h1>Your Personalized Learning Path</h1>
    
    <div v-if="isLoading" class="loading">
      <p>Generating your path, one moment...</p>
    </div>

    <div v-else-if="learningPath.length > 0" class="path-container">
      <div v-for="item in learningPath" :key="item.videoId" class="path-item">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          <img :src="item.thumbnail" :alt="item.title" class="thumbnail">
          <h3 class="title">{{ item.title }}</h3>
        </a>
      </div>
    </div>

    <div v-else class="no-path">
      <p>We couldn't generate a path for you at this time. Please ensure your profile is complete.</p>
    </div>

  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'DashboardView',
  data() {
    return {
      learningPath: [],
      isLoading: true
    };
  },
  async created() {
    // This 'created' lifecycle hook runs automatically when the component is loaded
    await this.fetchLearningPath();
  },
  methods: {
    async fetchLearningPath() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }
        
        // This is where we call the backend orchestrator!
        const response = await api.getLearningPath(token);
        this.learningPath = response.data;
        
      } catch (error) {
        console.error('Failed to fetch learning path:', error);
        alert('Could not fetch your learning path.');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}
.loading, .no-path {
  text-align: center;
  margin-top: 3rem;
  color: #666;
}
.path-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.path-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.path-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.path-item a {
  text-decoration: none;
  color: inherit;
}
.thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.title {
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}
</style>