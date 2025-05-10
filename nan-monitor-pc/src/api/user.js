import request from '@/utils/request'

export const userApi = {
  /**
   * 用户注册
   * @param {Object} data - 注册数据
   * @param {boolean} showError - 是否显示错误提示
   */
  register(data, showError = true) {
    return request({
      url: '/user/register',
      method: 'post',
      data,
      showError
    })
  },

  /**
   * 用户登录
   * @param {Object} data - 登录数据
   * @param {boolean} showError - 是否显示错误提示
   */
  login(data, showError = true) {
    return request({
      url: '/user/login',
      method: 'post',
      data,
      showError
    })
  },

  /**
   * 获取用户信息
   * @param {boolean} showError - 是否显示错误提示
   */
  getProfile(showError = true) {
    return request({
      url: '/user/profile',
      method: 'get',
      showError
    })
  },

  /**
   * 更新用户信息
   * @param {Object} data - 用户信息
   * @param {boolean} showError - 是否显示错误提示
   */
  updateProfile(data, showError = true) {
    return request({
      url: '/user/profile',
      method: 'put',
      data,
      showError
    })
  }
} 