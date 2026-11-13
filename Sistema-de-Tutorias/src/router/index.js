import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import TheWelcome from "../components/TheWelcome.vue";
import ListasDeEstudiantes from "../components/ListasDeEstudiantes.vue";
import Filtros from "../components/Filtros.vue";
import EnviarTutoria from "../components/EnviarTutoria.vue";
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import Recuperar from "../components/recuperar.vue";
import Admin from "../components/Admin.vue";
import {
  obtenerPerfilActual,
  obtenerSesionActual,
  normalizarRol
} from "../services/auth";
import { supabaseConfigurado } from "../lib/supabase";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/recuperar", name: "recuperar", component: Recuperar },
    { path: "/", name: "inicio", redirect: "/login" },
    { path: "/estudiantes", name: "estudiantes", component: ListasDeEstudiantes },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiereSesion: true, rol: "administracion" }
    },
    {
      path: "/filtros",
      name: "filtros",
      component: Filtros,
      meta: { requiereSesion: true, rol: "profesor" }
    },
    { path: "/enviar-tutoria", name: "enviar-tutoria", component: EnviarTutoria },
    { path: "/hello", name: "hello", component: HelloWorld }
  ]
});

const obtenerRolLocal = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  return {
    usuario,
    rol: normalizarRol(usuario?.rol || usuario?.tipo)
  };
};

router.beforeEach(async to => {
  let usuario = null;
  let rol = "";

  if (supabaseConfigurado) {
    try {
      const sesion = await obtenerSesionActual();
      usuario = sesion?.user || null;
      const perfil = usuario ? await obtenerPerfilActual(usuario) : null;
      rol = normalizarRol(perfil?.rol);
    } catch (error) {
      console.error("No se pudo comprobar la sesión de Supabase:", error);
    }
  } else {
    const local = obtenerRolLocal();
    usuario = local.usuario;
    rol = local.rol;
  }

  if (to.meta.requiereSesion && !usuario) {
    return "/login";
  }

  if (to.meta.rol === "profesor" && rol !== "profesor") {
    return rol === "administracion" ? "/admin" : "/login";
  }

  if (
    to.meta.rol === "administracion" &&
    rol !== "administracion"
  ) {
    return rol === "profesor" ? "/filtros" : "/login";
  }

  return true;
});

export default router;
