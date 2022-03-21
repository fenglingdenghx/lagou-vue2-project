<template>
  <div class="login">
    <el-form
    class="login-form"
    label-position="top"
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        @click="onSubmit"
        :loading="isLoginLoading"
      >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts ">
// vue
import Vue from 'vue'
// request
import request from '@/utils/request.ts'
// element type
import { Form } from 'element-ui'

// qs
import qs from 'qs'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      isLoginLoading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度6到18个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        // await (this.$refs.form as Form).validate()
        await this.$refs.form.validate()
        // 登录按钮 loading
        this.isLoginLoading = true
        try {
          // 2. 验证通过 -> 提交表单
          const { data } = await request({
            url: '/front/user/login',
            method: 'post',
            data: qs.stringify(this.form),
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
          // 3. 处理请求结果
          // 失败：给出提示
          if (data.state !== 1) {
            return this.$message.error(data.message)
          }
          // 成功：跳转至首页
          this.$message.success('登录成功')
          this.$router.push('/')
        } finally {
          this.isLoginLoading = false
        }
      } catch (err) {
        console.log('登录失败', err)
      }
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
