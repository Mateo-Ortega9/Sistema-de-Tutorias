import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
import ListasDeEstudiantes from '../components/ListasDeEstudiantes.vue'
import Filtros from '../components/Filtros.vue'
import EnviarTutoria from '../components/EnviarTutoria.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'inicio',
      component: TheWelcome
    },
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: ListasDeEstudiantes
    },
    {
      path: '/filtros',
      name: 'filtros',
      component: Filtros
    },
    {
      path: '/enviar-tutoria',
      name: 'enviar-tutoria',
      component: EnviarTutoria
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }
  ]
})

export default router