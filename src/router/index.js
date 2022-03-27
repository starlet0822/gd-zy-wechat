/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-27 10:51:57
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 }) // 刷新重置滚动条滚动值 0
})

export default router
