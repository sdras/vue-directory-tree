<template>
  <div>
    <input class="tgl tgl-flip" id="cb5" type="checkbox"/>
    <label 
      for="cb5" 
      class="tgl-btn" 
      data-tg-off="Nope" 
      data-tg-on="Yeah!" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'light'
    }
  }
}
</script>

<style lang="scss" scoped>
.tgl-flip {
  + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
    &:after,
    &:before {
      display: inline-block;
      transition: all 0.4s ease;
      width: 100%;
      text-align: center;
      position: absolute;
      line-height: 2em;
      font-weight: bold;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      border-radius: 4px;
    }

    &:after {
      content: attr(data-tg-on);
      background: #02c66f;
      transform: rotateY(-180deg);
    }

    &:before {
      background: #ff3a19;
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
      left: 0;
      background: #7fc6a6;
    }

    &:active:after {
      transform: rotateY(20deg);
    }
  }
}
</style>