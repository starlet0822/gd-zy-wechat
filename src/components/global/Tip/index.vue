<!--
 * @Description:提示状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-15 16:16:54
-->
<template>
  <div class="tip-wrapper">
    <van-empty v-bind="$attrs" :image="image" :description="description" />
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    // 提示icon
    icon: {
      type: String,
      default: 'empty',
      validitor(val) {
        return ['404', 'empty', 'lock', 'network'].includes(val)
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    image() {
      return require(`@/assets/images/tip/${this.icon}.png`)
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.tip-wrapper {
}
</style>
