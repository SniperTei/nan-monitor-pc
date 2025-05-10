<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <h1>木南监控平台</h1>
        <p class="subtitle">专业的设备监控管理系统</p>
      </div>
      <div class="login-box">
        <h2>账号登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-item">
            <input 
              v-model="formData.username" 
              type="text" 
              placeholder="请输入用户名"
              required
            >
          </div>
          
          <div class="form-item">
            <input 
              v-model="formData.password" 
              type="password" 
              placeholder="请输入密码"
              required
            >
          </div>
          
          <button type="submit">登录</button>
          <p class="register-link">
            没有账号？<router-link to="/register">去注册</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup name="UserLoginPage">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userApi } from '@/api/user'

const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const res = await userApi.login(formData.value)
    // 登录成功
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    // 错误提示已经在请求拦截器中处理，这里不需要重复提示
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

.form-item {
  margin-bottom: 20px;
}

.form-item input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-item input:focus {
  border-color: #409eff;
  outline: none;
}

.form-item input::placeholder {
  color: #909399;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #66b1ff;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #606266;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  color: #66b1ff;
}
</style>
