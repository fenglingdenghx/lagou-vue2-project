<template>
  <div class="role">
    <role-list />
  </div>
</template>
<script lang="ts">
// vue
import Vue from 'vue'
// components
import RoleList from './components/List.vue'
export default Vue.extend({
  name: 'Role',
  components: {
    RoleList
  }
})
</script>
<style scoped lang='scss'>
</style>
