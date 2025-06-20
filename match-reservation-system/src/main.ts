import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'tailwindcss/tailwind.css'
import './assets/styles/global.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建应用实例
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

try {
  // 添加持久化插件
  pinia.use(piniaPluginPersistedstate)

  // 配置应用
  app.use(pinia)  // 先使用 Pinia
     .use(router)  // 再使用路由
     .use(ElementPlus)

  // 全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('全局错误处理:', err)
    console.error('错误组件:', instance)
    console.error('错误信息:', info)
  }

  // 挂载应用
  app.mount('#app')
} catch (error) {
  console.error('应用初始化错误:', error)
} 