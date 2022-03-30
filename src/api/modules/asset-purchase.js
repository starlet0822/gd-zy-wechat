/*
 * @Description:资产购置请求接口
 * @Author: wuxxing
 * @LastEditTime: 2022-03-30 14:21:53
 */
import { get, post } from '@/utils/request-method'
// 获取待审批列表
export function getFixCheckList(params) {
  return get(`/api/common/findFixCheckList`, params)
}
// 获取待审批列表
export function getFixCheckList2(params) {
  return post(`/api/common/findFixCheckList`, params)
}
