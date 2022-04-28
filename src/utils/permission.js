/*
 * @Description:路由权限判断
 * @Author: wuxxing
 * @LastEditTime: 2022-04-28 10:12:46
 */
import router from '@/router'
import store from '@/store'
import { getCode } from '@/utils/code'
import { ENV } from '@/config/index'
const doPower = ['production', 'test'].includes(ENV) // TODO 嵌套在企业微信再解开

const whiteList = ['/login'] // no redirect whitelist

// 权限判断
function judgeRoutePower(to, next) {
  const {
    meta: { modCode }
  } = to
  if (modCode) {
    console.log(store.getters.menus)
    const hasPower = store.getters.menus.some((menu) => {
      return modCode === menu.modCode
    })
    console.log('hasPower', modCode, hasPower)
    // if (modCode) {
    if (!hasPower) {
      next('/no-power')
    } else {
      next()
    }
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
  const hasUser = store.getters.user // 是否存在用户信息
  console.log('用户信息：', hasUser)
  if (doPower) {
    if (!store.getters.openId) {
      const params = { code: getCode(), state: '' }
      console.log('code', getCode(), params)
      console.log('openId', store.state.user.openId)
      const data = await store.dispatch('user/judgeLoginState', params)
      const authority = data?.authority
      console.log('authority', authority)
      if (authority === '1') {
        next('/login')
      }
      if (authority === '0') {
        next('/')
      }
    }
    // 登录态判断
    if (hasUser) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // next()
        judgeRoutePower(to, next)
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        // next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    next() // 未开启权限判断直接通行
  }
})

// 路由后置守卫
router.afterEach((to, from) => {})
