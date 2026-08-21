import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/profesor-perfil'
  },

  {
    path: '/profesor-perfil',
    name: 'ProfesorPerfil',
    component: () => import('../components/ProfesorPerfil.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router