<!--
 * @Description: 入口页面
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 15:33:45
-->
<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      transitionName: 'van-fade'
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100vh;
  .router-view {
    min-height: 100%;
  }
}
</style>
