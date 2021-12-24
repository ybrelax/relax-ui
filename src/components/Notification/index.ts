import { App } from 'vue'
import instance from './instance'

export default (app: App<Element>) => {
  // app.component(N)
  app.config.globalProperties.$notice = instance
}
