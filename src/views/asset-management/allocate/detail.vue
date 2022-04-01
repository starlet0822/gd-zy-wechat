<!--
 * @Description: 资产调拨明细
 * @Author: wuxxing
 * @LastEditTime: 2022-04-01 10:26:52
-->
<template>
  <div class="asset-allocate-detail vh-bg">
    <vh-nav-bar></vh-nav-bar>
    <!-- 折叠面板 -->
    <van-collapse class="vh-m-10" v-model="activeNames" :border="false">
      <van-collapse-item class="vh-rounded-6" disabled :name="0" :is-link="false" :border="false">
        <template #title>
          <div :class="{ 'vh-color-blue': true }">
            {{ detailInfo.title }}
          </div>
        </template>
        <template #default>
          <van-cell
            title-class="vh-color-tip"
            v-for="citem in detailInfo.rowData"
            :key="citem.fieldName"
            :title="citem.fieldName"
            value="xxxx"
          ></van-cell>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { detailInfo } from './mock'
export default {
  name: 'AssetAllocateDetail',
  components: {},
  data() {
    return {
      detailInfo,
      activeNames: [0]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.asset-allocate-detail {
  /deep/ .van-collapse-item__content {
    padding: 0;
    .van-cell {
      font-size: @font14;
      padding-top: 5px;
      padding-bottom: 5px;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
