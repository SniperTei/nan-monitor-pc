<template>
  <div class="register-container">
    <h2>用户注册</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-item">
        <label>用户名</label>
        <input 
          v-model="formData.username" 
          type="text" 
          placeholder="请输入3-20个字符的用户名"
          required
        >
      </div>
      
      <div class="form-item">
        <label>密码</label>
        <input 
          v-model="formData.password" 
          type="password" 
          placeholder="请输入至少6个字符的密码"
          required
        >
      </div>
      
      <div class="form-item">
        <label>邮箱</label>
        <input 
          v-model="formData.email" 
          type="email" 
          placeholder="请输入邮箱"
        >
      </div>
      
      <div class="form-item">
        <label>昵称</label>
        <input 
          v-model="formData.nickname" 
          type="text" 
          placeholder="请输入昵称"
        >
      </div>
      
      <button type="submit">注册</button>
      <p class="login-link">
        已有账号？<router-link to="/login">去登录</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/user'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  email: '',
  nickname: ''
})

const handleRegister = async () => {
  try {
    const res = await userApi.register(formData.value)
    if (res.code === '000000') {
      alert('注册成功')
      router.push('/login')
    }
  } catch (error) {
    console.error('注册失败:', error)
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
}

.form-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}
</style> 