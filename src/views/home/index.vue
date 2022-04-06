<!--
 * @Description: 首页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-06 10:42:20
-->
<template>
  <div class="home-wrapper vh-bg">
    <div
      class="module vh-mb-10 vh-bg-white"
      v-for="(item, index) in list"
      :key="item.title + index"
    >
      <van-cell title-class="vh-title" class="vh-border-0 vh-pb-0" :title="item.title"></van-cell>
      <van-grid :gutter="0" :border="false" :clickable="true">
        <van-grid-item
          v-for="(cItem, cIndex) in item.children"
          :key="cItem.text + cIndex"
          icon="photo-o"
          :text="cItem.text"
          v-bind="linkProps(cItem)"
          badge=""
          @click="onclickItem(cItem, index)"
        />
        <!-- 自定义内容 -->
        <template v-if="false">
          <van-grid-item
            v-for="(cItem, cIndex) in item.children"
            :key="cItem.text + cIndex"
            icon="photo-o"
            dot
            badge="1"
          >
            <template #default>
              <div
                v-waves
                class="module-children vh-flex-col vh-flex-center"
                @click="onclickItem(cItem, index)"
              >
                <van-icon name="photo-o" size="0.7467rem"></van-icon>
                <!-- TODO van-ellipsis无效？  -->
                <div class="vh-font-12 vh-mt-8 van-ellipsis">
                  {{ cItem.text }}
                </div>
              </div>
            </template>
          </van-grid-item>
        </template>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { isExternal } from '@/utils/is'
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
              to: 'http://hrp.gdhtcm.com:8111/OES/ctrl/crtlwechat/index/appmodellogin.jsp',
              icon: ''
            }
          ]
        },
        {
          title: '统计分析',
          children: [
            {
              text: 'BI分析',
              to: 'http://hrp.gdhtcm.com:8111/BI/H5/#/',
              icon: ''
            }
          ]
        }
      ]
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from)
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.$store.dispatch('cacheView/resetKeepAlive')
    })
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
      // 另开新窗口方式
      // const flag = isExternal(item.to)
      // if (flag) {
      //   window.open(item.to, '_blank')
      //   return false
      // }
    },
    // 特殊处理 to url属性
    linkProps({ to }) {
      return {
        [isExternal(to) ? 'url' : 'to']: to
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrapper {
  .module {
    .module-children {
      // padding: 16px 8px;
      box-sizing: border-box;
    }
  }
}
</style>
