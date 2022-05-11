/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 14:32:24
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import { routes } from './routes'
// 初始化重写的 push replace 方法
// routerPush(VueRouter)
// routerReplace(VueRouter)
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }) // 刷新重置滚动条滚动值 0
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // }
})

export default router
