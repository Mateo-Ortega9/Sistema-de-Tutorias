<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 20 }
})

// Set de iconos propio (línea, estilo feather) para no depender de librerías externas
// y así garantizar que este componente funcione sin instalar nada nuevo.
const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>',
  folder: '<path d="M3 7a1.5 1.5 0 0 1 1.5-1.5h4l1.6 2H19.5A1.5 1.5 0 0 1 21 9v9A1.5 1.5 0 0 1 19.5 19.5h-15A1.5 1.5 0 0 1 3 18V7Z"/>',
  users: '<circle cx="8.5" cy="8" r="2.8"/><circle cx="16" cy="9" r="2.3"/><path d="M3 19c0-3 2.4-5.2 5.5-5.2S14 16 14 19"/><path d="M14.5 19c0-2.2 1.6-4 4-4"/>',
  users2: '<circle cx="7" cy="9" r="2.3"/><circle cx="12" cy="7" r="2.6"/><circle cx="17" cy="9" r="2.3"/><path d="M3 19c0-2.6 1.8-4.4 4-4.4"/><path d="M21 19c0-2.6-1.8-4.4-4-4.4"/><path d="M8 19.2c0-2.8 1.8-4.8 4-4.8s4 2 4 4.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.8"/><path d="M3.5 9.5h17"/><path d="M8 3v3.6M16 3v3.6"/>',
  chart: '<rect x="4" y="12" width="3.2" height="8" rx="0.6"/><rect x="10.4" y="7" width="3.2" height="13" rx="0.6"/><rect x="16.8" y="3.5" width="3.2" height="16.5" rx="0.6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.3-2-3.4-2.3.8a7.7 7.7 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.6a7.7 7.7 0 0 0-2.6 1.5l-2.3-.8-2 3.4 2 1.3a7.6 7.6 0 0 0 0 3l-2 1.3 2 3.4 2.3-.8c.8.7 1.6 1.2 2.6 1.5l.5 2.6h4l.5-2.6c1-.3 1.8-.8 2.6-1.5l2.3.8 2-3.4-2-1.3Z"/>',
  logout: '<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="M15 16l4-4-4-4"/><path d="M19 12H9"/>',
  menu: '<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  bell: '<path d="M12 3.5a5 5 0 0 0-5 5v3.2c0 .7-.3 1.4-.8 2L5 15.5h14l-1.2-1.8a3.4 3.4 0 0 1-.8-2V8.5a5 5 0 0 0-5-5Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 16c0-1.5 1.1-2.5 2.5-2.5S11 14.5 11 16"/><path d="M13.5 9.5h5M13.5 12.5h5M13.5 15.5h3"/>',
  cap: '<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 9v6"/>'
}

const markup = computed(() => paths[props.name] || '')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="markup"
  />
</template>