<template>
  <div>
    <p v-html="note"></p>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    note() {
      return this.comments[this.path]
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  background: white;
  left: 200px;
  width: 450px;
  top: 31px;
  font-family: Helvetica, sans-serif;
  line-height: 1.4em;
  z-index: 5000;
  border-radius: 4px;
  padding: 4px 20px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.25);
}
</style>