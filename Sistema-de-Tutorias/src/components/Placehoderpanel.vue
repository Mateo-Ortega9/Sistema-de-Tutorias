<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="placeholder">
    <span class="placeholder__icon">
      <AppIcon name="archive" :size="26" />
    </span>
    <h2>{{ title }}</h2>
    <p>Esta sección todavía no tiene una vista propia. Se va a completar en una próxima etapa.</p>
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  max-width: 480px;
  padding: 2.5rem 2rem;
  background: var(--color-paper-raised);
  border: 1px dashed var(--color-line);
  border-radius: 14px;
}

.placeholder__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.placeholder h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-ink);
}

.placeholder p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>