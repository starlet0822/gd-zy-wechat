/*
 * @Description:获取code
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:05:18
 */
import { urlQuery2Object } from './index'
// 获取code值
export function getCode() {
  const url = window.location.href
  const code = urlQuery2Object(url).code
  console.log('code', url, code)
  return code
}
