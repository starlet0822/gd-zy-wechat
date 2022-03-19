/*
 * @Description: 路由统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:31:14
 */
import { isArray } from '@utils/is'

// 自动引入路由
const _routes = []
const routeFiles = require.context('./modules', true, /\.js$/)
routeFiles.keys().forEach(fileName => {
  if (fileName !== './index.js') {
    const routesModule = routeFiles(fileName)
    const arr = routesModule.default || routesModule
    if (isArray(arr) && arr.length) _routes.push(...arr)
  }
})

export const routes = _routes // 导出路由集合
