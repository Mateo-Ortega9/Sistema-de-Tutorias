<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20
  }
})

// Trazos simples, geometría consistente (stroke 1.8, cantos redondeados).
// Agregar un ícono nuevo es sumar una entrada acá.
const paths = {
  menu: 'M3 6h18 M3 12h18 M3 18h18',
  close: 'M6 6l12 12 M18 6L6 18',
  cap: 'M12 4 2 9l10 5 10-5-10-5Z M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5',
  bell: 'M6 9a6 6 0 0 1 12 0v5l1.6 2.5H4.4L6 14V9Z M9.5 19a2.5 2.5 0 0 0 5 0',
  home: 'M4 11 12 4l8 7 M6 10v9h5v-5h2v5h5v-9',
  teacher: 'M4 19c0-3 3.6-5 8-5s8 2 8 5 M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M2 8l4-2 4 2-4 2-4-2Z',
  book: 'M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z',
  calendar: 'M4 9h16 M7 3v4 M17 3v4 M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  students: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M17 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M2 19c0-2.8 2.7-5 6-5s6 2.2 6 5 M14.5 19c0-2.2-1.8-4-4-4.6 M14.5 14.3c2.8.3 4.9 2.3 4.9 4.7',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7.5V12l3 2',
  archive: 'M3 4h18v4H3z M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8 M10 12h4',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2.3 M12 19.7V22 M4.2 4.2l1.6 1.6 M18.2 18.2l1.6 1.6 M2 12h2.3 M19.7 12H22 M4.2 19.8l1.6-1.6 M18.2 5.8l1.6-1.6',
  logout: 'M9 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3 M14 15l4-3-4-3 M18 12H9'
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] ?? ''" />
  </svg>
</template>