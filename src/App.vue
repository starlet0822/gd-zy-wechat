<!--
 * @Description: 入口页面
 * @Author: wuxxing
 * @LastEditTime: 2022-03-22 15:41:36
-->
<template>
  <div id="app">
    <router-view class="router-view" />
  </div>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100vh;
  .router-view {
    min-height: 100%;
  }
}
</style>
