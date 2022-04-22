<!--
 * @Description: 标签
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 09:57:50
-->
<template>
  <van-tag
    class="tag-box-wrapper"
    :color="color"
    :plain="plain"
    :size="size"
    :closeable="closeable"
    v-bind="$attrs"
    @click="handleClickTag"
    @close="handleCloseTag"
    v-waves
  >
    {{ text }}
  </van-tag>
</template>

<script>
import { themeColor } from '@/config/constants'
export default {
  name: 'TagBox',
  props: {
    // 标签文本
    text: {
      type: [String, Number],
      default: '标签'
    },
    // 标签颜色
    color: {
      type: [String],
      default: themeColor
    },
    // 标签大小
    size: {
      type: String,
      default: 'large',
      validator(value) {
        return ['', 'large', 'medium'].includes(value)
      }
    },
    plain: Boolean, // 是否空心
    closeable: Boolean // 是否为可关闭标签
  },
  data() {
    return {}
  },
  methods: {
    handleClickTag() {
      this.$emit('click')
    },
    handleCloseTag() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.tag-box-wrapper {
}
</style>
