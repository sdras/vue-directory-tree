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
  left: calc(100% + 10px);
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  width: 300px;
  top: -6px;
  line-height: 1.4em;
  z-index: 1000;
  border-radius: 4px;
  margin: 5px 0;
  transition: 0.5s all ease;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  padding: 2px 20px;
}
</style>