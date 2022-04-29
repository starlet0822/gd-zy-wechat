/*
 * @Description: 路由统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 14:19:48
 */
import { isArray } from '@utils/is'
import { ISDEV } from '@/config'
// 自动引入路由
const allRoutes = []
const routeFiles = ISDEV
  ? require.context('./modules', true, /\.js$/)
  : require.context('./modules', true, /(?<!(\/+)demo)\.js$/)
routeFiles.keys().forEach((fileName) => {
  const routesModule = routeFiles(fileName)
  const arr = routesModule.default || routesModule
  if (isArray(arr) && arr.length) allRoutes.push(...arr)
})
// 404 页面必须要放到最后！！！
allRoutes.push({ path: '*', redirect: '/404' })

export const routes = allRoutes // 导出路由集合

/* eslint-disable */
// 重写 push 方法
export function routerPush(VueRouter) {
  const myRouterPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location, onComplete, onAbort) {
    if (_.isString(location)) {
      location = { path: location, query: { __routerType: 'push' } }
    } else {
      location.params = location.params || {}
      if (!location.params.hasOwnProperty('__routerType')) {
        location.params.__routerType = 'push'
      }
    }
    return myRouterPush.call(this, location, onComplete, onAbort)
  }
}
// 重写 replace 方法
export function routerReplace(VueRouter) {
  const myRouterReplace = VueRouter.prototype.replace
  VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
    if (_.isString(location)) {
      location = { path: location, query: { __routerType: 'replace' } }
    } else {
      location.params = location.params || {}
      if (!location.params.hasOwnProperty('__routerType')) {
        location.params.__routerType = 'replace'
      }
    }
    return myRouterReplace.call(this, location, onComplete, onAbort)
  }
}
