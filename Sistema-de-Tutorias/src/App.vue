<script setup>
import { ref, computed } from 'vue'
import SidebarNav from './components/SidebarNav.vue'
import AppIcon from './components/AppIcon.vue'
import DashboardPanel from './components/DashboardPanel.vue'
import PlaceholderPanel from './components/PlaceholderPanel.vue'

const sidebarOpen = ref(false)
const activeId = ref('panel-principal')

const sectionTitles = {
  'panel-principal': 'Panel Principal',
  profesores: 'Profesores',
  cursos: 'Cursos',
  tutorias: 'Tutorías',
  estudiantes: 'Estudiantes',
  sesiones: 'Sesiones',
  registros: 'Registros',
  configuracion: 'Configuración'
}

const pageTitle = computed(() => sectionTitles[activeId.value] ?? 'Panel Principal')

function handleSelect(id) {
  activeId.value = id
}

function handleLogout() {
  // Punto de enganche: reemplazar por la lógica real de cierre de sesión (router, store de auth, etc.)
  window.alert('Cerrando sesión...')
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__left">
        <button
          type="button"
          class="icon-btn app-header__toggle"
          :aria-label="sidebarOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="sidebarOpen = !sidebarOpen"
        >
          <AppIcon :name="sidebarOpen ? 'close' : 'menu'" :size="22" />
        </button>
        <div class="app-header__brand">
          <AppIcon name="cap" :size="24" />
          <span>Sistema de Tutorías</span>
        </div>
      </div>

      <div class="app-header__right">
        <button type="button" class="icon-btn" aria-label="Notificaciones">
          <AppIcon name="bell" :size="20" />
        </button>
        <div class="app-header__profile">
          <span class="app-header__avatar">AD</span>
          <div class="app-header__profile-text">
            <strong>Administrador</strong>
            <small>Director académico</small>
          </div>
        </div>
      </div>
    </header>

    <div class="app-body">
      <SidebarNav
        :active-id="activeId"
        :open="sidebarOpen"
        @select="handleSelect"
        @close="sidebarOpen = false"
        @logout="handleLogout"
      />

      <main class="app-main">
        <DashboardPanel v-if="activeId === 'panel-principal'" user-name="Administrador" />
        <PlaceholderPanel v-else :title="pageTitle" />
      </main>
    </div>
  </div>
</template>

<style>
/* Estilos globales sin "scoped": tipografías del sistema de diseño.
   Se cargan por @import para que este archivo funcione como reemplazo directo
   sin tener que tocar index.html. Si preferís mejor rendimiento, podés mover
   este <link> a index.html en su lugar. */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

* {
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
}
body {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>

<style scoped>
.app-shell {
  /* Paleta */
  --color-ink: #131c2e;
  --color-ink-soft: #1d2a42;
  --color-ink-line: #2a3956;
  --color-paper: #f6f4ef;
  --color-paper-raised: #ffffff;
  --color-text: #1c2436;
  --color-text-muted: #6b7280;
  --color-accent: #c98a3e;
  --color-accent-deep: #a86b28;
  --color-accent-soft: #f1e2ce;
  --color-line: #e4e0d6;
  --color-success: #3f8f5f;
  --color-success-bg: #e3f2e8;
  --color-warning: #b9852f;
  --color-warning-bg: #faf0dd;
  --color-neutral: #6b7280;
  --color-neutral-bg: #eceae4;

  /* Tipografía */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Layout */
  --header-height: 64px;

  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-paper);
  color: var(--color-text);
  font-family: var(--font-body);
  overflow: hidden;
}

/* Header */
.app-header {
  flex: none;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.25rem;
  background: var(--color-ink);
  color: #fff;
  border-bottom: 1px solid var(--color-ink-line);
}

.app-header__left,
.app-header__right {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #fff;
  white-space: nowrap;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: #e7e4dc;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.icon-btn:hover {
  background: var(--color-ink-soft);
  border-color: var(--color-ink-line);
}
.icon-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.app-header__toggle {
  display: none;
}

.app-header__profile {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-left: 0.75rem;
  border-left: 1px solid var(--color-ink-line);
}

.app-header__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.85rem;
  flex: none;
}

.app-header__profile-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.app-header__profile-text strong {
  font-size: 0.85rem;
}
.app-header__profile-text small {
  font-size: 0.72rem;
  color: #b7c0d1;
}

/* Cuerpo: sidebar + contenido */
.app-body {
  flex: 1;
  display: grid;
  grid-template-columns: 272px 1fr;
  min-height: 0;
}

.app-main {
  min-width: 0;
  overflow-y: auto;
  padding: clamp(1.25rem, 2vw, 2.5rem);
}

@media (max-width: 900px) {
  .app-header__toggle {
    display: inline-flex;
  }
  .app-header__profile-text {
    display: none;
  }
  .app-body {
    grid-template-columns: 1fr;
  }
}
</style>