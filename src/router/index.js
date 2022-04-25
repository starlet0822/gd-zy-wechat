/*
 * @Description:路由管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-25 16:17:38
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
// import store from '@/store'
// import { getCode } from '@/utils/code'
// import { judgeRoutePower } from '@/utils/permission'

Vue.use(VueRouter)
console.log(process.env.BASE_URL)
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  // base: process.env.VUE_APP_PUBLIC_PATH,
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

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
  // TODO 嵌套在企业微信再解开
  // judgeRoutePower(to, next)
  // const Code = getCode()
  // if (!store.getters.openId) {
  //   const params = { code: getCode(), state: '' }
  //   console.log('openId', store.state.user.openId, params)
  //   const data = await store.dispatch('user/judgeLoginState', params)
  //   const { authority } = data
  //   if (authority === '1') {
  //     next('/login')
  //   } else {
  //     next('/')
  //   }
  // }
  next()
})

// 路由后置守卫
router.afterEach((to, from) => {})

export default router
