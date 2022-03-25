<template>
  <div class="resource-list">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="formInline.name" placeholder="资源名称"></el-input>
        </el-form-item>
         <el-form-item label="资源路径" prop="url">
          <el-input v-model="formInline.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select clearable v-model="formInline.categoryId" placeholder="资源分类">
            <el-option
            v-for="category in categorys"
            :key="category.id"
            :label="category.name"
            :value="category.id"
            ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="onSubmit">查询</el-button>
          <el-button :disabled="loading"  @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
     <el-table
     v-loading="loading"
      :data="resources"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间">
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
     :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formInline.current"
      :page-sizes="pagesizes"
      :page-size="formInline.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// services
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      total: 0,
      pagesizes: [10, 15, 20, 25],
      formInline: {
        name: '',
        url: '',
        categoryId: null,
        size: 10,
        current: 1
      },
      resources: [],
      categorys: [],
      loading: false
    }
  },
  created () {
    this.loadResourceCategory()
    this.loadResources()
  },
  methods: {
    async  loadResourceCategory () {
      const { data } = await getResourceCategories()
      this.categorys = data.data
      console.log(data)
    },
    async  loadResources () {
      this.loading = true
      try {
        const { data } = await getResourcePages(this.formInline)
        if (data.code !== '000000') {
          return this.$message.error(data.mesg)
        }
        this.resources = data.data.records
        this.total = data.data.total
      } finally {
        this.loading = false
      }
    },
    handleDelete (item:any) {
      console.log(1)
    },
    handleEdit (item:any) {
      console.log(2)
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.formInline.current = 1
      this.loadResources()
    },
    onSubmit () {
      this.loadResources()
    },
    handleSizeChange (size:number) {
      this.formInline.current = 1
      this.formInline.size = size
      this.loadResources()
    },
    handleCurrentChange (num:number) {
      this.formInline.current = num
      this.loadResources()
    }
  }
})
</script>
<style scoped lang='less'>
</style>
