import axios from 'axios'

const baseURL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL,
  timeout: 5000
})

export const userApi = {
  // 用户注册
  register(data) {
    return api.post('/user/register', data)
  },

  // 用户登录
  login(data) {
    return api.post('/user/login', data)
  },

  // 获取用户信息
  getProfile() {
    return api.get('/user/profile')
  }
}

// 请求拦截器 - 添加token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 - 统一错误处理
api.interceptors.response.use(
  response => response.data,
  error => {
    const { response } = error
    if (response?.data?.msg) {
      // 这里可以集成您的消息提示组件
      console.error(response.data.msg)
    }
    return Promise.reject(error)
  }
) 