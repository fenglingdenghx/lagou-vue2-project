<template>
  <div class="menu-create">
    <create-or-edit />
  </div>
</template>
<script lang="ts">
// vue
import Vue from 'vue'
// components
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  data () {
    return {
    }
  }
})
</script>
<style scoped lang='less'>
</style>
