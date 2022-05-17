<!--
 * @Description: 登录页
 * @Author: wuxxing
 * @LastEditTime: 2022-05-09 11:45:55
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
        <div class="vh-m-16">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </main>
    <!-- 技术支持 -->
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
        userAccount: '', // TODO 测试账号：2516 demo 1390 2541
        password: '' // Hrp@123
      },
      logoImg: logoImg,
      logoName: '医疗高效运营管理系统'
    }
  },
  created() {},
  methods: {
    // 登录绑定
    async loginFn() {
      try {
        this.$toast.loading({ message: '正在登录...', duration: 0 }) // 开启loading
        const res = await this.$store.dispatch('user/login', this.loginForm)
        if (res.errcode === '0') {
          this.$toast.clear() // 清除loading
          await this.$router.replace({ path: '/' })
        } else {
          this.$toast.fail({ message: '登录失败' })
        }
      } catch {
        this.$toast.fail({ message: '登录失败' })
      }
    },
    // 表单提交
    onSubmit(values) {
      debounce(this.loginFn(), 150) // TODO 无效？
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  .login__main {
    .login__logo {
      .logo-img {
        width: 80%;
      }
      .logo-name {
        font-weight: 600;
        font-size: 18px;
      }
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
