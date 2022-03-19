<!--
 * @Description: 骨架屏组件
 * @Author: wuxxing
 * @LastEditTime: 2022-03-16 23:00:39
-->
<template>
  <div class="skeleton-wrapper">
    <van-skeleton title :row="3" />
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.skeleton-wrapper {
}
</style>
