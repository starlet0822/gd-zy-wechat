<!--
 * @Description: 标签页
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 15:21:16
-->
<template>
  <div class="move-tabs-wrapper">
    <van-tabs
      v-bind="$attrs"
      v-model="tabActive"
      :color="color"
      :border="border"
      :sticky="sticky"
      :offset-top="`${offsetTopRet}rem`"
      animated
      swipeable
      @change="onTabsChange"
    >
      <van-tab :title="tab" :name="index" v-for="(tab, index) in tabs" :key="index">
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { themeColor, RootValue } from '@/config/constants'
export default {
  name: 'MoveTabs',
  props: {
    // 默认激活第一项
    active: {
      type: [String, Number],
      default: 0
    },
    // tab 列表
    tabs: {
      type: Array,
      default: () => ['标签 1', '标签 2', '标签 3', '标签 4', '标签 5', '标签 6', '标签 7']
    },
    // 主题色
    color: {
      type: String,
      default: themeColor
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否吸顶
    sticky: {
      type: Boolean,
      default: true
    },
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      tabActive: this.active
    }
  },
  computed: {
    offsetTopRet: {
      get() {
        return this.offsetTop / RootValue
      }
    }
  },
  created() {},
  methods: {
    // 当前激活的标签改变时触发
    onTabsChange(index, title) {
      this.$emit('update:active', index)
      this.$emit('change', index, title)
    }
  }
}
</script>

<style lang="less" scoped>
.move-tabs-wrapper {
}
</style>
