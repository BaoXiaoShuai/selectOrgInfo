import { createApp } from 'vue'
import './main.scss'
import './tailwind.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// 虚拟列表
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
const pinia = createPinia()

app.use(VueVirtualScroller)
app.use(pinia)
app.mount('#app')
