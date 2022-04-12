/*
 * @Description:公共接口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:42:37
 */
import { get, post } from '@/utils/request-method'
// 获取审批列表
export function getFixCheckList(params) {
  return get(`/api/common/findFixCheckList`, params)
}
// 获取审批详情
export function findCheckInfoDetail(params) {
  return post(`/api/common/findCheckInfoDetail`, params)
}

// 获取人事待审批列表
export function findHrCheckList(params) {
  return post(`/api/common/findHrCheckList`, params)
}
// 审批驳回
export function sendCheck(params) {
  return post(`/api/common/sendCheck`, params)
}
// 审批驳回
export function getCheckCount(params) {
  return post(`/api/common/getCheckCount`, params)
}
// 查看审批流程详情接口
export function findCheckInfo(params) {
  return post(`/api/common/findCheckInfo`, params, { noLoading: true })
}