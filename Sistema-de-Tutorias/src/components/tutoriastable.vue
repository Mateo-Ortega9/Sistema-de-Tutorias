<script setup>
defineProps({
  tutorias: { type: Array, required: true }
})

const estadoClases = {
  Activa: 'badge--activa',
  Pendiente: 'badge--pendiente',
  Finalizada: 'badge--finalizada'
}

function estadoClass(estado) {
  return estadoClases[estado] || 'badge--pendiente'
}
</script>

<template>
  <section class="table-card">
    <header class="table-card__header">
      <h2>Tutorías activas</h2>
      <span class="table-card__count">{{ tutorias.length }} en total</span>
    </header>

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Tutoría</th>
            <th>Profesor</th>
            <th>Curso</th>
            <th>Día / Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tutorias" :key="t.id">
            <td data-label="Tutoría">{{ t.materia }}</td>
            <td data-label="Profesor">{{ t.profesor }}</td>
            <td data-label="Curso">{{ t.curso }}</td>
            <td data-label="Día / Hora">{{ t.horario }}</td>
            <td data-label="Estado">
              <span class="badge" :class="estadoClass(t.estado)">{{ t.estado }}</span>
            </td>
          </tr>
          <tr v-if="!tutorias.length">
            <td colspan="5" class="table-empty">Todavía no hay tutorías cargadas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.table-card {
  margin-top: 1.75rem;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: 14px;
  overflow: hidden;
}

.table-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.3rem 0.6rem;
}
.table-card__header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-ink);
}
.table-card__count {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}
thead th {
  text-align: left;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.7rem 1.3rem;
  border-bottom: 1px solid var(--color-line);
}
tbody td {
  padding: 0.8rem 1.3rem;
  font-size: 0.88rem;
  border-bottom: 1px solid var(--color-line);
}
tbody tr:last-child td {
  border-bottom: none;
}
tbody tr:hover {
  background: #faf8f3;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge--activa {
  background: var(--color-success-bg);
  color: var(--color-success);
}
.badge--pendiente {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}
.badge--finalizada {
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.table-empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem;
}

@media (max-width: 720px) {
  table {
    min-width: 0;
  }
  table,
  thead,
  tbody,
  tr,
  td {
    display: block;
    width: 100%;
  }
  thead {
    display: none;
  }
  tbody tr {
    border-bottom: 1px solid var(--color-line);
    padding: 0.6rem 1.1rem 0.9rem;
  }
  tbody td {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: none;
    padding: 0.35rem 0;
  }
  tbody td::before {
    content: attr(data-label);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}
</style>