/*
 * @Description:路由权限判断
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 17:44:06
 */
/* eslint-disable */
import router from '@/router'
import store from '@/store'
import { getCode } from '@/utils/code'
import { ENV } from '@/config/index'
const doPower = ['production', 'test'].includes(ENV) // 嵌套在企业微信再解开

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
    // console.log('hasPower', modCode, hasPower)
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
  const { name: toRouteName } = to
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
      // 未绑定过
      if (authority === '1') {
        next('/login')
      }
      // 有绑定过
      if (authority === '0') {
        console.log('to：', toRouteName)
        if (toRouteName === 'UserCenter') {
          next({ path: '/user-center', replace: true }) // 前往个人中心
        } else {
          next('/')
        }
      }
    }
    // // 登录态判断 TODO: 先注释
    // if (hasUser) {
    //   if (to.path === '/login') {
    //     next({ path: '/' })
    //   } else {
    //     judgeRoutePower(to, next)
    //   }
    // } else {
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     next()
    //   } else {
    //     next('/login')
    //     // next(`/login?redirect=${to.path}`)
    //   }
    // }
    next()
  } else {
    next() // 未开启权限判断直接通行
  }
})

// 路由后置守卫
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
