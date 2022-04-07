<!--
 * @Description: 登录页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 11:49:36
-->
<template>
  <div class="login-wrapper vh-flex-center">
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginForm.userAccount"
        name="userAccount"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { getToken, login } from '@api/modules/user'
// import { Loading } from "vant"
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginForm: {
        // openId: this.$store.state.user.openId || 'xiejiewei',
        userAccount: '2516',
        password: 'Hrp@123'
      },
      dataList: []
    }
  },
  created() {
    // this.getToken()
  },
  methods: {
    async getToken() {
      // const res = await getToken()
      // console.log(res)
      // const res2 = await login({ code: res, userAccount: '2516', password: 'Hrp@123' })
    },
    // 登录绑定
    async loginFn() {
      try {
        // 开启loading
        const data = await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push({ path: '/' })
        this.dataList = data || []
      } catch {
        // 清除loading
      }
    },
    onSubmit(values) {
      console.log('submit', values)
      this.loginFn()
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
}
</style>
