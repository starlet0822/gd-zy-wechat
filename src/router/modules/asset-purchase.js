/*
 * @Description:资产配置相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-27 22:13:31
 */
export default [
  {
    path: '/asset-purchase',
    name: 'AssetPurchase',
    meta: { title: '资产购置', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "asset-purchase" */ '@/views/asset-purchase/index.vue')
  },
  {
    path: '/asset-purchase-check',
    name: 'AssetPurchaseCheck',
    meta: { title: '资产购置审核' },
    component: () =>
      import(/* webpackChunkName: "asset-purchase-check" */ '@/views/asset-purchase/check.vue')
  }
]
