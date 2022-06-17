<!--
 * @Description: 首页
 * @Author: wuxxing
 * @LastEditTime: 2022-06-17 09:46:25
-->
<template>
  <div class="home-wrapper vh-bg">
    <template v-for="(item, index) in menuList">
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
                :badge="handleBadge(cItem)"
                @click="onclickItem(cItem, index)"
              />
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
import { getCheckCount } from '@/api/modules/common'
import { handleMenus } from './hooks/use-menus'
import { routes } from '@/router/routes'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      typeCode: '',
      constantRoutes: routes.filter((v) => v?.meta?.modCode && v?.meta?.title),
      menuList: []
    }
  },
  created() {
    this.initMenus()
  },
  // activated() {
  //   this.initMenus()
  // },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.$store.dispatch('cacheView/resetKeepAlive')
    })
  },
  methods: {
    initMenus() {
      const menus = this.$store.state.user.menus
      this.menuList = handleMenus(menus, this.constantRoutes)
      this.typeCode = this.menuList
        .reduce((count, pre, curIdx, arr) => {
          // console.log(curIdx, arr, arr[curIdx].typeCode)
          pre.typeCode && count.push(pre.typeCode)
          return count
        }, [])
        .join(',')
      // 获取待审批提示数量
      this.getCheckCount()
    },
    async getCheckCount(isClear = false) {
      try {
        // 先置空
        for (const menu of this.menuList) {
          for (const route of menu.children) {
            this.$set(route, 'notCheckCount', null)
          }
        }
        const params = { typeCode: this.typeCode }
        const res = await getCheckCount(params, { noLoading: true })
        if (res.errcode === '0') {
          res.data.forEach((item) => {
            this.menuList.forEach((menu) => {
              menu.children.forEach((menu, index) => {
                if (item.typeCode === menu.meta.typeCode) {
                  // console.log(menu, index)
                  this.$set(menu, 'notCheckCount', isClear ? null : item.notCheckCount)
                  // this.$set(menu, 'notCheckCount', isClear ? null : 9999)
                }
              })
            })
          })
        }
      } catch {}
    },
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
    // 处理待读消息数
    handleBadge(cItem) {
      if (+cItem.notCheckCount > 99) {
        return '99+'
      } else {
        return cItem.notCheckCount
      }
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
        position: relative; // 为了微标相对定位
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
      .van-info {
        font-size: 15px;
        padding: 0 5px;
      }
    }
    .module-children {
      // padding: 16px 8px;
      box-sizing: border-box;
    }
  }
}
</style>
