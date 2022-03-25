<!--
 * @Description: 首页
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 15:08:42
-->
<template>
  <div class="home-wrapper vh-bg">
    <div
      class="module vh-mb-10 vh-bg-white"
      v-for="(item, index) in list"
      :key="item.title + index"
    >
      <van-cell title-class="vh-title" class="vh-border-0 vh-pb-0" :title="item.title"></van-cell>
      <van-grid :gutter="0" :border="false" clickable>
        <van-grid-item
          v-for="(cItem, cIndex) in item.children"
          :key="cItem.text + cIndex"
          icon="photo-o"
          :text="cItem.text"
          :to="cItem.to"
          @click="onclickItem(cItem, index)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      list: [
        {
          title: '资产管理',
          children: [
            {
              text: '资产购置',
              to: '/asset-purchase',
              icon: ''
            },
            {
              text: '资产处置',
              to: '',
              icon: ''
            },
            {
              text: '资产调拨',
              to: '',
              icon: ''
            }
          ]
        },
        {
          title: '人力资源',
          children: [
            {
              text: '考勤审批',
              to: '',
              icon: ''
            },
            {
              text: '休假申请',
              to: '',
              icon: ''
            },
            {
              text: '轮岗审批',
              to: '/rotational-check',
              icon: ''
            }
          ]
        },
        {
          title: '财务报销',
          children: [
            {
              text: '智能报销',
              to: '',
              icon: ''
            }
          ]
        },
        {
          title: '统计分析',
          children: [
            {
              text: 'BI分析',
              to: '',
              icon: ''
            }
          ]
        }
      ]
    }
  },
  created() {},
  methods: {
    onclickItem(item, index) {
      if (item.to === '') {
        this.$toast({
          message: '加急开发中...',
          duration: 800
        })
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrapper {
  .module {
  }
}
</style>
