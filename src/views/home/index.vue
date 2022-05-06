<!--
 * @Description: 首页
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 17:51:47
-->
<template>
  <div class="home-wrapper vh-bg">
    <template v-for="(item, index) in list">
      <div
        class="module vh-mb-10 vh-bg-white"
        v-if="item.children && item.children.length"
        :key="item.title + index"
      >
        <template v-if="item.children && item.children.length">
          <van-cell
            title-class="vh-title"
            class="vh-border-0 module-title vh-pb-0"
            :title="item.title"
          ></van-cell>
          <van-grid :gutter="0" :border="false" :clickable="true">
            <template v-if="item.children && item.children.length">
              <van-grid-item
                v-for="(cItem, cIndex) in item.children"
                :key="cItem.meta.title + cIndex"
                icon-prefix="iconfont icon"
                :icon="cItem.meta.icon"
                :text="cItem.meta.title"
                v-bind="linkProps(cItem)"
                badge=""
                @click="onclickItem(cItem, index)"
              />
            </template>
            <template v-else>
              <div class="vh-p-box">暂无子模块</div>
            </template>
          </van-grid>
        </template>
      </div>
    </template>
    <!-- <vh-float-box></vh-float-box> -->
  </div>
</template>

<script>
import { isExternal } from '@/utils/is'
import { handleMenus } from './hooks/use-menus'
import { routes } from '@/router/routes'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      constantRoutes: routes.filter((v) => v?.meta?.modCode && v?.meta?.title),
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
            },
            {
              text: '轮转审批',
              to: '/rotary',
              icon: 'lunzhuan'
            }
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
  created() {
    const menus = this.$store.state.user.menus
    this.list = handleMenus(menus, this.constantRoutes)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.$store.dispatch('cacheView/resetKeepAlive')
    })
  },
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
    linkProps({ path }) {
      return {
        [isExternal(path) ? 'url' : 'to']: path
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
