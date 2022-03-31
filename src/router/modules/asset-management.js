/*
 * @Description:资产配置相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-31 15:40:30
 */
export default [
  {
    path: '/asset-purchase',
    name: 'AssePurchase',
    meta: { title: '资产购置', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-purchase" */ '@/views/asset-management/purchase/index.vue')
  },
  {
    path: '/asset-purchase-check',
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
    meta: { title: '资产处置', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-disposal" */ '@/views/asset-management/disposal/index')
  },
  {
    path: '/asset-disposal-check',
    name: 'AssetDisposalCheck',
    meta: { title: '资产处置审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-disposal-check" */ '@/views/asset-management/disposal/check.vue'
      )
  },
  {
    path: '/asset-transfers',
    name: 'AssetTransfers',
    meta: { title: '资产调拨', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-transfers" */ '@/views/asset-management/transfers/index')
  },
  {
    path: '/asset-transfers-check',
    name: 'AssetTransfersCheck',
    meta: { title: '资产调拨审核' },
    component: () =>
      import(
        /* webpackChunkName: "asset-transfers-check" */ '@/views/asset-management/transfers/check.vue'
      )
  },
  {
    path: '/asset-transfers-detail',
    name: 'AssetTransfersDetail',
    meta: { title: '资产调拨明细' },
    component: () =>
      import(
        /* webpackChunkName: "asset-transfers-detail" */ '@/views/asset-management/transfers/detail.vue'
      )
  }
  // {
  //   path: '/asset-transfers',
  //   name: 'AssetTransfers',
  //   meta: { title: '资产调拨', keepAlive: true },
  //   component: () => import(/* webpackChunkName: "asset-transfers" */ '@/views/asset-management/disposal/index')
  // },
  // {
  //   path: '/asset-transfers-check',
  //   name: 'AssetTransfersCheck',
  //   meta: { title: '资产调拨审核' },
  //   component: () => import(/* webpackChunkName: "asset-transfers-check" */ '@/views/asset-management/transfers/check.vue')
  // }
]
