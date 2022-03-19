/*
 * @Description:校验工具函数
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:08:14
 */
/**
 * @desc 是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
