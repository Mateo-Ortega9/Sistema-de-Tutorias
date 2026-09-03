import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue')
  },

  {
    path: '/recuperar',
    name: 'Recuperar',
    component: () => import('../components/Recuperar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router