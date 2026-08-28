<template>
  <Filtros />
</template>

<script>
import Filtros from "./components/Filtros.vue";

export default {
  name: "App",

  components: {
    Filtros
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f6f8;
}
</style>676767