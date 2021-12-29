import { App } from 'vue'
import Notice from "./index.vue";
import instance from './instance'

export default (app: App<Element>) => {
  app.component(Notice.name, Notice)
  app.config.globalProperties.$notice = instance
}
