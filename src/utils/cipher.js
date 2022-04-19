/*
 * @Description:加密工具
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 13:46:41
 */
import md5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'
import UTF8 from 'crypto-js/enc-utf8'

// base64 加密
export function encryptByBase64(cipherText) {
  return UTF8.parse(cipherText).toString(Base64)
}
// md5 加密
export function encryptByMd5(password) {
  return md5(password).toString()
}
