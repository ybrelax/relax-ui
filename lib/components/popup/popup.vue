<!-- 弹出组件 -->
<template>
  <div id="yabui-popup">

    <transition name="fade-pop">

      <div v-if="value" class="bottom">

        <slot></slot>

      </div>

    </transition>

    <!-- 遮盖层 -->
    <div v-show="value" class="popup-cover" @click="closePopup"> </div>

  </div>
</template>

<script>
  export default {
    name: 'yab-popup',

    props: {
      // 通过value获取绑定v-model值
      value: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isShowFlag: false,
        show: true
      }
    },
    watch: {
      value: function(val) {

        this.$emit('input', val);

      },
    },
    methods: {
      closePopup() {

        this.$emit('input', false);

      }

    }
  }
</script>

<style scoped>
  #yabui-popup>.bottom {
    position: fixed;
    bottom: 0;
    z-index: 2001;
    width: 100%;
    background: #fff;
    transition: .2s ease-out;
  }

  #yabui-popup>.popup-cover {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 2000;
    background: #000;
  }

  .fade-pop-enter-active,
  .fade-pop-leave-active {
    transform: translate3d(0, 100%, 0);
    transition: .2s ease-out;
  }

  .fade-pop-enter,
  .fade-pop-leave-to {
    opacity: 0;
  }
</style>
