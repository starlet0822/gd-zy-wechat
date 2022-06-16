/*
 * @Description:校验工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-06-13 14:09:03
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
  return /\.?(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/.test(arg)
}
// export function isAndroid() {
//   /* istanbul ignore next */
//   return /android/.test(navigator.userAgent.toLowerCase())
// }
//
// export function isIOS() {
//   /* istanbul ignore next */
//   return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
// }

// 判断手机系统类型
export function userAgent() {
  const userAgent = navigator.userAgent
  // android终端
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
  const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return `android`
  } else if (isIOS) {
    return `ios`
  }
}
