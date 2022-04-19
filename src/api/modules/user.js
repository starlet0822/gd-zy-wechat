/*
 * @Description:用户相关接口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 14:31:18
 */
import { get, post, postForm } from '@/utils/request-method'
// 获取token
export function getToken(params) {
  return post(`/api/singlesignon/getAccessToken`, params)
}
// 用户登录
export function login(params) {
  return postForm(`/api/singlesignon/loginProcessor`, params, { noLoading: true })
  // return postForm(`/api/singlesignon/login`, params, { noLoading: true }) // TODO 测试加密登录
}
// }
// 判断是否跳转登录页
export function judgeLoginState(params) {
  return get(`/api/singlesignon/singlesignonprocess`, params)
}
