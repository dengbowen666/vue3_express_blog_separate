import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入pinia持久化插件

// 先读取本地的数据，如果新的请求获取到新数据，会自动把新数据覆盖掉旧的数据。
// 无需额外处理，插件会自己更新到最新数据。
if (
  window.location.href.includes("#/") &&
  !window.location.href.includes("?")
) {
  // 获取当前 URL
  const newUrl = window.location.href.replace("#/", "?#/");

  // 进行重定向
  window.location.href = newUrl;
}
// 为解决，之前没有问号，路由跳转失败加上问号后，再次跳转才成功，于是我在一开始就加上问号




import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia)
app.use(router)
app.mount('#app')
    
