/*
 * @Description: 工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:04:28
 */
// 函数库别名导出(避免命名冲突)
import { isArray } from '@utils/is'
export {
  upperFirst as _upperFirst,
  camelCase as _camelCase,
  capitalize as _capitalize,
  kebabCase as _kebabCase
} from 'lodash-es'

/**
 * @desc 拼接对象数组的KEY值
 * @param arr 要拼接的数组
 * @param key 要拼接的属性名称 默认为id 若要拼接其他接 则直接传值即可
 * @returns {*}
 */
export function _joinKey2String(arr, key = 'id', flag = ',') {
  if (!isArray(arr)) return ''
  return arr.reduce((acc, cur, index, arr) => {
    return index === arr.length - 1 ? acc.concat(cur[key]) : acc.concat(cur[key] + flag)
  }, '')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function urlQuery2Object(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
