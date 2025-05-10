import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref('')

  // 设置用户信息
  const setUserInfo = (info) => {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  // 设置token
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 获取显示名称
  const displayName = computed(() => {
    if (!userInfo.value) return ''
    return userInfo.value.nickname || userInfo.value.username || ''
  })

  // 清除用户信息
  const clearUser = () => {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
  }

  // 初始化用户信息
  const initUserInfo = () => {
    const storedUser = localStorage.getItem('userInfo')
    const storedToken = localStorage.getItem('token')
    if (storedUser) userInfo.value = JSON.parse(storedUser)
    if (storedToken) token.value = storedToken
  }

  return {
    userInfo,
    token,
    setUserInfo,
    setToken,
    displayName,
    clearUser,
    initUserInfo
  }
}) 