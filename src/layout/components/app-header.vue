<template>
  <div class="app-header">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
        shape="square"
        :size="50"
        :src="userinfo.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userinfo.userName}}</el-dropdown-item>
        <el-dropdown-item
        divided
        @click.native="handleLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
// services
import { getUserInfo } from '@/services/user'
// vue
import Vue from 'vue'
export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    handleLogout () {
      this.$store.commit('setUser', null)
      this.$router.push({
        name: 'login'
      })
    },
    async  loadUserInfo () {
      const res = await getUserInfo()
      this.userinfo = res.data.content
    }
  }
})
</script>
<style scoped lang='scss'>
.app-header{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
}
</style>
