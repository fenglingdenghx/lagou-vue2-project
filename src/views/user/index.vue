<template>
  <div class="user">
    <el-card class="box-card">
      <el-form slot="header"  :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-time-picker
            @change="changeTime"
            is-range
            v-model="form.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="handelReset">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
        <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button type="primary">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="changePageNum"
        background
        layout="prev, pager, next"
        :page-size="form.pageSize"
        :current-page="form.currentPage"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// services
import { getUsers } from '@/services/user'
export default Vue.extend({
  name: 'User',
  data () {
    return {
      total: 0,
      form: {
        phone: '',
        time: [],
        pageSize: 10,
        currentPage: 1,
        startCreateTime: '',
        endCreateTime: ''
      },
      users: []
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    changePageNum (current:number) {
      this.form.currentPage = current
      this.loadUsers()
    },
    changeTime (val:any) {
      if (val) {
        this.form.startCreateTime = val[0]
        this.form.endCreateTime = val[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }
    },
    async loadUsers () {
      const { data } = await getUsers(this.form)
      this.total = data.data.total
      this.users = data.data.records
      console.log(data)
    },
    handelReset () {
      this.form = {
        phone: '',
        time: [],
        pageSize: 10,
        currentPage: 1,
        startCreateTime: '',
        endCreateTime: ''
      }
      this.loadUsers()
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadUsers()
    }
  }
})
</script>
<style scoped lang='scss'>
</style>
