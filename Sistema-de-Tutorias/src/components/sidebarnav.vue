<script setup>
import { reactive } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  activeId: { type: String, required: true },
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['select', 'close', 'logout'])

const sections = [
  {
    title: null,
    items: [{ id: 'panel-principal', label: 'Panel Principal', icon: 'grid' }]
  },
  {
    title: 'Gestión',
    items: [
      { id: 'profesores', label: 'Profesores', icon: 'user', children: ['Ver todos', 'Agregar profesor'] },
      { id: 'cursos', label: 'Cursos', icon: 'folder', children: ['Ver todos', 'Nuevo curso'] },
      { id: 'tutorias', label: 'Tutorías', icon: 'users' },
      { id: 'estudiantes', label: 'Estudiantes', icon: 'users2', children: ['Ver todos', 'Nuevo estudiante'] }
    ]
  },
  {
    title: 'Seguimiento',
    items: [
      { id: 'sesiones', label: 'Sesiones', icon: 'calendar', children: ['Próximas', 'Historial'] },
      { id: 'registros', label: 'Registros', icon: 'chart', children: ['Asistencia', 'Evaluaciones'] }
    ]
  }
]

const expanded = reactive({})

function toggleItem(item) {
  emit('select', item.id)
  if (item.children) {
    expanded[item.id] = !expanded[item.id]
  } else {
    emit('close')
  }
}

function selectChild(item, child) {
  // El id se mantiene en el padre; se podría reemplazar por una ruta propia por hijo.
  emit('select', item.id)
  emit('close')
}
</script>

<template>
  <transition name="backdrop-fade">
    <div v-if="open" class="backdrop" @click="emit('close')"></div>
  </transition>

  <aside class="sidebar" :class="{ 'sidebar--open': open }">
    <nav class="nav" aria-label="Navegación principal">
      <div v-for="(section, i) in sections" :key="i" class="nav-section">
        <p v-if="section.title" class="nav-section__title">{{ section.title }}</p>

        <div v-for="item in section.items" :key="item.id" class="nav-item">
          <button
            type="button"
            class="nav-item__btn"
            :class="{ 'nav-item__btn--active': activeId === item.id }"
            @click="toggleItem(item)"
          >
            <AppIcon :name="item.icon" :size="19" />
            <span class="nav-item__label">{{ item.label }}</span>
            <AppIcon
              v-if="item.children"
              name="chevron"
              :size="16"
              class="nav-item__chevron"
              :class="{ 'nav-item__chevron--open': expanded[item.id] }"
            />
          </button>

          <ul v-if="item.children && expanded[item.id]" class="nav-submenu">
            <li v-for="child in item.children" :key="child">
              <button type="button" class="nav-submenu__btn" @click="selectChild(item, child)">
                {{ child }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="sidebar__footer">
      <button
        type="button"
        class="nav-item__btn"
        :class="{ 'nav-item__btn--active': activeId === 'configuracion' }"
        @click="toggleItem({ id: 'configuracion' })"
      >
        <AppIcon name="settings" :size="19" />
        <span class="nav-item__label">Configuración</span>
      </button>
      <button type="button" class="nav-item__btn nav-item__btn--danger" @click="emit('logout')">
        <AppIcon name="logout" :size="19" />
        <span class="nav-item__label">Cerrar sesión</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 24, 0.45);
  z-index: 40;
}
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.2s ease;
}
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

.sidebar {
  width: 272px;
  background: var(--color-ink);
  color: #cdd3e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0.85rem 1.25rem;
  overflow-y: auto;
  border-right: 1px solid var(--color-ink-line);
}

.nav-section {
  margin-bottom: 0.35rem;
}
.nav-section__title {
  margin: 1.1rem 0.6rem 0.4rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7c88a3;
}
.nav-section:first-child .nav-section__title {
  margin-top: 0.2rem;
}

.nav-item__btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.7rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.88rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}
.nav-item__btn:hover {
  background: var(--color-ink-soft);
  color: #fff;
}
.nav-item__btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
}
.nav-item__btn--active {
  background: var(--color-accent-soft);
  color: var(--color-ink);
  font-weight: 600;
}

.nav-item__label {
  flex: 1;
}
.nav-item__chevron {
  color: #7c88a3;
  transition: transform 0.18s ease;
}
.nav-item__chevron--open {
  transform: rotate(180deg);
}

.nav-submenu {
  list-style: none;
  margin: 0.15rem 0 0.4rem;
  padding-left: 2.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.nav-submenu__btn {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  color: #9aa4bb;
  font: inherit;
  font-size: 0.8rem;
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;
}
.nav-submenu__btn:hover {
  background: var(--color-ink-soft);
  color: #fff;
}

.sidebar__footer {
  border-top: 1px solid var(--color-ink-line);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.nav-item__btn--danger:hover {
  background: #3a1f24;
  color: #f3a9ad;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    top: var(--header-height);
    left: 0;
    bottom: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.22s ease;
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.25);
  }
  .sidebar--open {
    transform: translateX(0);
  }
}
</style>