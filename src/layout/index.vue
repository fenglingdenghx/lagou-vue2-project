<template>
  <el-container>
    <el-aside width="200px">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
</el-container>

</template>
<script lang="ts">
// components
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
// vue
import Vue from 'vue'
export default Vue.extend({
  components: {
    AppAside,
    AppHeader
  },
  name: 'Layout'
})
</script>
<style scoped lang='scss'>
.el-container{
  min-height: 100vh;
  .el-aside{
    background-color: #d3dce6;
  }
  .el-header{
    background-color: #fff;
  }
  .el-main{
    background-color: #e9eef3;
  }
}

</style>
