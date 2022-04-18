/*
 * @Description:加密工具
 * @Author: wuxxing
 * @LastEditTime: 2022-04-18 09:21:33
 */
import md5 from 'crypto-js/md5'

// md5 加密
export function encryptByMd5(password) {
  return md5(password).toString()
}
