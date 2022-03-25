/*
 * @Description:校验工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 16:11:52
 */
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
