/*
 * @Description: 过滤器统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:27:28
 */
import * as filters from './filters'
export function registerGlobFilter(Vue) {
  Object.keys(filters).forEach((k) => {
    Vue.filter(k, filters[k])
  })
}
