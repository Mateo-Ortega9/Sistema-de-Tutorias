import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
import ListasDeEstudiantes from '../components/ListasDeEstudiantes.vue'
import Filtros from '../components/Filtros.vue'
import EnviarTutoria from '../components/EnviarTutoria.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Recuperar from '../components/recuperar.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/recuperar',
      name: 'recuperar',
      component: Recuperar
    },
    {
      path: '/',
      name: 'inicio',
      redirect: '/login'
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
