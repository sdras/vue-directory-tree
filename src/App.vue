<template>
  <component :is="selected" id="app">
    <app-nav />
    <main>
      <app-item class="item" :unit="vuetree" />
    </main>
  </component>
</template>

<script>
import AppNav from './components/AppNav.vue'
import AppItem from './components/AppItem.vue'
import AppDarkmode from './components/AppDarkmode.vue'
import AppLightmode from './components/AppLightmode.vue'

export default {
  components: {
    AppNav,
    AppItem,
    AppDarkmode,
    AppLightmode
  },
  computed: {
    vuetree() {
      return this.$store.state.vuetree
    },
    selected() {
      const dark = this.$store.state.dark
      return dark ? 'AppDarkmode' : 'AppLightmode'
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
  max-width: 100vw;
  min-height: 100vh;
}

#app {
  width: 100vw;
  min-height: 100vh;
}

main {
  width: 900px;
  margin: 0 auto;
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

