<template> 
  <transition name = "yab-loading">
    <div class = "yab-loading" v-show = "visible">
      <div class = "yab-loading-wrapper"> 

        <div class = "yab-loading-type"> </div>

        <p class = "yab-loading-text"> {{text}} </p> 

      </div>

      <div class = "yab-loading-cover" @touchmove.stop.prevent> </div>

    </div>
  </transition>

</template>

<script>

  export default {
    name: 'loading',
    props: {
      visible: false,
      text: {
        type: String,
        default: '正在加载'
      }
    }
  }
</script>

<style>

  .yab-loading-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 20px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
  }
  .yab-loading-type {
    height: 32px;
    width: 32px;
    margin: auto;
    margin-bottom: 10px;
    border: 3px solid transparent;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    border-radius: 50%;
    -webkit-animation:yab-loading-router .8s linear linear;
    animation: yab-loading-router .8s linear infinite;
  }

  .yab-loading-text {
    color: #fff;
  }

  @keyframes yab-loading-router {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes yab-loading-router {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  .yab-loading-cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    opacity: 0;
  }

  .yab-loading-enter-active, .yab-loading-leave-active{
    transition: opacity .5s;
  }
  .yab-loading-leave-to, .yab-loading-enter {
    opacity: 0;
  }

</style>