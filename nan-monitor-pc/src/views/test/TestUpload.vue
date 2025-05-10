<template>
  <div class="upload-test-container">
    <el-card class="upload-card">
      <template #header>
        <div class="card-header">
          <h3>文件上传测试</h3>
        </div>
      </template>
      <el-upload
        class="upload-demo"
        :http-request="customUpload"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :limit="9"
        multiple
        :accept="acceptFileTypes"
        :on-exceed="handleExceed"
        :on-progress="handleProgress"
      >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            <p>支持的文件类型：图片、音频、视频、文档</p>
            <p>单个文件大小限制：{{ maxFileSize }}MB，最多上传9个文件</p>
          </div>
        </template>
      </el-upload>

      <div v-if="fileList.length" class="file-info">
        <h4>上传结果：</h4>
        <el-table :data="fileList" style="width: 100%">
          <el-table-column prop="originalName" label="原始文件名" />
          <el-table-column prop="type" label="文件类型">
            <template #default="scope">
              <el-tag :type="getFileTypeTag(scope.row.type)">
                {{ scope.row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="size" label="文件大小">
            <template #default="scope">
              {{ formatFileSize(scope.row.size) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-link type="primary" :href="scope.row.url" target="_blank">
                <el-icon><Download /></el-icon> 下载
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup name="TestUploadPage">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import { uploadApi } from '@/api/upload'

const fileList = ref([])

// 文件大小限制
const maxFileSize = import.meta.env.MODE === 'development' ? 5 : 10

// 支持的文件类型
const acceptFileTypes = '.png,.jpg,.jpeg,.gif,.webp,.mp3,.wav,.ogg,.mp4,.webm,.avi,.pdf,.doc,.docx'

// 自定义上传方法
const customUpload = async ({ file }) => {
  const formData = new FormData()
  formData.append('fileList', file)

  try {
    const res = await uploadApi.uploadFiles(formData, true, (progress) => {
      // 这里可以处理上传进度
      console.log('上传进度:', progress)
    })
    
    if (res.code === '000000') {
      fileList.value = [...fileList.value, ...res.data]
      ElMessage.success('文件上传成功')
    }
  } catch (error) {
    console.error('上传失败:', error)
    throw error // 让 el-upload 感知到错误
  }
}

// 处理超出文件数量限制
const handleExceed = () => {
  ElMessage.warning('最多只能上传9个文件')
}

// 处理上传进度
const handleProgress = (event, file) => {
  console.log('上传进度:', event.percent)
}

// 上传失败处理
const handleError = (error) => {
  const errorMsg = error.response?.data?.msg || '文件上传失败'
  ElMessage.error(errorMsg)
}

// 上传前的处理
const beforeUpload = (file) => {
  // 检查文件大小
  const isLtLimit = file.size / 1024 / 1024 < maxFileSize
  if (!isLtLimit) {
    ElMessage.error(`文件大小不能超过 ${maxFileSize}MB!`)
    return false
  }

  // 检查文件类型
  const extension = file.name.split('.').pop().toLowerCase()
  const allowedTypes = acceptFileTypes.split(',').map(type => type.replace('.', ''))
  if (!allowedTypes.includes(extension)) {
    ElMessage.error('不支持的文件类型！')
    return false
  }

  return true
}

// 格式化文件大小
const formatFileSize = (size) => {
  if (size < 1024) {
    return size + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  }
}

// 获取文件类型对应的标签类型
const getFileTypeTag = (type) => {
  const typeMap = {
    'image': 'success',
    'audio': 'warning',
    'video': 'danger',
    'document': 'info'
  }
  return typeMap[type] || ''
}
</script>

<style scoped>
.upload-test-container {
  padding: 20px;
}

.upload-card {
  background: white;
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: #303133;
}

.el-upload__tip {
  color: #909399;
  font-size: 13px;
  margin-top: 7px;
  line-height: 1.5;
}

.file-info {
  margin-top: 20px;
}

.file-info h4 {
  margin: 0 0 15px;
  color: #303133;
}

:deep(.el-table) {
  margin-top: 10px;
}

:deep(.el-link) {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
