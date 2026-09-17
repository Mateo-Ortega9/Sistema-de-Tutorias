<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  userName: {
    type: String,
    default: 'Administrador'
  }
})

// Datos de ejemplo: reemplazar por los valores reales cuando estén conectados al backend.
const stats = [
  { id: 'tutorias', label: 'Tutorías esta semana', value: '18', icon: 'calendar' },
  { id: 'estudiantes', label: 'Estudiantes activos', value: '64', icon: 'students' },
  { id: 'profesores', label: 'Profesores', icon: 'teacher', value: '9' },
  { id: 'sesiones', label: 'Sesiones pendientes', value: '5', icon: 'clock' }
]
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__intro">
      <h1>Hola, {{ userName }}</h1>
      <p>Este es el resumen general del sistema de tutorías.</p>
    </div>

    <div class="dashboard__stats">
      <article v-for="stat in stats" :key="stat.id" class="stat-card">
        <span class="stat-card__icon">
          <AppIcon :name="stat.icon" :size="20" />
        </span>
        <div class="stat-card__text">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 960px;
}

.dashboard__intro h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 600;
  color: var(--color-ink);
}

.dashboard__intro p {
  margin: 0;
  color: var(--color-text-muted);
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.1rem 1.2rem;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: 14px;
}

.stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  background: var(--color-teal-soft);
  color: var(--color-teal-deep);
}

.stat-card__text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.stat-card__text strong {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-ink);
  line-height: 1;
}

.stat-card__text span {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
</style>