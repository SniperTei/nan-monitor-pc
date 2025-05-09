import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('@/views/user/Login.vue')
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
