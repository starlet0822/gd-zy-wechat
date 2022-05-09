<!--
 * @Description:提示状态组件
 * @Author: wuxxing
 * @LastEditTime: 2022-05-09 17:37:53
-->
<template>
  <div class="tip-wrapper">
    <van-empty v-bind="$attrs" :image="image" :description="desc" />
  </div>
</template>

<script>
import { tipTextMap } from '@/config/dictionary'
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
      tipTextMap: tipTextMap
    }
  },
  computed: {
    image() {
      return require(`@/assets/images/tip/${this.icon}.png`)
    },
    desc() {
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
