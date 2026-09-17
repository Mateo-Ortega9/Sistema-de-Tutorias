<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  activeId: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'close', 'logout'])

// Mismo set de ids que sectionTitles en App.vue.
const items = [
  { id: 'panel-principal', label: 'Panel Principal', icon: 'home' },
  { id: 'profesores', label: 'Profesores', icon: 'teacher' },
  { id: 'cursos', label: 'Cursos', icon: 'book' },
  { id: 'tutorias', label: 'Tutorías', icon: 'calendar' },
  { id: 'estudiantes', label: 'Estudiantes', icon: 'students' },
  { id: 'sesiones', label: 'Sesiones', icon: 'clock' },
  { id: 'registros', label: 'Registros', icon: 'archive' },
  { id: 'configuracion', label: 'Configuración', icon: 'settings' }
]

function select(id) {
  emit('select', id)
  emit('close')
}
</script>

<template>
  <div>
    <div v-if="open" class="sidebar-backdrop" @click="emit('close')" />

    <aside class="sidebar" :class="{ 'sidebar--open': open }">
      <nav class="sidebar__nav">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': item.id === activeId }"
          @click="select(item.id)"
        >
          <AppIcon :name="item.icon" :size="19" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <button type="button" class="sidebar__logout" @click="emit('logout')">
        <AppIcon name="logout" :size="19" />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  </div>
</template>

<style scoped>
.sidebar-backdrop {
  display: none;
}

.sidebar {
  grid-row: 1;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1.25rem 0.9rem;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-line);
  overflow-y: auto;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar__item:hover {
  background: var(--color-neutral-bg);
  color: var(--color-text);
}

.sidebar__item--active {
  background: var(--color-accent-soft);
  color: var(--color-accent-deep);
  font-weight: 600;
}

.sidebar__logout {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border: none;
  border-top: 1px solid var(--color-line);
  border-radius: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.15s ease;
}

.sidebar__logout:hover {
  color: var(--color-teal-deep);
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    width: 78%;
    max-width: 300px;
    z-index: 30;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    box-shadow: 2px 0 16px rgba(18, 60, 75, 0.15);
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: var(--header-height) 0 0 0;
    z-index: 20;
    background: rgba(18, 60, 75, 0.35);
  }
}
</style>