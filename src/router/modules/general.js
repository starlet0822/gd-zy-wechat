/*
 * @Description: 公共普通页面
 * @Author: wuxxing
 * @LastEditTime: 2022-03-23 14:12:59
 */
export default [
  {
    path: '/search-page',
    name: 'SearchPage',
    meta: { title: '搜索', keepAlive: true },
    component: () =>
      import(/* webpackChunkName: "search-page" */ '@/components/common/SearchFilter/search.vue')
  }
]
