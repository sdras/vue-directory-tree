<template>
  <div id="app">
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
body {
  font-family: monospace;
  background: #682d63;
  display: flex;
  font-size: 15px;
}
</style>
