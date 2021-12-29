<template>
  <button @click="showNotice">开启消息通知</button>
  <button @click="closeNotice">关闭消息通知</button>
</template>
<script setup lang="ts">
  import { getCurrentInstance } from 'vue'
  const instance = getCurrentInstance()
  let notice = null as any //

  // 显示
  const showNotice = () => {
    notice = instance
      ? instance.appContext.config.globalProperties.$notice({
          type: 'info',
          title: '标题',
          message: '这是一段信息'
        })
      : null
  }

  // 关闭
  const closeNotice = () => {
    notice && notice.close()
  }
</script>
