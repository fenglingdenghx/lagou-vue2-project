<template>
  <div class="role-create-or-edit">
    <el-form :model="form" ref="form">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="角色名称"></el-input>
      </el-form-item>
       <el-form-item label="角色编码">
        <el-input v-model="form.code" placeholder="角色名称"></el-input>
      </el-form-item>
       <el-form-item label="角色描述">
        <el-input type="textarea" v-model="form.description" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button @click="onSubmit" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// services
import { createOrUpdate } from '@/services/role'
export default Vue.extend({
  name: 'RoleCreateOrEdit',
  props: {
    roleId: {
      type: [Object, Number, String]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {

    }
  },
  methods: {
    async  onSubmit () {
      await createOrUpdate(this.form)
      this.$emit('success')
    }
  }
})
</script>
<style scoped lang=''>
</style>
