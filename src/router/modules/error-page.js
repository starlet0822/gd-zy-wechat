/*
 * @Description:错误页面
 * @Author: wuxxing
 * @LastEditTime: 2022-04-15 16:53:12
 */
export default [
  {
    path: '/404',
    name: 'Page404',
    meta: { title: '404' },
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404')
  },
  {
    path: '/no-power',
    name: 'NoPower',
    meta: { title: '权限不足' },
    component: () => import(/* webpackChunkName: "no-power" */ '@/views/error-page/no-power')
  }
]
