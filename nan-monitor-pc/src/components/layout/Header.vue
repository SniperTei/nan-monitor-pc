<template>
  <div class="header-container">
    <div class="header-right">
      <el-dropdown>
        <span class="user-info">
          {{ userStore.displayName }} <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup name="AppHeader">
import { useRouter } from 'vue-router'
import { CaretBottom } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.clearUser()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.header-container {
  height: 60px;
  background: white;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #606266;
  gap: 4px;
}
</style> 