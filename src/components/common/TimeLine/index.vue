<!--
 * @Description: 时间线
 * @Author: wuxxing
 * @LastEditTime: 2022-03-19 18:19:36
-->
<template>
  <div class="time-line-wrapper">
    <div>时间线</div>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {},
  data() {
    return {
      arr: [1, 3]
    }
  },
  methods: {
    hn() {
      this.arr((item) => {})
    }
  }
}
</script>

<style lang="less" scoped>
</style>
