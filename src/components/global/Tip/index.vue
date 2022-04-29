<!--
 * @Description:提示状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 13:54:47
-->
<template>
  <div class="tip-wrapper">
    <van-empty v-bind="$attrs" :image="image" :description="desc" />
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
      // required: true,
      type: String,
      default: 'empty',
      validitor(val) {
        return ['404', 'empty', 'lock', 'network'].includes(val)
      }
    }
  },
  data() {
    return {
      tipTextMap: new Map([
        ['empty', '暂无数据'],
        ['404', '404 Not Found'],
        ['lock', '抱歉，您无权限访问此页面'],
        ['network', '网络异常']
      ])
    }
  },
  computed: {
    image() {
      return require(`@/assets/images/tip/${this.icon}.png`)
    },
    desc() {
      // console.log(this.tipTextMap)
      return this.tipTextMap.get(this.icon) || this.description
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
