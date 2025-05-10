import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user'

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 初始化用户信息
const userStore = useUserStore()
userStore.initUserInfo()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册路由
app.use(router)

// 注册 Element Plus
app.use(ElementPlus)

// 挂载应用
app.mount('#app')
