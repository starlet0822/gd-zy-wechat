/*
 * @Description: 路由统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 09:51:46
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
