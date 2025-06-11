<template>
  <nav class="navbar">
    <router-link to="/" class="brand">LearnPath AI</router-link>
    <div class="nav-links">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* Style for the active link */
.nav-links a.router-link-exact-active {
  color: #42b983; /* Vue green */
}
</style>