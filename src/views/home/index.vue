<!--
 * @Description: 首页
 * @Author: wuxxing
 * @LastEditTime: 2022-04-12 09:15:43
-->
<template>
  <div class="home-wrapper vh-bg">
    <div
      class="module vh-mb-10 vh-bg-white"
      v-for="(item, index) in list"
      :key="item.title + index"
    >
      <van-cell
        title-class="vh-title"
        class="vh-border-0 module-title vh-pb-0"
        :title="item.title"
      ></van-cell>
      <van-grid :gutter="0" :border="false" :clickable="true">
        <van-grid-item
          v-for="(cItem, cIndex) in item.children"
          :key="cItem.text + cIndex"
          icon-prefix="iconfont icon"
          :icon="cItem.icon"
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
            dot
            badge="1"
          >
            <template #default>
              <div
                v-waves
                class="module-children vh-flex-col vh-flex-center"
                @click="onclickItem(cItem, index)"
              >
                <van-icon class="iconfont" size="0.6rem" class-prefix="icon" name="zhuanhuan" />
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
          title: '财务报销',
          children: [
            {
              text: '智能报销',
              to: 'http://hrp.gdhtcm.com:8111/OES/ctrl/crtlwechat/index/appmodellogin.jsp',
              icon: 'baoxiao'
            }
          ]
        },
        {
          title: '固定资产',
          children: [
            {
              text: '资产购置',
              to: '/asset-purchase',
              icon: 'gouzhi'
            },
            {
              text: '资产处置',
              to: '/asset-disposal',
              icon: 'chuzhi'
            },
            {
              text: '资产调拨',
              to: '/asset-allocate',
              icon: 'tiaobo'
            },
            {
              text: '资产转移',
              to: '/asset-transfer',
              icon: 'zhuanyi'
            }
            // {
            //   text: '项目库',
            //   to: '',
            //   icon: 'cangku'
            // },
            // {
            //   text: '待处理消息',
            //   to: '',
            //   icon: 'xiaoxi'
            // }
          ]
        },
        {
          title: '人力资源',
          children: [
            {
              text: '考勤审批',
              to: '/attendance',
              icon: 'kaoqin'
            },
            {
              text: '休假申请',
              to: '/vacation',
              icon: 'xiujia'
            },
            {
              text: '职工轮岗',
              to: '/rotational',
              icon: 'lungang'
            },
            {
              text: '职工借调',
              to: '/secondment',
              icon: 'jiediao'
            },
            {
              text: '离职审批',
              to: '/departure',
              icon: 'lizhi'
            }
            // {
            //   text: '轮转审批',
            //   to: '/rotary',
            //   icon: 'lunzhuan'
            // }
          ]
        },
        {
          title: '统计分析',
          children: [
            {
              text: 'BI分析',
              to: 'http://hrp.gdhtcm.com:8111/BI/H5/#/',
              icon: 'tongji'
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
  /deep/.module {
    &-title {
      font-weight: 600;
    }
    .van-grid-item {
      .van-grid-item__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 44px;
        font-size: 32px;
        background: rgba(243, 247, 255, 1);
        color: #2f6bf4;
      }
      .van-grid-item__text {
        font-size: 15px;
      }
    }
    .module-children {
      // padding: 16px 8px;
      box-sizing: border-box;
    }
  }
}
</style>
