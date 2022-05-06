<!--
 * @Description: 个人中心
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 18:06:19
-->
<template>
  <div class="user-center-wrapper vh-bg">
    <vh-nav-bar :left-arrow="false"></vh-nav-bar>
    <main class="vh-mt-10">
      <van-cell
        title="工号"
        title-class="vh-color-tip"
        :value="(userInfo && userInfo.account) || '--'"
        center
      ></van-cell>
      <van-cell
        title="姓名"
        title-class="vh-color-tip"
        :value="(userInfo && userInfo.name) || '--'"
        center
      ></van-cell>
      <van-cell
        title="科室"
        title-class="vh-color-tip"
        :value="(userInfo && userInfo.deptName) || '--'"
        center
      ></van-cell>
    </main>
    <footer class="vh-p-box vh-flex-center footer-btn">
      <van-button type="danger" block @click="onCancelBinding">{{ btnText }}</van-button>
    </footer>
  </div>
</template>

<script>
import { ISBUILD } from '@/config'
export default {
  name: 'UserCenter',
  data() {
    return {
      btnText: '解除绑定',
      userInfo: null
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await this.$store.dispatch('user/getUserInfo')
        if (res.errcode === '0') {
          this.userInfo = res.data?.orgUser
        } else {
          this.$toast.fail(`获取用户信息异常`)
        }
      } catch {
        this.$toast.fail(`获取用户信息异常`)
      }
    },
    // 解除用户绑定
    onCancelBinding() {
      this.$dialog
        .confirm({
          title: '提示',
          message: `确定执行 <b>${this.btnText}</b> 操作吗？`
        })
        .then(async () => {
          try {
            // this.$toast.loading({ message: `${this.btnText}中...`, forbidClick: true, duration: 0 }) // 开启loading
            const res = await this.$store.dispatch('user/logout')
            if (res.errcode === '0') {
              // this.$toast.success({
              //   message: res.data || '解绑成功',
              //   forbidClick: true,
              //   duration: 1500
              // })
              // this.$toast.clear() // 清除loading
              if (ISBUILD) {
                // location.reload()
                location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa07d3a2cb92618de&redirect_uri=http%3A%2F%2Fhrp.gdhtcm.com%3A8111%2FwechatWeb&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
              } else {
                this.$router.replace({ path: '/login' })
              }
            } else {
              this.$toast.fail({
                message: `${this.btnText}失败`,
                forbidClick: true,
                duration: 1500
              })
            }
          } catch {
            this.$toast.fail({ message: `${this.btnText}失败`, forbidClick: true, duration: 1500 })
          }
        })
        .catch(() => {
          // this.$toast('已取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user-center-wrapper {
  .van-cell__value {
    flex: 3;
  }
  .footer-btn {
    // width: 85%;
  }
}
</style>
