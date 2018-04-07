<template>
  <div class="block">

    <div
      @click="isFolder? open = !open : ''"
    >
        {{ model.name }}
      <button v-if="isFolder">{{ open ? '-' : '+' }}</button>
    </div>
    
    <app-arrow v-if="isFolder" />

    <section v-show="open" v-if="isFolder">
      
      <app-item
        class="item"
        v-for="(model, index) in model.children"
        :key="model.name"
        :model="model"
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
    model: Object
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
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
    button {
      background: rgba(0, 0, 0, 0.2);
    }
    color: #3b0837;
    border: solid #682d63;
    background: #5fb49c;
    .block {
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