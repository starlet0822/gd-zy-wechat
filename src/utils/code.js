/*
 * @Description:获取code
 * @Author: wuxxing
 * @LastEditTime: 2022-05-25 10:47:51
 */
import { urlQuery2Object } from './index'
import store from '@/store'
// 获取code值
export function getCode() {
  // const url =
  // 'http://hrp.gdhtcm.com:8111/wechatWeb/?code=ejjzxTtaEbN8spFmuenc05raxvF-TbJR5MLYl5ksbiE&state=STATE#/login'
  const url = location.href || ''
  const code = urlQuery2Object(url)?.code || ''
  console.log('url', url)
  console.log('code:', code)
  return code
}
// 储存code值
export function setCode(code) {
  store.dispatch('user/setCode', code)
}
