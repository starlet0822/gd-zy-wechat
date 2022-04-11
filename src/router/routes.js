/*
 * @Description: 路由统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:52:56
 */
import { isArray } from '@utils/is'

// 自动引入路由
const allRoutes = []
const routeFiles = require.context('./modules', true, /\.js$/)
routeFiles.keys().forEach((fileName) => {
  if (fileName !== './index.js') {
    const routesModule = routeFiles(fileName)
    const arr = routesModule.default || routesModule
    if (isArray(arr) && arr.length) allRoutes.push(...arr)
  }
})
// 404 页面必须要放到最后！！！
allRoutes.push({ path: '*', redirect: '/404' })

export const routes = allRoutes // 导出路由集合
