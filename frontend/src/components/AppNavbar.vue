<template>
  <nav>
    <router-link to="/">My Learning App</router-link>
    <div>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar' // Correct multi-word name
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-left: 1rem;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>