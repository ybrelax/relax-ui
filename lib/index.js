import Popup from './components/popup/popup.vue'

export default {
    install(Vue, options) {
        Vue.mixin({ // 通过全局 mixin方法添加一些组件选项
            created() {}
        })

        Vue.component(Popup.name, Popup)
    }

}