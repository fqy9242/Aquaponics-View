// main.js 或者 main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import "echarts-wordcloud";

import '@/assets/global.css'
import App from './App.vue'
import router from './router'
import '@/assets/fonts.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')