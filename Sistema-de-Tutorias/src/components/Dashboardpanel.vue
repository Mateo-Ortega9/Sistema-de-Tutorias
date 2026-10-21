<script setup>
import { computed } from 'vue'
import StatCard from './StatCard.vue'
import TutoriasTable from './TutoriasTable.vue'

defineProps({
  userName: { type: String, default: 'Administrador' }
})

// Datos de ejemplo: reemplazar por la respuesta real de tu API/backend.
const tutorias = [
  { id: 1, materia: 'Matemáticas', profesor: 'Laura Vera', curso: '5to A', horario: 'Lunes 19:00', estado: 'Activa' },
  { id: 2, materia: 'Lengua y Literatura', profesor: 'Martín Cabrera', curso: '4to B', horario: 'Martes 18:00', estado: 'Activa' },
  { id: 3, materia: 'Física', profesor: 'Sofía Ibarra', curso: '6to A', horario: 'Miércoles 17:30', estado: 'Pendiente' },
  { id: 4, materia: 'Química', profesor: 'Diego Molina', curso: '5to B', horario: 'Jueves 19:00', estado: 'Activa' },
  { id: 5, materia: 'Historia', profesor: 'Ana Torres', curso: '3ro A', horario: 'Viernes 18:30', estado: 'Finalizada' }
]

const profesoresActivos = computed(() =>
  String(new Set(tutorias.map((t) => t.profesor)).size).padStart(2, '0')
)
const tutoriasActivas = computed(() =>
  String(tutorias.filter((t) => t.estado === 'Activa').length).padStart(2, '0')
)
</script>

<template>
  <div class="dashboard">
    <header class="dashboard__intro">
      <h1>Panel principal</h1>
      <p>Bienvenido, <strong>{{ userName }}</strong></p>
    </header>

    <div class="dashboard__stats">
      <StatCard icon="idcard" :value="profesoresActivos" label="Profesores activos" />
      <StatCard icon="users" :value="tutoriasActivas" label="Tutorías activas" />
    </div>

    <TutoriasTable :tutorias="tutorias" />
  </div>
</template>

<style scoped>
.dashboard__intro h1 {
  margin: 0 0 0.2rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2vw, 1.9rem);
  color: var(--color-ink);
}
.dashboard__intro p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.dashboard__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>