/*
 * @Description:错误页面
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:19:28
 */
export default [
  {
    path: '/404',
    name: 'Page404',
    meta: { title: '404' },
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue')
  }
]
