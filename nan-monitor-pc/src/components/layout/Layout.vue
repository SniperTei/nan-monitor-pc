<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header height="60px">
        <Header />
      </el-header>
      <el-main>
        <Content />
      </el-main>
      <el-footer height="50px">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup name="MainLayoutPage">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
  overflow: hidden;
}

.el-main {
  padding: 0;
  background-color: #f0f2f5;
}
</style> 