/*
 * @Description:资产配置相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 10:42:37
 */
export default [
  {
    path: '/asset-purchase',
    name: 'AssePurchase',
    meta: { title: '资产购置', icon: 'gouzhi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-purchase" */ '@/views/asset-management/purchase/index.vue')
  },
  {
    path: '/asset-purchase-check/:id/:dataState',
    name: 'AssetPurchaseCheck',
    meta: { title: '资产购置审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-purchase-check" */ '@/views/asset-management/purchase/check.vue'
      )
  },
  {
    path: '/asset-disposal',
    name: 'AssetDisposal',
    meta: { title: '资产处置', icon: 'chuzhi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-disposal" */ '@/views/asset-management/disposal/index')
  },
  {
    path: '/asset-disposal-check/:id/:dataState',
    name: 'AssetDisposalCheck',
    meta: { title: '资产处置审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-disposal-check" */ '@/views/asset-management/disposal/check.vue'
      )
  },
  {
    path: '/asset-allocate',
    name: 'AssetAllocate',
    meta: { title: '资产调拨', icon: 'tiaobo', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-allocate" */ '@/views/asset-management/allocate/index')
  },
  {
    path: '/asset-allocate-check/:id/:dataState',
    name: 'AssetAllocateCheck',
    meta: { title: '资产调拨审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-allocate-check" */ '@/views/asset-management/allocate/check.vue'
      )
  },
  {
    path: '/asset-allocate-detail',
    name: 'AssetAllocateDetail',
    meta: { title: '资产调拨明细' },
    component: () =>
      import(
        /* webpackChunkName: "asset-allocate-detail" */ '@/views/asset-management/allocate/detail.vue'
      )
  },
  {
    path: '/asset-transfer',
    name: 'AssetTransfer',
    meta: { title: '资产转移', icon: 'zhuanyi', modCode: '05', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-transfer" */ '@/views/asset-management/transfer/index')
  },
  {
    path: '/asset-transfer-check/:id/:dataState',
    name: 'AssetTransferCheck',
    meta: { title: '资产转移审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-transfer-check" */ '@/views/asset-management/transfer/check.vue'
      )
  },
  {
    path: '/asset-project-lib',
    name: 'AssetProjectLib',
    meta: { title: '项目库', icon: 'cangku', modCode: '05', keepAlive: true },
    component: () =>
      import(
        /* webpackChunkName: "asset-project-lib" */ '@/views/asset-management/project-lib/index.vue'
      )
  },
  {
    path: '/asset-project-lib-check/:id/:dataState',
    name: 'AssetProjectLibCheck',
    meta: { title: '项目库审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-project-lib-check" */ '@/views/asset-management/project-lib/check.vue'
      )
  }
]
