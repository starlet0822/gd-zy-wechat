<!--
 * @Description: 登录页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-26 14:12:27
-->
<template>
  <div class="login-wrapper vh-flex-center vh-flex-col">
    <main class="login__main">
      <div class="login__logo vh-flex-center vh-flex-col vh-pb-20">
        <van-image class="logo-img" :src="logoImg" :alt="logoName"></van-image>
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.userAccount"
          name="userAccount"
          label="用户名"
          label-class="vh-color-blue2"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          label-class="vh-color-blue2"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </main>

    <footer class="login__footer">
      <p>主办单位：广东省中医院</p>
      <p>技术支持：望海（广东）科技有限公司</p>
    </footer>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logoImg.png'
import { debounce } from '@/utils'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginForm: {
        userAccount: 'demo', // TODO 测试账号：2516 demo 1390 2541
        password: 'Hrp@123' // Hrp@123
      },
      dataList: [],
      logoImg: logoImg,
      logoName: '医疗高效运营管理系统'
    }
  },
  computed: {
    openId() {
      return 'xiejiewei' + this.loginForm.userAccount
    }
  },
  created() {},
  methods: {
    // 登录绑定
    async loginFn() {
      try {
        this.$toast.loading({ message: '正在登录...', forbidClick: true, duration: 0 }) // 开启loading
        const { errcode } = await this.$store.dispatch('user/login', this.loginForm)
        if (errcode === '0') {
          this.$toast.clear() // 清除loading
          this.$router.push({ path: '/' })
          // this.dataList = data || []
        } else {
          this.$toast.fail({ message: '登录失败', forbidClick: true, duration: 1500 })
        }
      } catch {
        this.$toast.fail({ message: '登录失败', forbidClick: true, duration: 1500 })
      }
    },
    // 表单提交
    onSubmit(values) {
      // console.log('submit', values)
      debounce(this.loginFn(), 150) // TODO 无效？
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  .login__main {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 16px;
  }
  .login__logo {
    .logo-img {
      width: 80%;
      // width: 167px;
      // height: 36px;
    }
    .logo-name {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .login__footer {
    width: 100%;
    position: absolute;
    bottom: 20px;
    color: @color-tip;
    text-align: center;
  }
}
</style>
