<template>
  <div id="app">
    <h1>Vue Directory Tree</h1>
    <p>Familiarize yourself quickly with Vue by traversing the tree and reading through the notes.</p>
    <app-item class="item" :unit="vuetree" />
    <app-moreinfo />
  </div>
</template>

<script>
import AppItem from './components/AppItem.vue'
import AppMoreinfo from './components/AppMoreinfo.vue'

export default {
  components: {
    AppItem,
    AppMoreinfo
  },
  computed: {
    vuetree() {
      return this.$store.state.vuetree
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Space+Mono|Source+Sans+Pro:400,600');

body {
  display: flex;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #34495e;
  background-color: #f8f8f8;
  width: 100vw;
  min-height: 100vh;
}

#app {
  width: 100vw;
  min-height: 100vh;
}

h1,
h2,
h3 {
  text-align: center;
}
</style>

<style scoped>
p {
  text-align: center;
}
</style>

