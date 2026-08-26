<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  title: { type: String, required: true }
})
</script>

<template>
  <div class="placeholder">
    <AppIcon name="folder" :size="34" />
    <h1>{{ title }}</h1>
    <p>Esta sección todavía no tiene contenido cargado. Elegí "Panel Principal" para ver el resumen general.</p>
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  max-width: 480px;
  margin-top: 2rem;
  color: var(--color-text-muted);
}
.placeholder svg {
  color: var(--color-accent-deep);
}
.placeholder h1 {
  margin: 0;
  font-family: var(--font-display);
  color: var(--color-ink);
  font-size: 1.4rem;
}
.placeholder p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
}
</style>