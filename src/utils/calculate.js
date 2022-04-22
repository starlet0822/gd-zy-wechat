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
  const ret = arg.reduce((count, pre) => {
    count = new Decimal(count).add(pre)
    return count
  }, 0)
  console.log('arg', arg, ret)
  return ret
}

/**
 * @desc 减法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function sub(...arg) {
  const ret = arg.reduce((count, pre) => {
    count = new Decimal(count).sub(pre)
    return count
  })
  return ret
}

/**
 * @desc 乘法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function mul(...arg) {
  const ret = arg.reduce((count, pre) => {
    count = new Decimal(count).mul(pre)
    return count
  })
  return ret
}

/**
 * @desc 除法运算
 * @param  {Number|String} arg 参数个数不固定
 * @returns Decimal 实例
 */
export function div(...arg) {
  const ret = arg.reduce((count, pre) => {
    count = new Decimal(count).div(pre)
    return count
  })
  return ret
}
