<template>
  <div id="app">
    <app-item
      class="item"
      :unit="vuetree">
    </app-item>
  </div>
</template>

<script>
import AppItem from './components/AppItem.vue'

export default {
  components: {
    AppItem
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
}
</style>
