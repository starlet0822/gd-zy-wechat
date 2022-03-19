/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-18 10:46:55
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }) // 刷新重置滚动条滚动值 0
})

export default router
