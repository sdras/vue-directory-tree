<template>
  <div class="block">

    <div @click="toggleOpened(unit.name)">
        {{ unit.name }}
      <button v-if="isFolder">{{ arrOpen ? '-' : '+' }}</button>
      <button 
        v-if="comments[unit.path]" 
        class="info" 
        @mouseenter="noteShowing = true" 
        @mouseleave="noteShowing = false"
      >
        info
      </button>
    </div>
    
    <app-arrow v-if="isFolder" />
    <div v-if="noteShowing">
      <app-note :comments="comments" :path="unit.path"/>
    </div>

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
import { mapState } from 'vuex'
import AppArrow from './AppArrow.vue'
import AppNote from './AppNote.vue'

export default {
  name: 'app-item',
  components: {
    AppArrow,
    AppNote
  },
  props: {
    unit: Object
  },
  data() {
    return {
      open: false,
      noteShowing: false
    }
  },
  methods: {
    toggleOpened(name) {
      this.$store.commit('toggleOpened', name)
    }
  },
  computed: {
    ...mapState(['opened', 'comments']),
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
  transform: translateX(70px);
}

.block {
  position: relative;
  display: block;
  background: #414288;
  padding: 4px 10px;
  border-radius: 8px;
  border: solid #3b0837;
  margin: 5px 0;
  width: 75px;
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

.block button.info,
.block .block button.info {
  position: absolute;
  right: 10px;
  background: #bd1369;
  padding: 3px 8px;
  font-size: 12px;
  color: white;
  margin-top: -2px;
  letter-spacing: 0.05em;
}
</style>