// main.js 或者 main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import '@/assets/global.css'
import App from './App.vue'
import router from './router'
import '@/assets/fonts.css'
import DataV, { setClassNamePrefix } from "@dataview/datav-vue3";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(DataV, { classNamePrefix: "dv-" });
app.mount('#app')