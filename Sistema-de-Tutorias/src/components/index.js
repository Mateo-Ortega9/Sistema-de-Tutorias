import { createRouter, createWebHistory } from 'vue-router'
import Filtros from '../components/Filtros.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Filtros
    }
  ]
})

export default router