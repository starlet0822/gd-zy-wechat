<!--
 * @Description:导航栏
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 09:36:04
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
    title: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: true
    },
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
  created() {
    console.log(this.title)
  },
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
}
</style>
