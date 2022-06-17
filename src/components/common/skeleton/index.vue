<!--
 * @Description: 骨架屏组件
 * @Author: wuxxing
 * @LastEditTime: 2022-06-17 15:19:07
-->
<template>
  <div class="skeleton-wrapper">
    <van-skeleton :row="3" />
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.skeleton-wrapper {
}
</style>
