/*
 * @Description:公共接口
 * @Author: wuxxing
 * @LastEditTime: 2022-05-07 14:31:15
 */
import { post, postForm } from '@/utils/request-method'
// 获取资产审批列表
export function findFixCheckList(params) {
  return post(`/api/common/findFixCheckList`, params)
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
// 查看审批流程详情接口
export function findCheckInfo(params) {
  return post(`/api/common/findCheckInfo`, params, { noLoading: true })
}
// 查看首页待审核数据量接口
export function getCheckCount(params) {
  return postForm(`/api/common/getCheckCount`, params, { noLoading: false })
}
