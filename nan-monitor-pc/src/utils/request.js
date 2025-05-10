import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 如果响应码不是000000，且需要显示错误提示
    if (res.code !== '000000' && response.config.showError !== false) {
      ElMessage.error(res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
    
    return res
  },
  error => {
    // 如果配置要求显示错误提示
    if (error.config?.showError !== false) {
      ElMessage.error(error.response?.data?.msg || '请求失败，请稍后重试')
    }
    return Promise.reject(error)
  }
)

/**
 * 封装请求方法
 * @param {Object} options - 请求配置项
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法
 * @param {Object} options.data - 请求数据（POST）
 * @param {Object} options.params - 请求参数（GET）
 * @param {boolean} options.showError - 是否显示错误提示，默认true
 * @returns {Promise}
 */
const request = (options) => {
  return service({
    ...options,
    showError: options.showError !== false // 默认显示错误提示
  })
}

// 导出请求方法
export default request 