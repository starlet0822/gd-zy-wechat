<!--
 * @Description:导航栏
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 10:51:44
-->
<template>
  <div class="navbar-wrapper">
    <van-nav-bar
      :title="navTitle"
      :left-text="leftText"
      :fixed="fixed"
      safe-area-inset-top
      :left-arrow="leftArrow"
      :placeholder="false"
      v-bind="$attrs"
      v-on="$listeners"
      @click-left="handleClickLeft"
    >
      <!-- <template #title>
        <div :class="titleClass">{{ title }}</div>
      </template> -->
      <template #right>
        <!-- <van-icon name="search" size="18" /> -->
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    // 导航标题
    title: {
      type: String,
      default: ''
    },
    // 标题类样式
    titleClass: {
      type: String,
      default: ''
    },
    // 是否固定
    fixed: {
      type: Boolean,
      default: true
    },
    // 是否显示左侧内容
    leftArrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    // isPlaceholder: {
    //   get () {
    //     return this.fixed
    //   }
    // },
    navTitle: {
      get() {
        const { title: routeTitle } = this.$route.meta
        return this.title !== '' ? this.title : routeTitle
      }
    },
    leftText: {
      get() {
        return this.leftArrow ? '返回' : ''
      }
    }
  },
  created() {},
  methods: {
    // 点击左侧
    handleClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-wrapper {
  height: 48px;
  /deep/.van-nav-bar {
    z-index: 9;
  }
}
</style>
