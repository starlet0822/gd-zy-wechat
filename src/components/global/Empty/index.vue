<!--
 * @Description:空数据状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:10:27
-->
<template>
  <div class="empty-wrapper">
    <van-empty v-bind="$attrs" :description="description" />
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    description: {
      type: String,
      default: '暂无数据'
    }
  },
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
