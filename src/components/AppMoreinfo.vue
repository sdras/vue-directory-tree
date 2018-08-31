<template>
  <div class="more-info-contain">
    <a href="" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="more-info" aria-labelledby="title" role="presentation" @mouseenter="show = !show" @mouseleave="show = !show">
        <title id="title">Question Mark Icon</title>
        <g class="questionpath">
          <path d="M87,8a5,5,0,0,1,5,5V87a5,5,0,0,1-5,5H13a5,5,0,0,1-5-5V13a5,5,0,0,1,5-5H87m0-3H13a8,8,0,0,0-8,8V87a8,8,0,0,0,8,8H87a8,8,0,0,0,8-8V13a8,8,0,0,0-8-8Z"></path>
          <path d="M46.12,60.18v-4.1c0-6.34.37-7.24,5.15-12.16,3.81-3.88,4.85-5.67,4.85-8.36,0-3.51-2.31-5.6-6.19-5.6-4.4,0-6.72,2.24-7.16,7.16H38.13C38.51,29.21,42.76,25,50.37,25c7.09,0,11.49,4,11.49,10.52,0,4-1.27,6.19-6.34,11.19-4,4-4.25,4.7-4.25,10.82v2.61Zm6.79,10.6a4.29,4.29,0,1,1-4.25-4.33A4.32,4.32,0,0,1,52.91,70.78Z"></path>
          <rect x="5" y="5" width="90" height="90" rx="5" ry="5" fill="rgba(0, 0, 0, 0)" />
        </g>
      </svg>
      <transition name="appear">
        <div class="findoutmore" v-if="show">
          <h2>What is this?</h2>
          <p>Often when we're excited about contributing to a project, it takes a little while to understand the codebase even before we get started. It's estimated that developers spend 70% of their time reading code and only 30% writing. This project documents how Vue.js is set up with special notes taken from a Vue core meeting with Evan You to guide people through the directory structure and give context to how and why things are set up the way that they are so that they can get set up to contribute as soon as possible.</p>
        </div>
      </transition>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.findoutmore {
  color: white;
  position: absolute;
  top: 5px;
  right: 40px;
  width: 300px;
  height: 50px;
  z-index: 4000;
  text-align: right;
}

@media (max-width: 800px) {
  .findoutmore {
    display: none;
  }
}

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.25s ease;
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
}

.more-info-contain {
  position: absolute;
  top: 40px;
  right: 40px;
}

.more-info {
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.questionpath {
  fill: #d1d3d4;
  opacity: 0.6;
  transition: 0.25s all ease;
}

.questionpath:hover {
  opacity: 1;
}
</style>