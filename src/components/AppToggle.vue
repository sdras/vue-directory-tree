<template>
  <div>
    <input class="tgl tgl-flip" id="cb5" type="checkbox"/>
    <label 
      @click="toggleMode"
      for="cb5" 
      class="tgl-btn" 
      data-tg-off="Light" 
      data-tg-on="Dark" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      bool: true
    }
  },
  methods: {
    toggleMode() {
      this.$store.commit('toggleDark')
    }
  }
}
</script>

<style lang="scss" scoped>
//visually hidden, still accessible checkbox
.tgl {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}

.tgl-flip {
  + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    perspective: 100px;
    &:after,
    &:before {
      display: inline-block;
      transition: all 0.3s ease;
      width: 60px;
      text-align: center;
      line-height: 1.75em;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      cursor: pointer;
      backface-visibility: hidden;
      border-radius: 4px;
    }

    &:after {
      content: attr(data-tg-on);
      transform: rotateY(-180deg);
    }

    &:before {
      content: attr(data-tg-off);
    }

    &:active:before {
      transform: rotateY(-20deg);
    }
  }

  &:checked + .tgl-btn {
    &:before {
      transform: rotateY(180deg);
    }

    &:after {
      transform: rotateY(0);
      right: 0;
    }

    &:active:after {
      transform: rotateY(20deg);
    }
  }
}
</style>