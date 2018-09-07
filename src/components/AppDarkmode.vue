<template>
  <div class="dark">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#app {
  background: #222;
  color: white;
}
</style>

<style lang="scss">
$black: #000;
$dkblack: #222;
$ltblack: #333;

.dark {
  nav {
    border-bottom: 1px solid $ltblack;
    background: $black;
    color: white;
  }

  .icons svg path {
    fill: white;
  }

  .block {
    background-color: $black;
    border: 1px solid $dkblack;
    border-bottom-color: $ltblack;
    button {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid $ltblack;
      &:focus {
        outline: 1px dashed $ltblack;
      }
    }
  }
}
</style>
