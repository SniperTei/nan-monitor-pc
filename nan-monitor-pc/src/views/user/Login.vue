<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <h1>木南监控平台</h1>
        <p class="subtitle">专业的设备监控管理系统</p>
      </div>
      <div class="login-box">
        <h2>账号登录</h2>
        <el-form 
          :model="loginForm" 
          :rules="rules" 
          ref="loginFormRef"
          size="large"
        >
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="UserIcon"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="LockIcon"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              @click="handleLogin" 
              style="width: 100%"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup name="UserLoginPage">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User as UserIcon, Lock as LockIcon } from '@element-plus/icons-vue'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  loading.value = true
  try {
    await loginFormRef.value.validate((valid) => {
      if (valid) {
        // 这里添加登录逻辑
        router.push('/')
      }
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
  overflow: hidden;
}

.login-content {
  display: flex;
  width: 1000px;
  height: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 8px 0 0 8px;
}

.login-left h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 18px;
  opacity: 0.8;
}

.login-box {
  width: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
  font-size: 28px;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-button) {
  height: 44px;
  font-size: 16px;
}
</style>
