<template>
  <div class="role-list">
    <el-card class="box-card">
      <el-form slot="header" :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="输入搜索">
          <el-input v-model="form.name" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible = true">添加角色</el-button>
      <el-table
        :data="roles"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleMenu(scope.row)"
            >分配菜单</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleResource(scope.row)"
            >分配资源</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
    >
    <role-create-or-edit
      :roleId="roleId"
      @cancel="dialogVisible = false"
      @success="onSuccess"
    />
  </el-dialog>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// services
import { getRoleAll, deleteRole } from '@/services/role'
// components
import RoleCreateOrEdit from './CreateOrEdit.vue'
interface TableItem {
  code:string
  createdBy:string
  createdTime: string
  description:string
  id: number
  name: string
  operatorId?: null
  updatedBy: string
  updatedTime: string
}
export default Vue.extend({
  name: 'RoleList',
  components: { RoleCreateOrEdit },
  data () {
    return {
      form: {
        name: ''
      },
      roles: [],
      dialogVisible: false,
      roleId: ''
    }
  },
  created () {
    this.loadRoleAll()
  },
  methods: {
    onSuccess () {
      this.dialogVisible = false
      this.loadRoleAll()
    },
    async loadRoleAll () {
      const { data } = await getRoleAll(this.form)
      this.roles = data.data.records
    },
    onSubmit () {
      this.loadRoleAll()
    },
    handleEdit (item:any) {
      this.dialogVisible = true
      this.roleId = item.id
      console.log('edit')
    },
    async  handleDelete (item:TableItem) {
      await deleteRole(item.id)
      this.loadRoleAll()
    },
    handleMenu (item:TableItem) {
      console.log('menu ')
    },
    handleResource (item:TableItem) {
      console.log('resource')
    }
  }
})
</script>
<style scoped lang=''>
</style>
