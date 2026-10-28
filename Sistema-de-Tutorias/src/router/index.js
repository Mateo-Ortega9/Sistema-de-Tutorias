import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'
import ListasDeEstudiantes from '../components/ListasDeEstudiantes.vue'
import Filtros from '../components/Filtros.vue'
import EnviarTutoria from '../components/EnviarTutoria.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Recuperar from '../components/recuperar.vue'
import Admin from '../components/Admin.vue'

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
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiereSesion: true, rol: 'administracion' }
    },
    {
      path: '/filtros',
      name: 'filtros',
      component: Filtros,
      meta: { requiereSesion: true, rol: 'profesor' }
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

router.beforeEach((to) => {
  const usuario = JSON.parse(
    localStorage.getItem('usuarioActual') || 'null'
  )
  const rol = String(usuario?.rol || usuario?.tipo || '')
    .trim()
    .toLowerCase()

  if (to.meta.requiereSesion && !usuario) {
    return '/login'
  }

  if (to.meta.rol === 'profesor' && rol !== 'profesor') {
    return rol === 'administrador' || rol === 'administracion'
      ? '/admin'
      : '/login'
  }

  if (to.meta.rol === 'administracion' &&
      !['administrador', 'administracion'].includes(rol)) {
    return rol === 'profesor' ? '/filtros' : '/login'
  }

  return true
})

export default router
