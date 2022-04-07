<!--
 * @Description: 登录页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:10:44
-->
<template>
  <div class="login-wrapper vh-flex-center">
    <van-form @submit="onSubmit">
      <van-field
        v-model="userAccount"
        name="userAccount"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
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
import { getToken } from '@api/modules/user'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      userAccount: '',
      password: ''
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    async getToken() {
      const res = await getToken()
      console.log(res)
      // const res2 = await login({ code: res, userAccount: '2516', password: 'Hrp@123' })
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
}
</style>
