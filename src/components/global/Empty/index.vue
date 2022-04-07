<!--
 * @Description:空数据状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 16:01:03
-->
<template>
  <div class="empty-wrapper">
    <van-empty description="暂无数据" />
  </div>
</template>

<script>
export default {
  name: 'Empty',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.empty-wrapper {
}
</style>
