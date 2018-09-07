<template>
  <div @click="toggleMode">
    <transition name="flip" mode="out-in">
      <div class="tgl-btn" v-if="!dark">Light</div>
      <div class="tgl-btn" v-else>Dark</div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMode() {
      this.$store.commit('toggleDark')
    }
  },
  computed: {
    dark() {
      return this.$store.state.dark
    }
  }
}
</script>

<style lang="scss" scoped>
.tgl-btn {
  padding: 2px;
  perspective: 100px;
  display: inline-block;
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
  //transform: rotateY(180deg);
}

.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(0) translateZ(0);
  opacity: 0;
}

// &:checked + .tgl-btn {
//   &:before {
//     transform: rotateY(180deg);
//   }

//   &:after {
//     transform: rotateY(0);
//     right: 0;
//   }

//   &:active:after {
//     transform: rotateY(20deg);
//   }
// }
</style>