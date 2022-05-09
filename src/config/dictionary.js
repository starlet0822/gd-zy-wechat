/*
 * @Description:字典管理
 * @Author: wuxxing
 * @LastEditTime: 2022-05-09 17:37:23
 */

import vars from '@css/vars.less'
// 审核状态
export const checkStatus = new Map([
  ['NO', { text: '待审核', color: vars.colorRed }],
  ['YES', { text: '已审核', color: vars.colorBlue }]
])
// 查询状态
export const dataState = new Map([
  ['0', '待处理'],
  ['1', '已处理'],
  ['all', '全部']
])
// 模块code
export const typeCode = new Map([
  // === 固定资产 ===
  ['acquisition', 'fix_acquisition'], // 资产购置10W以下
  ['disposal', 'fix_disposal'], // 资产处置
  ['allocation', 'fix_allocation'], // 资产调拨
  ['transfer', 'fix_transfer_dept'], // 资产转移
  ['approval_apply', 'fix_approval_apply'], // 项目库（资产购置10W以上）
  // === 人力资源 ===
  ['attendance', 'hr_attendance_result'], // 考勤
  ['vacation', 'hr_vacation'], // 休假
  ['resetVacation', 'hr_reset_vacation'], // 销假
  ['workShift', 'hr_work_shift'], // 轮岗
  ['toLoan', 'hr_to_loan'], // 借调
  ['quit', 'hr_quit'] // 离职
])

// 审批前状态提示文案
export const checkStateTips = new Map([
  ['10', '确定要执行调出审核操作吗？'],
  ['11', '确定要执行调入确认操作吗？'],
  ['12', '确定要执行审核操作吗？'],
  ['13', '确定要执行审核操作吗？']
])

// 驳回状态提示文案
export const noStateTips = new Map([[('30' || '10' || '0', '此单据状态不能进行驳回操作!')]])

export const tipTextMap = new Map([
  ['empty', '暂无数据'],
  ['404', '404 Not Found'],
  ['lock', '抱歉，您无权限访问此页面'],
  ['network', '网络异常']
])
