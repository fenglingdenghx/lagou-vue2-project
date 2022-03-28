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
      <el-button @click="handleAdd">添加角色</el-button>
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
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
    <role-create-or-edit
      v-if="dialogVisible"
      :is-edit="isEdit"
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
      roleId: '',
      isEdit: false
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
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit (item:any) {
      this.isEdit = true
      this.dialogVisible = true
      this.roleId = item.id
    },
    async  handleDelete (item:any) {
      await deleteRole(item.id)
      this.loadRoleAll()
    },
    handleMenu (item:any) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: item.id
        }
      })
    },
    handleResource (item:any) {
      this.$router.push({
        name: 'alloc-resource',
        params: {
          roleId: item.id
        }
      })
    }
  }
})
</script>
<style scoped lang=''>
</style>
