<template>
  <div class="admin-page">
    <aside class="admin-sidebar" :class="{ cerrado: !menuAbierto }">
      <div class="brand">
        <div class="brand-icon">P</div>
        <div>
          <strong>PROA</strong>
          <small>Administración</small>
        </div>
      </div>

      <nav class="admin-nav">
        <button
          type="button"
          :class="{ activo: vista === 'resumen' }"
          @click="vista = 'resumen'"
        >
          <span>▦</span>
          Resumen
        </button>

        <button
          type="button"
          :class="{ activo: vista === 'usuarios' }"
          @click="vista = 'usuarios'"
        >
          <span>♙</span>
          Usuarios
        </button>

        <button
          type="button"
          :class="{ activo: vista === 'estudiantes' }"
          @click="vista = 'estudiantes'"
        >
          <span>♧</span>
          Estudiantes
        </button>
      </nav>

      <div class="sidebar-bottom">
        <button type="button" class="vista-profesor" @click="irAProfesor">
          ↗ Vista profesor
        </button>
        <button type="button" class="salir-sidebar" @click="cerrarSesion">
          ↪ Cerrar sesión
        </button>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <button
          type="button"
          class="menu-button"
          aria-label="Mostrar menú"
          @click="menuAbierto = !menuAbierto"
        >
          ☰
        </button>

        <div class="topbar-title">
          <span class="eyebrow">PANEL DE CONTROL</span>
          <h1>{{ tituloVista }}</h1>
        </div>

        <div class="admin-account">
          <div class="admin-avatar">{{ inicialesAdmin }}</div>
          <div>
            <strong>{{ nombreAdmin }}</strong>
            <small>Administrador</small>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <section v-if="vista === 'resumen'">
          <div class="welcome">
            <div>
              <span class="eyebrow">SISTEMA DE TUTORÍAS</span>
              <h2>¡Hola, {{ nombreAdmin }}!</h2>
              <p>Desde acá podés controlar usuarios y estudiantes.</p>
            </div>
            <button type="button" class="primary-button" @click="abrirNuevoUsuario">
              + Nuevo usuario
            </button>
          </div>

          <div class="stats">
            <article class="stat-card violet">
              <span class="stat-icon">♙</span>
              <div>
                <strong>{{ usuarios.length }}</strong>
                <span>Usuarios registrados</span>
              </div>
            </article>

            <article class="stat-card blue">
              <span class="stat-icon">★</span>
              <div>
                <strong>{{ profesores }}</strong>
                <span>Profesores</span>
              </div>
            </article>

            <article class="stat-card green">
              <span class="stat-icon">♧</span>
              <div>
                <strong>{{ estudiantes.length }}</strong>
                <span>Estudiantes</span>
              </div>
            </article>

            <article class="stat-card orange">
              <span class="stat-icon">▤</span>
              <div>
                <strong>{{ materias }}</strong>
                <span>Materias activas</span>
              </div>
            </article>
          </div>

          <div class="dashboard-grid">
            <section class="panel-card">
              <div class="panel-heading">
                <div>
                  <h3>Usuarios recientes</h3>
                  <p>Últimas cuentas guardadas en el sistema.</p>
                </div>
                <button type="button" class="text-button" @click="vista = 'usuarios'">
                  Ver todos
                </button>
              </div>

              <div v-if="usuariosRecientes.length" class="recent-list">
                <div v-for="usuario in usuariosRecientes" :key="usuario.id || usuario.email" class="recent-row">
                  <div class="table-avatar">{{ iniciales(usuario) }}</div>
                  <div class="recent-data">
                    <strong>{{ usuario.nombre }} {{ usuario.apellido }}</strong>
                    <span>{{ usuario.email }}</span>
                  </div>
                  <span class="role-badge">{{ etiquetaRol(usuario) }}</span>
                </div>
              </div>

              <p v-else class="empty">Todavía no hay usuarios registrados.</p>
            </section>

            <section class="panel-card quick-card">
              <div class="panel-heading">
                <div>
                  <h3>Accesos rápidos</h3>
                  <p>Atajos para administrar el sistema.</p>
                </div>
              </div>

              <button type="button" class="quick-action" @click="abrirNuevoUsuario">
                <span class="quick-icon violet-bg">+</span>
                <span>
                  <strong>Crear usuario</strong>
                  <small>Agregar un profesor o administrador</small>
                </span>
              </button>

              <button type="button" class="quick-action" @click="vista = 'estudiantes'">
                <span class="quick-icon blue-bg">♧</span>
                <span>
                  <strong>Ver estudiantes</strong>
                  <small>Consultar cursos y materias</small>
                </span>
              </button>

              <button type="button" class="quick-action" @click="irAProfesor">
                <span class="quick-icon green-bg">↗</span>
                <span>
                  <strong>Vista profesor</strong>
                  <small>Ir al calendario de tutorías</small>
                </span>
              </button>
            </section>
          </div>
        </section>

        <section v-if="vista === 'usuarios'" class="panel-card full-panel">
          <div class="section-heading">
            <div>
              <h2>Usuarios</h2>
              <p>Administrá las cuentas creadas en este navegador.</p>
            </div>
            <button type="button" class="primary-button" @click="abrirNuevoUsuario">
              + Nuevo usuario
            </button>
          </div>

          <div class="filters">
            <input v-model="busquedaUsuarios" type="search" placeholder="Buscar por nombre o correo..." />
            <select v-model="filtroRol">
              <option value="todos">Todos los roles</option>
              <option value="profesor">Profesores</option>
              <option value="administracion">Administradores</option>
            </select>
          </div>

          <div v-if="usuariosFiltrados.length" class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="usuario in usuariosFiltrados" :key="usuario.id || usuario.email">
                  <td>
                    <div class="table-user">
                      <div class="table-avatar">{{ iniciales(usuario) }}</div>
                      <strong>{{ usuario.nombre }} {{ usuario.apellido }}</strong>
                    </div>
                  </td>
                  <td>{{ usuario.email }}</td>
                  <td><span class="role-badge">{{ etiquetaRol(usuario) }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p v-else class="empty">No encontramos usuarios con esos filtros.</p>
        </section>

        <section v-if="vista === 'estudiantes'" class="panel-card full-panel">
          <div class="section-heading">
            <div>
              <h2>Estudiantes</h2>
              <p>Listado general de estudiantes por curso y materia.</p>
            </div>
          </div>

          <div class="filters">
            <input v-model="busquedaEstudiantes" type="search" placeholder="Buscar estudiante..." />
            <select v-model="filtroCurso">
              <option value="todos">Todos los cursos</option>
              <option v-for="curso in cursos" :key="curso" :value="curso">{{ curso }}</option>
            </select>
            <select v-model="filtroMateria">
              <option value="todas">Todas las materias</option>
              <option v-for="materia in materiasDisponibles" :key="materia.valor" :value="materia.valor">
                {{ materia.nombre }}
              </option>
            </select>
          </div>

          <div v-if="estudiantesFiltrados.length" class="student-grid">
            <article v-for="estudiante in estudiantesFiltrados" :key="estudiante.id" class="student-card">
              <div class="student-avatar">{{ estudiante.nombre.charAt(0) }}</div>
              <div>
                <strong>{{ estudiante.nombre }}</strong>
                <span>{{ estudiante.curso }} · {{ nombreMateria(estudiante.materia) }}</span>
                <small>{{ estudiante.email }}</small>
              </div>
            </article>
          </div>

          <p v-else class="empty">No encontramos estudiantes con esos filtros.</p>
        </section>
      </main>
    </div>

    <div v-if="mostrarNuevoUsuario" class="modal-background" @click.self="mostrarNuevoUsuario = false">
      <div class="new-user-modal">
        <button type="button" class="close-button" @click="mostrarNuevoUsuario = false">✕</button>
        <span class="eyebrow">NUEVA CUENTA</span>
        <h2>Crear usuario</h2>
        <p>Agregá una cuenta para el sistema.</p>

        <form @submit.prevent="crearUsuario">
          <div class="form-row">
            <label>
              Nombre
              <input v-model="nuevoUsuario.nombre" type="text" required />
            </label>
            <label>
              Apellido
              <input v-model="nuevoUsuario.apellido" type="text" required />
            </label>
          </div>

          <label>
            Correo institucional
            <input v-model="nuevoUsuario.email" type="email" required />
          </label>

          <label>
            Contraseña
            <input v-model="nuevoUsuario.password" type="password" minlength="6" required />
          </label>

          <label>
            Rol
            <select v-model="nuevoUsuario.tipo" required>
              <option value="profesor">Profesor</option>
              <option value="administracion">Administración</option>
            </select>
          </label>

          <div class="modal-actions">
            <button type="button" class="secondary-button" @click="mostrarNuevoUsuario = false">
              Cancelar
            </button>
            <button type="submit" class="primary-button">Guardar usuario</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ESTUDIANTES from "../data/estudiantes";

const router = useRouter();
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");
const usuarios = ref(JSON.parse(localStorage.getItem("usuariosPROA") || "[]"));
const estudiantes = ESTUDIANTES;

const vista = ref("resumen");
const menuAbierto = ref(true);
const mostrarNuevoUsuario = ref(false);
const busquedaUsuarios = ref("");
const filtroRol = ref("todos");
const busquedaEstudiantes = ref("");
const filtroCurso = ref("todos");
const filtroMateria = ref("todas");

const nuevoUsuario = ref({
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  tipo: "profesor"
});

const materiasDisponibles = [
  { valor: "matematica", nombre: "Matemática" },
  { valor: "lengua", nombre: "Lengua" },
  { valor: "ingles", nombre: "Inglés" },
  { valor: "programacion", nombre: "Programación" },
  { valor: "geografia", nombre: "Geografía" },
  { valor: "historia", nombre: "Historia" }
];

const rolDe = usuario =>
  String(usuario.rol || usuario.tipo || "").trim().toLowerCase() === "administrador"
    ? "administracion"
    : String(usuario.rol || usuario.tipo || "").trim().toLowerCase();

const profesores = computed(() =>
  usuarios.value.filter(usuario => rolDe(usuario) === "profesor").length
);

const materias = computed(() =>
  new Set(estudiantes.map(estudiante => estudiante.materia)).size
);

const cursos = computed(() =>
  [...new Set(estudiantes.map(estudiante => estudiante.curso))]
);

const usuariosRecientes = computed(() =>
  [...usuarios.value].reverse().slice(0, 5)
);

const usuariosFiltrados = computed(() => {
  const texto = busquedaUsuarios.value.trim().toLowerCase();

  return usuarios.value.filter(usuario => {
    const nombre = `${usuario.nombre || ""} ${usuario.apellido || ""} ${usuario.email || ""}`.toLowerCase();
    const coincideTexto = !texto || nombre.includes(texto);
    const coincideRol = filtroRol.value === "todos" || rolDe(usuario) === filtroRol.value;

    return coincideTexto && coincideRol;
  });
});

const estudiantesFiltrados = computed(() => {
  const texto = busquedaEstudiantes.value.trim().toLowerCase();

  return estudiantes.filter(estudiante => {
    const coincideTexto = !texto || estudiante.nombre.toLowerCase().includes(texto);
    const coincideCurso = filtroCurso.value === "todos" || estudiante.curso === filtroCurso.value;
    const coincideMateria = filtroMateria.value === "todas" || estudiante.materia === filtroMateria.value;

    return coincideTexto && coincideCurso && coincideMateria;
  });
});

const nombreAdmin = computed(() =>
  usuarioActual?.nombre || "Administrador"
);

const inicialesAdmin = computed(() =>
  [usuarioActual?.nombre, usuarioActual?.apellido]
    .filter(Boolean)
    .map(texto => texto.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2) || "A"
);

const tituloVista = computed(() => ({
  resumen: "Resumen general",
  usuarios: "Usuarios",
  estudiantes: "Estudiantes"
}[vista.value]));

const iniciales = usuario =>
  [usuario.nombre, usuario.apellido]
    .filter(Boolean)
    .map(texto => texto.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2) || "U";

const etiquetaRol = usuario =>
  rolDe(usuario) === "profesor" ? "Profesor" : "Administración";

const nombreMateria = materia => {
  const encontrada = materiasDisponibles.find(item => item.valor === materia);
  return encontrada?.nombre || materia;
};

const abrirNuevoUsuario = () => {
  nuevoUsuario.value = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo: "profesor"
  };
  mostrarNuevoUsuario.value = true;
};

const crearUsuario = () => {
  const email = nuevoUsuario.value.email.trim().toLowerCase();

  if (!email.endsWith("@escuelasproa.edu.ar")) {
    alert("Usá un correo institucional @escuelasproa.edu.ar.");
    return;
  }

  if (usuarios.value.some(usuario => usuario.email === email)) {
    alert("Ese correo ya está registrado.");
    return;
  }

  const usuario = {
    id: Date.now(),
    nombre: nuevoUsuario.value.nombre.trim(),
    apellido: nuevoUsuario.value.apellido.trim(),
    email,
    password: nuevoUsuario.value.password,
    tipo: nuevoUsuario.value.tipo
  };

  usuarios.value.push(usuario);
  localStorage.setItem("usuariosPROA", JSON.stringify(usuarios.value));
  mostrarNuevoUsuario.value = false;
  alert("Usuario creado correctamente.");
};

const irAProfesor = () => {
  router.push("/filtros");
};

const cerrarSesion = () => {
  localStorage.removeItem("usuarioActual");
  router.push("/login");
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.admin-page {
  min-height: 100vh;
  display: flex;
  background: #f5f7fb;
  color: #172033;
}

.admin-sidebar {
  width: 245px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 24px 16px;
  background: #151a2d;
  color: white;
  transition: width .2s, padding .2s;
}

.admin-sidebar.cerrado {
  width: 0;
  padding: 24px 0;
  overflow: hidden;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 10px 30px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: linear-gradient(135deg, #818cf8, #6366f1);
  font-size: 20px;
  font-weight: 800;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  letter-spacing: .08em;
}

.brand small {
  margin-top: 2px;
  color: #aab3cf;
  font-size: 11px;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-nav button,
.vista-profesor,
.salir-sidebar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 13px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #b9c2dc;
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.admin-nav button:hover,
.admin-nav button.activo {
  background: #2a3150;
  color: white;
}

.admin-nav button span {
  width: 20px;
  text-align: center;
}

.sidebar-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.vista-profesor {
  color: #c7d2fe;
  background: rgba(99, 102, 241, .17);
}

.salir-sidebar:hover,
.vista-profesor:hover {
  background: #2a3150;
  color: white;
}

.admin-main {
  min-width: 0;
  flex: 1;
}

.admin-topbar {
  min-height: 82px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 30px;
  background: white;
  border-bottom: 1px solid #e6e9f0;
}

.menu-button {
  width: 40px;
  height: 40px;
  border: 1px solid #e0e4ee;
  border-radius: 9px;
  background: white;
  color: #4f46e5;
  cursor: pointer;
  font-size: 18px;
}

.topbar-title {
  flex: 1;
}

.topbar-title h1 {
  margin: 3px 0 0;
  font-size: 21px;
}

.eyebrow {
  color: #6366f1;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .13em;
}

.admin-account {
  display: flex;
  align-items: center;
  gap: 9px;
}

.admin-account strong,
.admin-account small {
  display: block;
}

.admin-account small {
  margin-top: 3px;
  color: #7b8499;
  font-size: 12px;
}

.admin-avatar,
.table-avatar,
.student-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  font-weight: 800;
}

.admin-avatar {
  width: 38px;
  height: 38px;
  background: #e0e7ff;
  color: #4338ca;
}

.admin-content {
  width: min(100% - 48px, 1250px);
  margin: 28px auto;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.welcome h2 {
  margin: 8px 0 5px;
  font-size: 27px;
}

.welcome p,
.panel-heading p,
.section-heading p {
  margin: 0;
  color: #7b8499;
}

.primary-button,
.secondary-button {
  padding: 11px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.primary-button {
  border: 0;
  background: #4f46e5;
  color: white;
}

.primary-button:hover {
  background: #4338ca;
}

.secondary-button {
  border: 1px solid #d9deea;
  background: white;
  color: #4b5563;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border: 1px solid #e5e8f0;
  border-radius: 13px;
  background: white;
}

.stat-card strong,
.stat-card span {
  display: block;
}

.stat-card strong {
  font-size: 25px;
}

.stat-card span:last-child {
  margin-top: 4px;
  color: #7b8499;
  font-size: 12px;
}

.stat-icon,
.quick-icon {
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-weight: 800;
}

.stat-icon {
  width: 42px;
  height: 42px;
}

.violet .stat-icon,
.violet-bg {
  background: #ede9fe;
  color: #7c3aed;
}

.blue .stat-icon,
.blue-bg {
  background: #dbeafe;
  color: #2563eb;
}

.green .stat-icon,
.green-bg {
  background: #dcfce7;
  color: #16a34a;
}

.orange .stat-icon,
.orange-bg {
  background: #ffedd5;
  color: #ea580c;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 20px;
}

.panel-card {
  padding: 24px;
  border: 1px solid #e5e8f0;
  border-radius: 14px;
  background: white;
}

.panel-heading,
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
}

.panel-heading h3,
.section-heading h2 {
  margin: 0 0 5px;
}

.text-button {
  border: 0;
  background: transparent;
  color: #4f46e5;
  font-weight: 700;
  cursor: pointer;
}

.recent-list {
  margin-top: 20px;
}

.recent-row,
.table-user {
  display: flex;
  align-items: center;
  gap: 11px;
}

.recent-row {
  padding: 13px 0;
  border-top: 1px solid #eef0f5;
}

.table-avatar {
  width: 38px;
  height: 38px;
  background: #f0edff;
  color: #635bce;
  font-size: 13px;
}

.recent-data {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.recent-data span {
  color: #7b8499;
  font-size: 12px;
}

.role-badge {
  width: max-content;
  padding: 5px 9px;
  border-radius: 20px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
}

.quick-card {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border: 0;
  border-top: 1px solid #eef0f5;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.quick-action span:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.quick-action small {
  color: #7b8499;
}

.quick-icon {
  width: 36px;
  height: 36px;
  font-size: 18px;
}

.full-panel {
  min-height: 500px;
}

.filters {
  display: flex;
  gap: 12px;
  margin: 24px 0 16px;
}

.filters input,
.filters select,
.new-user-modal input,
.new-user-modal select {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d8ddea;
  border-radius: 8px;
  outline: none;
  background: white;
  color: #293044;
  font: inherit;
}

.filters input:focus,
.filters select:focus,
.new-user-modal input:focus,
.new-user-modal select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, .1);
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 10px;
  border-top: 1px solid #eef0f5;
  text-align: left;
  white-space: nowrap;
}

th {
  color: #7b8499;
  font-size: 12px;
  font-weight: 700;
}

td {
  color: #4b5563;
  font-size: 14px;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #eef0f5;
  border-radius: 10px;
}

.student-avatar {
  width: 40px;
  height: 40px;
  background: #dcfce7;
  color: #15803d;
}

.student-card strong,
.student-card span,
.student-card small {
  display: block;
}

.student-card span,
.student-card small {
  margin-top: 3px;
  color: #7b8499;
  font-size: 12px;
}

.empty {
  padding: 30px 0 5px;
  color: #7b8499;
  text-align: center;
}

.modal-background {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(17, 24, 39, .5);
}

.new-user-modal {
  position: relative;
  width: min(100%, 520px);
  padding: 28px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .2);
}

.new-user-modal h2 {
  margin: 8px 0 5px;
}

.new-user-modal > p {
  margin: 0 0 22px;
  color: #7b8499;
}

.new-user-modal form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.new-user-modal label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 17px;
  border: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  font-size: 18px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .admin-sidebar {
    position: fixed;
    z-index: 15;
    height: 100vh;
  }

  .admin-sidebar.cerrado {
    width: 0;
  }

  .admin-content {
    width: min(100% - 28px, 1250px);
  }

  .admin-topbar {
    padding: 16px;
  }

  .admin-account > div:last-child {
    display: none;
  }

  .welcome,
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .stats,
  .student-grid {
    grid-template-columns: 1fr;
  }

  .filters,
  .form-row {
    display: flex;
    flex-direction: column;
  }
}
</style>
