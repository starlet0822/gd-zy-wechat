/*
 * @Description:获取code
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 16:38:25
 */
import { urlQuery2Object } from './index'
import store from '@/store'
// 获取code值
export function getCode() {
  const url = window.location.href || ''
  const code = urlQuery2Object(url).code
  console.log('code', url, code)
  return code
}
// 储存code值
export function setCode(code) {
  store.dispatch('user/setCode', code)
}
