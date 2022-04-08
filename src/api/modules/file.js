/*
 * @Description:关于文件
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 15:33:59
 */
import { post } from '@/utils/request-method'
// 获取token
export function getUrlFile(params) {
  return post(`/api/file/getUrlFile`, params)
}
