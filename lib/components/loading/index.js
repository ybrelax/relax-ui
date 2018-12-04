import Vue from "vue"

import loading from './loading.vue'
const loadingExtend = Vue.extend(loading);
let instance;

export default {
    show(options = {}) {
        if (!instance) {
            instance = new loadingExtend({
                el: document.createElement('div')
            })
        }
        if (instance.visible) return;
        instance.text = options.text ? options.text : '';
        instance.Type = options.type || 'circle';
        document.body.appendChild(instance.$el);

        Vue.nextTick(() => {
            instance.visible = true;
        })

    },

    hide() {
        if (instance) {
            instance.visible = false;
        }
    }
}