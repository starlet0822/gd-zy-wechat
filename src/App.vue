<!--
 * @Description: 入口页面
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 10:50:08
-->
<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
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
      transitionName: 'fade'
    }
  },
  computed: {
    ...mapGetters('cacheView', ['include', 'exclude'])
  },
  created() {},
  methods: {
    afterLeave() {
      // this.$root.$emit('triggerScroll')
    }
  }
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
