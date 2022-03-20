<template>
  <div class="login">
    <el-form
    class="login-form"
    label-position="top"
    ref="form"
    :model="form"
    label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      }
    }
  },
  methods: {
    onSubmit ():void {
      console.log(1)
    }
  }
})
</script>
<style scoped lang='scss'>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form{
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
