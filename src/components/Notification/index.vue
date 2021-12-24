<template>
  <transition name="notification" @after-leave="afterLeave" @after-enter="afterEnter">
    <!-- 弹窗容器 -->
    <div ref="container">
      <div class="notice-close"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onMounted, ref } from 'vue'
  import bus from './bus'
  import './index.less'

  const props = defineProps({
    autoClose: {
      type: Number,
      default: 3000
    }
  })

  // 容器实例
  const container = ref({
    offsetHight: 0
  })
  // 显示容器
  const visible = ref(false)
  // 容器高度
  const height = ref(0)
  // 弹窗位置
  const position = ref({
    x: 16,
    y: 16
  })
  // 当前notify id
  const id = ref('')

  const notifyStyle = computed(() => {
    return {
      top: `${position.value.x}px`,
      right: `${position.value.y}px`
    }
  })

  onMounted(() => {
    console.log('xx')
  })

  // 离开动画结束后
  const afterLeave = () => {
    // 发射信号给外部 通知关闭
    bus.$emit('closed', id.value)
  }

  // 进入动画结束后
  const afterEnter = () => {
    height.value = container.value.offsetHight
  }

  // 定时器
  const timer = ref<number | null>(null)
  // 清理定时器 (鼠标进入的时候)
  const clearTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
  }
  // 创建定时器（鼠标移开的时候）
  const createTimer = () => {
    if (props.autoClose) {
      timer.value = setTimeout(() => {
        visible.value = false
      })
    }
  }

  // 销毁
  const destroy = () => {
    visible.value = false
  }

  onMounted(() => {
    createTimer()
  })

  onBeforeMount(() => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
  })
</script>
