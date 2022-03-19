/*
 * @Description: 全局组件自动导入注册
 * @Author: wuxxing
 * @LastEditTime: 2022-03-18 10:33:01
 */
import { prefixCls } from '@/config/constants'
import { _upperFirst, _camelCase } from '@utils/index'

// 注册全局组件
export function registerGlobComp (Vue) {
  const requireComponent = require.context('./', true, /\.vue$/)
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = _upperFirst(prefixCls) + _upperFirst(_camelCase(fileName.replace(/^\.\//, '').replace(/\/index.\w+$/, '')))
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
