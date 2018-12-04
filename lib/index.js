import Popup from './components/popup/popup.vue'
import loading from './components/loading';

const install = function(Vue, options) {

    Vue.mixin({ // 通过全局 mixin方法添加一些组件选项
        created() {}
    })

    // 注册弹出框组件
    Vue.component(Popup.name, Popup);

    Vue.$loading = Vue.prototype.$loading = loading;
}

export default {
    install
}