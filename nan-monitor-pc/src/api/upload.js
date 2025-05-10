import request from '@/utils/request'

export const uploadApi = {
  /**
   * 上传文件
   * @param {FormData} data - 包含文件的FormData对象
   * @param {boolean} showError - 是否显示错误提示
   * @param {Function} onProgress - 上传进度回调函数
   */
  uploadFiles(data, showError = true, onProgress) {
    return request({
      url: 'v1/upload/files',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data,
      showError,
      onUploadProgress: onProgress ? (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total * 100) | 0
        onProgress(progress)
      } : undefined
    })
  }
}
