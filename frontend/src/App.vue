<template>
  <AppNavbar />
  <main>
    <router-view />
  </main>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
main {
  padding: 2rem;
}
</style>