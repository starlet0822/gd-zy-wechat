<!--
 * @Description: 用户展示表格
 * @Author: wuxxing
 * @LastEditTime: 2022-04-12 10:44:47
-->
<template>
  <div class="user-table-wrapper vh-bg-white">
    <van-row class="table__header" flex="flex" justify="center">
      <van-col span="4">工号</van-col>
      <van-col span="4">姓名</van-col>
      <van-col span="4">类型</van-col>
      <van-col span="6">开始时间</van-col>
      <van-col span="6">结束时间</van-col>
    </van-row>
    <van-row class="table__content" v-for="item in 20" :key="item">
      <van-col span="4" class="vh-color-blue">{{ item }}</van-col>
      <van-col span="4">张三</van-col>
      <van-col span="4">病假</van-col>
      <van-col span="6">2022-04-11</van-col>
      <van-col span="6">2022-04-12</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.user-table-wrapper {
  // border: 1px solid #e4e4e4;
  border-right: 0;
  border-bottom: 1px solid #e4e4e4;
  max-height: 300px;
  overflow: auto;
  position: relative;
  .table__header {
    position: sticky;
    left: 0;
    top: 0;
    background-color: @color-orange;
    color: #fff;
    // font-size: 18px;
    text-align: center;
    .van-col {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #e4e4e4;
    }
  }
  .table__content {
    text-align: center;
    .van-col {
      border-right: 1px solid #e4e4e4;
    }
  }
}
</style>

<style></style>
