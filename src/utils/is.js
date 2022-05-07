/*
 * @Description:校验工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-05-07 15:43:47
 */
export { isNumber as _isNumber, isUndefined as _isUndefined, isEqual as _isEqual } from 'lodash-es'

/**
 * @desc 是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isPic(arg) {
  return /\.?(png|jpg|jpeg)/.test(arg)
}
// 判断手机系统类型
export function userAgent() {
  var userAgent = navigator.userAgent
  // android终端
  var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
  var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return `android`
  } else if (isiOS) {
    return `ios`
  }
}
