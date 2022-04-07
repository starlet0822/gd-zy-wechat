/*
 * @Description:用户相关接口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:44:31
 */
import { post } from '@/utils/request-method'
// 获取token
export function getToken(params) {
  return post(`/api/singlesignon/getAccessToken`, params)
}
// 用户登录
export function login(params) {
  return post(`/api/singlesignon/loginProcessor`, params)
}
// 判断是否跳转登录页
export function judgeLoginState(params) {
  return post(`/api/singlesignon/singlesignonprocess`, params)
}
