<!--
 * @Description: 悬浮
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 16:53:44
-->
<template>
  <div class="float-box-wrapper vh-flex-center" @click="onClickFloat">
    <van-icon class="icon" color="#fff" name="contact" />
  </div>
</template>

<script>
export default {
  name: 'FloatBox',
  data() {
    return {}
  },
  created() {},
  methods: {
    onClickFloat() {
      this.$router.push({ name: 'UserCenter' })
    }
  }
}
</script>

<style lang="less" scoped>
.float-box-wrapper {
  position: fixed;
  right: 16px;
  bottom: 50px;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  z-index: 99;
  background: rgba(47, 107, 244, 0.5);
  // opacity: 0.5;
  .icon {
    font-size: 24px;
  }
}
</style>
