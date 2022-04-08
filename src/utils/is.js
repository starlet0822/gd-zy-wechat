/*
 * @Description:校验工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 14:16:01
 */
export { isNumber as _isNumber } from 'lodash-es'

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
  return /(png|jpg|jpeg)/.test(arg)
}
