<!--
 * @Description: 入口页面
 * @Author: wuxxing
 * @LastEditTime: 2022-03-27 21:56:08
-->
<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive :include="include" :exclude="exclude">
        <router-view class="router-view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      transitionName: 'van-fade'
    }
  },
  computed: {
    ...mapGetters('cacheView', ['include', 'exclude'])
  },
  created() {
    console.log(this.include)
  },
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
