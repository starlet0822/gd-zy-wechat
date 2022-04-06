/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-06 10:34:25
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { routes, routerPush, routerReplace } from './routes'
// 初始化重写的 push replace 方法
routerPush(VueRouter)
routerReplace(VueRouter)
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

/* eslint-disable */
// 拦截 afterEach 路由
router.afterEach((to, from) => {
  if (to.params.hasOwnProperty('keepAliveTo')) {
    to.meta.keepAlive = to.params.keepAliveTo
  } else if (to.query.hasOwnProperty('keepAliveTo')) {
    to.meta.keepAlive = to.query.keepAliveTo
  }
  if (to.params.hasOwnProperty('keepAliveFrom')) {
    from.meta.keepAlive = to.params.keepAliveFrom
  } else if (to.query.hasOwnProperty('keepAliveFrom')) {
    from.meta.keepAlive = to.query.keepAliveFrom
  }
  // 处理路由传参方法
  const changeRoutes = (routes) => {
    return {
      fullPath: routes.fullPath,
      hash: routes.hash,
      name: routes.name,
      path: routes.path,
      meta: { ...routes.meta },
      params: { ...routes.params },
      query: { ...routes.query }
    }
  }
  const params = {
    to: changeRoutes(to),
    from: changeRoutes(from)
  }
  store.dispatch('cacheView/handleInclude', params)
})

export default router
