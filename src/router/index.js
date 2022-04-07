/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 10:22:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '@/store'
import { getCode } from '@/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior: () => ({ y: 0 }) // 刷新重置滚动条滚动值 0
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  // const hasCode = getCode()
  store.dispatch('user/judgeLoginState', {
    code: 'dzvldczOAc19tG7o0nKOOJpNx3KrjDL26Dx5HAGz2iw' || getCode(),
    state: ''
  })
  next()
})

export default router
