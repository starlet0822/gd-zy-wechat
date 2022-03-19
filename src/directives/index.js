/*
 * @Description: 自定义指令统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 10:46:23
 */
import waves from './waves/waves'

export function registerGlobDirective(Vue) {
  Vue.directive('waves', waves)
}
