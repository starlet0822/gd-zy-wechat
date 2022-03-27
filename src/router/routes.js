/*
 * @Description: 路由统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-27 22:36:17
 */
import { isArray } from '@utils/is' // 导出路由集合

import _ from 'lodash-es'

// 自动引入路由
const _routes = []
const routeFiles = require.context('./modules', true, /\.js$/)
routeFiles.keys().forEach((fileName) => {
  if (fileName !== './index.js') {
    const routesModule = routeFiles(fileName)
    const arr = routesModule.default || routesModule
    if (isArray(arr) && arr.length) _routes.push(...arr)
  }
})

export const routes = _routes

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
