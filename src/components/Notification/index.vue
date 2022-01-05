<template>
  <transition name="notification" @after-leave="afterLeave" @after-enter="afterEnter">
    <!-- 弹窗容器 -->
    <div
      ref="container"
      class="notice-container"
      :style="noticeStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="clearTimer"
    >
      <!-- icon -->
      <template v-if="type && type != 'custom' && type != 'img'">
        <div v-if="type === 'success'">1</div>
        <div v-if="type === 'warning'"></div>
        <div v-if="type === 'error'"></div>
        <div v-if="type === 'info'"></div>
      </template>
      <div v-if="type === 'custom'"></div>

      <!-- content -->
      <div class="notice-content">
        <!-- head -->
        <div class="notice-head">
          <span class="notice-title">{{ title }}</span>
        </div>
        <!-- body -->
        <div class="notice-body" v-if="message" v-html="message" />
        <!-- operate -->
        <a class="notice-button-confirm" />
      </div>
      <!-- 关闭 -->
      <div class="notice-close"> close </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
  import bus from './bus'
  import './index.less'

  const props = defineProps({
    title: String,
    message: String,
    closeIcon: {
      type: Boolean,
      default: true
    },
    autoClose: {
      type: Number,
      default: 3000
    },
    type: {
      type: String,
      validatar: (val: string) => {
        return ['success', 'warning', 'info', 'error', 'custom'].includes(val)
      }
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
  const position = reactive({
    x: 16,
    y: 16
  })
  // 当前notify id
  const id = ref('')

  const noticeStyle = computed(() => {
    return {
      top: `${position.x}px`,
      right: `${position.y}px`
    }
  })

  onMounted(() => {
    createTimer()
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
      }, props.autoClose)
    }
  }

  // 销毁
  const destroy = () => {
    visible.value = false
  }

  onBeforeMount(() => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
  })

  // 暴露给外层组件
  defineExpose({
    position,
    visible
  })
</script>
