/*
 * @Description: 系统相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 13:45:38
 */
export default [
  {
    path: '/',
    name: 'App',
    redirect: '/home'
    // component: Home
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', keepAlive: true },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
  }
]
