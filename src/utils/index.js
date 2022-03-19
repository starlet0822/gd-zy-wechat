/*
 * @Description: 工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:35:55
 */
// 函数库别名导出(避免命名冲突)
import { isArray } from '@utils/is'
export { upperFirst as _upperFirst, camelCase as _camelCase, capitalize as _capitalize, kebabCase as _kebabCase } from 'lodash-es'

/**
 * @desc 拼接对象数组的KEY值
 * @param arr 要拼接的数组
 * @param key 要拼接的属性名称 默认为id 若要拼接其他接 则直接传值即可
 * @returns {*}
 */
export function _joinKey2String (arr, key = 'id', flag = ',') {
  if (!isArray(arr)) return ''
  return arr.reduce((acc, cur, index, arr) => {
    return index === arr.length - 1 ? acc.concat(cur[key]) : acc.concat(cur[key] + flag)
  }, '')
}
