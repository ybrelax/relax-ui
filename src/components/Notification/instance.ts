import { ComponentPublicInstance, createApp } from 'vue'
import Notice from './index.vue'
import bus from './bus'

interface InstanceType extends ComponentPublicInstance {
  id: string
  visible: boolean
  unmount: () => void
  height: number
  position: {
    x: number
    y: number
  }
}

// interface NotificationType {}
let instances = [] as InstanceType[] // 实例数组 可以创建多个
let seed = 1

const NotificationInstance = (options: unknown) => {
  // 创建父容器
  const id = `notice_${seed++}`
  // 创建通知容器组件
  const root = document.createElement('div')
  root.setAttribute('data-id', id)
  //  挂载到根节点
  document.body.append(root)

  // 创建实例对象
  const app = createApp(Notice, options as Record<string, unknown>)
  // 将实例对象挂载到根节点
  const instance = app.mount(root) as InstanceType
  // 创建唯一标识
  instance.id = id
  instance.visible = true

  instances.push(instance)

  // 高度重制
  let verticalOffset = 0
  instances.forEach((item) => {
    verticalOffset = item.$el.offsetHeight
  })
  // 加上每个之间的间隔
  verticalOffset += 16

  // y轴方向的长度
  instance.position.y = verticalOffset

  // 监听notice传来的关闭时间
  bus.$on('closed', (id: string) => {
    // 确保关闭对应的id
    if (instance.id === id) {
      remoteInstance(instance)
      document.body.removeChild(root)
      instance.unmount()
    }
  })

  return instance
}

// 删除实例
const remoteInstance = (instance: InstanceType) => {
  if (!instance) return

  // 从实例列表中进行删除
  const length = instances.length
  const index = instances.findIndex((item) => item.id === instance.id)
  instances.splice(index, 1)

  if (length <= 1) return

  // 重新获取每个实例的高度
  const height = instance.height
  for (let i = index; i < length - 1; i++) {
    instances[i].position.y = instances[i].position.y - height - 16
  }
}

export default NotificationInstance
