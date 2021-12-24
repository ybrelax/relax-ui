import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import Notification from './components/Notification'

app.use(Notification).mount('#app')
