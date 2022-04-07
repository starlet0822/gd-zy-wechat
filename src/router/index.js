/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 16:39:17
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

router.beforeEach(async(to, from, next) => {
  console.log(to, from)
  // const hasCode = getCode()
  console.log(store.state.user.openId)
  if (!store.getters.openId) {
    const data = await store.dispatch('user/judgeLoginState', {
      code: 'aboOQqIaiGAktVbTp9ChkYTQja7hQdejFMkqWS4b7RA' || getCode(),
      state: ''
    })
    const { authority } = data
    if (authority === '1') {
      next('/login')
    } else {
      next('/')
    }
  }

  next()
})

export default router
