<template>
  <el-menu
    :default-active="route.path"
    router
    class="sidebar-menu"
    background-color="#304156"
    text-color="#fff"
  >
    <div class="logo">木南监控平台</div>
    <el-menu-item index="/logs">
      <el-icon><Document /></el-icon>
      <span>日志管理</span>
    </el-menu-item>
    <el-menu-item index="/crashes">
      <el-icon><Warning /></el-icon>
      <span>崩溃详情</span>
    </el-menu-item>
    <el-menu-item index="/performance">
      <el-icon><TrendCharts /></el-icon>
      <span>性能监控</span>
    </el-menu-item>
    <el-menu-item index="/tracking">
      <el-icon><DataLine /></el-icon>
      <span>埋点查看</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup name="Sidebar">
import { useRoute } from 'vue-router'
import {
  Document,
  Warning,
  TrendCharts,
  DataLine
} from '@element-plus/icons-vue'

const route = useRoute()
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  border-right: none;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
</style> 