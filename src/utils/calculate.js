/*
 * @Description:精度计算
 * @Author: wuxxing
 * @LastEditTime: 2022-04-22 10:00:57
 */
import Decimal from 'decimal.js'

/**
 * @desc 加法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function add(...arg) {
  return arg.reduce((count, pre) => {
    count = new Decimal(count).add(pre)
    return count
  }, new Decimal(0))
}

/**
 * @desc 减法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function sub(...arg) {
  return arg.reduce((count, pre) => {
    count = new Decimal(count).sub(pre)
    return count
  }, new Decimal(0))
}

/**
 * @desc 乘法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function mul(...arg) {
  return arg.reduce((count, pre) => {
    count = new Decimal(count).mul(pre)
    return count
  }, new Decimal(0))
}

/**
 * @desc 除法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function div(...arg) {
  return arg.reduce((count, pre) => {
    count = new Decimal(count).div(pre)
    return count
  }, new Decimal(0))
}
