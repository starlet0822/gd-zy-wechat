/*
 * @Description:资产配置相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 14:36:34
 */
export default [
  {
    path: '/asset-purchase',
    name: 'AssetPurchase',
    meta: { title: '资产购置', icon: 'gouzhi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-purchase" */ '@/views/fixed-assets/purchase/index.vue')
  },
  {
    path: '/asset-purchase-check/:id/:dataState?',
    name: 'AssetPurchaseCheck',
    meta: { title: '资产购置审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-purchase-check" */ '@/views/fixed-assets/purchase/check.vue'
      )
  },
  {
    path: '/asset-disposal',
    name: 'AssetDisposal',
    meta: { title: '资产处置', icon: 'chuzhi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-disposal" */ '@/views/fixed-assets/disposal/index')
  },
  {
    path: '/asset-disposal-check/:id/:dataState?',
    name: 'AssetDisposalCheck',
    meta: { title: '资产处置审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-disposal-check" */ '@/views/fixed-assets/disposal/check.vue'
      )
  },
  {
    path: '/asset-allocate',
    name: 'AssetAllocate',
    meta: { title: '资产调拨', icon: 'tiaobo', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-allocate" */ '@/views/fixed-assets/allocate/index')
  },
  {
    path: '/asset-allocate-check/:id/:dataState?',
    name: 'AssetAllocateCheck',
    meta: { title: '资产调拨审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-allocate-check" */ '@/views/fixed-assets/allocate/check.vue'
      )
  },
  {
    path: '/asset-allocate-detail',
    name: 'AssetAllocateDetail',
    meta: { title: '资产调拨明细' },
    component: () =>
      import(
        /* webpackChunkName: "asset-allocate-detail" */ '@/views/fixed-assets/allocate/detail.vue'
      )
  },
  {
    path: '/asset-transfer',
    name: 'AssetTransfer',
    meta: { title: '资产转移', icon: 'zhuanyi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-transfer" */ '@/views/fixed-assets/transfer/index')
  },
  {
    path: '/asset-transfer-check/:id/:dataState?',
    name: 'AssetTransferCheck',
    meta: { title: '资产转移审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-transfer-check" */ '@/views/fixed-assets/transfer/check.vue'
      )
  },
  {
    path: '/asset-project-lib',
    name: 'AssetProjectLib',
    meta: { title: '项目库', icon: 'cangku', modCode: '05', keepAlive: true },
    component: () =>
      import(
        /* webpackChunkName: "asset-project-lib" */ '@/views/fixed-assets/project-lib/index.vue'
      )
  },
  {
    path: '/asset-project-lib-check/:id/:dataState?',
    name: 'AssetProjectLibCheck',
    meta: { title: '项目库审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-project-lib-check" */ '@/views/fixed-assets/project-lib/check.vue'
      )
  }
]
