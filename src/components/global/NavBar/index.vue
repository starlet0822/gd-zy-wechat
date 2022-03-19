<!--
 * @Description:导航栏
 * @Author: wuxxing
 * @LastEditTime: 2022-03-18 18:58:02
-->
<template>
  <div class="navbar-wrapper">
    <van-nav-bar
      :title="navTitle"
      :left-text="leftArrow ? '返回' : ''"
      :fixed="fixed"
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
        console.log(routeTitle)
        return this.title !== '' ? this.title : routeTitle
      }
    }
  },
  created() {
    // const { title } = this.$route.meta
    // if (title) {
    // }
  },
  methods: {
    // 点击左侧
    handleClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang='less' scoped>
.navbar-wrapper {
  height: 48px;
}
</style>
