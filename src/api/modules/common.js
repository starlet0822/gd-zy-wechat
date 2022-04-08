/*
 * @Description:公共接口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 17:07:12
 */
import { get, postForm } from '@/utils/request-method'
// 获取审批列表
export function getFixCheckList(params) {
  return get(`/api/common/findFixCheckList`, params)
}
// 获取审批详情
export function findCheckInfoDetail(params) {
  return postForm(`/api/common/findCheckInfoDetail`, params)
}

// 获取人事待审批列表
export function findHrCheckList(params) {
  return postForm(`/api/common/findHrCheckList`, params)
}
// 审批驳回
export function sendCheck(params) {
  return postForm(`/api/common/sendCheck`, params)
}
// 审批驳回
export function getCheckCount(params) {
  return postForm(`/api/common/getCheckCount`, params)
}
// 查看审批流程详情接口
export function findCheckInfo(params) {
  return postForm(`/api/common/findCheckInfo`, params)
}
