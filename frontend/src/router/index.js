import { createRouter, createWebHistory } from 'vue-router'
// Import our new view components
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    // The main page after login
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    // Let's make the root path redirect to the login page for now
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router