/*
 * @Description: 过滤器统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-21 18:10:37
 */
import * as filters from './filters'
export function registerFilter(Vue) {
  Object.keys(filters).forEach((k) => {
    Vue.filter(k, filters[k])
  })
}
