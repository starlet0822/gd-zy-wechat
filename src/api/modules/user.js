/*
 * @Description:用户相关接口
 * @Author: wuxxing
 * @LastEditTime: 2022-05-06 18:04:21
 */
import { get, post, postForm } from '@/utils/request-method'
// 获取token
export function getToken(params) {
  return post(`/api/singlesignon/getAccessToken`, params)
}
// 获取用户信息
export function getUserInfo(params) {
  return postForm(`/api/singlesignon/getUserInfo`, params)
}
// 用户登录(绑定用户)
export function login(params) {
  return postForm(`/api/singlesignon/loginProcessor`, params, { noLoading: true })
}
// 用户退出登录(解除绑定)
export function logout(params) {
  return postForm(`/api/singlesignon/logoutLogin`, params, { noLoading: false })
}
// 判断是否跳转登录页
export function judgeLoginState(params) {
  return get(`/api/singlesignon/singlesignonprocess`, params)
}
