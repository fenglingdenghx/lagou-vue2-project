<template>
  <div class="alloc-menu">
    <el-card class="alloc-menu-card">
      <el-tree
        node-key="id"
        ref="menu-tree"
        :default-checked-keys="checked"
        show-checkbox
        :data="menus"
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
// serivces
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'AllocRoleMenu',
  props: {
    roleId: {
      required: true,
      type: [String, Number]
    }
  },
  data () {
    return {
      menus: [],
      checked: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    getSelected (array:Array<any>) {
      const arr:Array<never> = []
      array.forEach(item => {
        if (item.subMenuList && item.subMenuList.length > 0) {
          this.getSelected(item.subMenuList)
        }
        if (item.selected) {
          arr.push(item.id as never)
        }
      })
      return arr
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.checked = this.getSelected(data.data)
      console.log(data)
    },
    async  loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$router.back()
    }
  }
})
</script>
<style scoped lang=''>
</style>
