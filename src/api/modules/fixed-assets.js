/*
 * @Description:资产购置请求接口
 * @Author: wuxxing
 * @LastEditTime: 2022-03-30 15:43:54
 */
import { get } from '@/utils/request-method'
// 获取待审批列表
export function getFixCheckList(params) {
  return get(`/api/common/findFixCheckList`, params)
}
// 获取审批详情
export function findCheckInfoDetail(params) {
  return get(`/api/common/findCheckInfoDetail`, params)
}
