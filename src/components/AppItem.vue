<template>
  <div class="block">

    <div @click="toggleOpened(unit.name)">
        {{ unit.name }}
      <button v-if="isFolder">{{ arrOpen ? '-' : '+' }}</button>
    </div>
    
    <app-arrow v-if="isFolder" />

    <section v-show="arrOpen" v-if="isFolder">
      
      <app-item
        class="item"
        v-for="(unit, index) in unit.children"
        :key="unit.name"
        :unit="unit"
      >
      </app-item>
  
    </section>

  </div>
</template>

<script>
import AppArrow from './AppArrow.vue'

export default {
  name: 'app-item',
  components: {
    AppArrow
  },
  props: {
    unit: Object
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggleOpened(name) {
      this.$store.commit('toggleOpened', name)
    }
  },
  computed: {
    opened() {
      return this.$store.state.opened
    },
    arrOpen() {
      return this.opened.find(el => el === this.unit.name)
    },
    isFolder() {
      return this.unit.children && this.unit.children.length
    }
  }
}
</script>

<style lang="scss">
section {
  transform: translateX(100px);
}

.block {
  position: relative;
  display: block;
  background: #414288;
  padding: 8px 12px;
  border-radius: 8px;
  border: solid #3b0837;
  margin: 5px 0;
  width: 100px;
  color: white;
  transition: 0.5s all ease;
  button {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    cursor: pointer;
    border: none;
  }
  .block {
    width: 200px;
    color: #3b0837;
    background: #5fb49c;
    .block {
      button {
        background: rgba(0, 0, 0, 0.2);
      }
      border: solid #682d63;
      width: 300px;
      background: #98dfaf;
      .block {
        background: #b7e4a4;
        .block {
          background: #e0ebc8;
          .block {
            background: #edf1e4;
            .block {
              background: #fff;
            }
          }
        }
      }
    }
  }
}

button {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  cursor: pointer;
  border: none;
}
</style>