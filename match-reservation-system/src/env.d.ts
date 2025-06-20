/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 添加 crypto 兼容性声明
interface Window {
  crypto?: Crypto
}

// 防止 crypto 被意外修改
if (window.crypto) {
  Object.defineProperty(window, 'crypto', {
    configurable: false,
    writable: false
  })
}

declare module 'crypto-browserify'
declare module 'stream-browserify'

declare module 'element-plus/dist/locale/zh-cn.mjs'

declare module 'pinia-plugin-persistedstate' {
  import { PiniaPlugin } from 'pinia'
  const piniaPluginPersistedstate: PiniaPlugin
  export default piniaPluginPersistedstate
} 