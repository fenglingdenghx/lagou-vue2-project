<template>
  <div class="resource">
    <resource-list />
  </div>
</template>
<script lang="ts">
// vue
import Vue from 'vue'
// components
import ResourceList from './components/List.vue'
export default Vue.extend({
  name: 'Resource',
  components: {
    ResourceList
  }
})
</script>
<style scoped lang='scss'>
</style>
