<!--
 * @Description:空数据状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-13 09:03:28
-->
<template>
  <div class="empty-wrapper">
    <van-empty v-bind="$attrs" :image="image" :description="description" />
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    image: {
      type: String,
      default: require('@/assets/images/empty.png')
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
