import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/Register.vue')
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout.vue'),
    redirect: '/logs',
    children: [
      {
        path: 'logs',
        name: 'LogsManagement',
        component: () => import('@/views/logs/Logs.vue'),
        meta: { title: '日志管理' }
      },
      {
        path: 'crashes',
        name: 'CrashDetails',
        component: () => import('@/views/crash/Crash.vue'),
        meta: { title: '崩溃详情' }
      },
      {
        path: 'performance',
        name: 'PerformanceMonitor',
        component: () => import('@/views/performance/Performance.vue'),
        meta: { title: '性能监控' }
      },
      {
        path: 'tracking',
        name: 'TrackingView',
        component: () => import('@/views/track/Tracking.vue'),
        meta: { title: '埋点查看' }
      },
      {
        path: 'test/upload',
        name: 'TestUpload',
        component: () => import('@/views/test/TestUpload.vue'),
        meta: { 
          title: '文件上传测试',
          requiresAuth: true  // 需要登录才能访问
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
