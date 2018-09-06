<template>
  <nav>
    <div class="navcontain">
      <img alt="Vue logo" src="./../assets/logo.png" width="40" height="40" />
      <span>Vue Directory Structure</span>

      <div class="icons"></div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid #ccc;
  background: white;
  margin: 0 0 20px;
  height: 70px;
}

.navcontain {
  width: 900px;
  margin: 0 auto;
  padding: 16px;
  span {
    display: inline-block;
    vertical-align: top;
    margin: 10px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>