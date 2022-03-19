<!--
 * @Description:测试入口
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 18:07:20
-->
<template>
  <div class="test-page-wrapper">
    <van-grid :column-num="4">
      <van-grid-item v-for="(item, index) in list" :key="item.text + index" icon="photo-o" :text="item.text" :to="item.to"/>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      list: [
        { text: '资产配置', to: '/asset-purchase' },
        { text: '人力管理', to: '/human-management' }
      ]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.test-page-wrapper {}
</style>
