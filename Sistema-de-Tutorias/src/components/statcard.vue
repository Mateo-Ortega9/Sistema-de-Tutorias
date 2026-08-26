<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, required: true },
  value: { type: [String, Number], required: true },
  label: { type: String, required: true }
})
</script>

<template>
  <article class="stat-card">
    <div class="stat-card__icon">
      <AppIcon :name="icon" :size="26" />
    </div>
    <div class="stat-card__body">
      <p class="stat-card__value">{{ value }}</p>
      <p class="stat-card__label">{{ label }}</p>
    </div>
  </article>
</template>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-left: 4px solid var(--color-accent);
  border-radius: 14px;
  padding: 1.1rem 1.3rem;
  min-width: 220px;
  max-width: 480px;
  flex: 1 1 240px;
  box-shadow: 0 1px 2px rgba(20, 20, 10, 0.04);
}

.stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--color-accent-soft);
  color: var(--color-accent-deep);
  flex: none;
}

.stat-card__value {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 1.9rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1;
}

.stat-card__label {
  margin: 0.3rem 0 0;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
</style>