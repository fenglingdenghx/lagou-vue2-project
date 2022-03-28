<template>
  <div class="alloc-resource">
    <el-card class="alloc-menu-card">
      <el-tree
        node-key="id"
        ref="menu-tree"
        :default-checked-keys="checked"
        show-checkbox
        :data="resources"
        default-expand-all
        :props="defaultProps"
      ></el-tree>
      <div>
        <el-button @click="$router.back()">返回</el-button>
        <el-button @click="onSave" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// services
import { getAllResources } from '@/services/resource'
export default Vue.extend({
  name: 'AllRoleResource',
  props: {
    roleId: {
      required: true,
      type: [String, Number]
    }
  },
  data () {
    return {
      checked: [],
      resources: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      const { data } = await getAllResources()
      console.log(data)
    },
    onSave () {
      console.log('save')
    }
  }
})
</script>
<style scoped lang=''>
</style>
