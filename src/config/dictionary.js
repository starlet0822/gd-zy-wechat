/*
 * @Description:字典管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 10:01:43
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
  ['allocation', 'fix_allocation'], // 资产调拨
  ['disposal', 'fix_disposal'], // 资产处置
  ['transfer', 'fix_transfer_dept'], // 资产转移
  ['approval_apply', 'fix_approval_apply'], // 项目库（资产购置10W以上）
  // === 人力资源 ===
  ['attendance', 'hr_attendance_result'], // 考勤
  ['vacation', 'hr_vacation'] // 休假
])

// 审批前状态提示文案
export const checkStateTips = new Map([
  ['10', '确定要执行调出审核操作吗？'],
  ['11', '确定要执行调入确认操作吗？'],
  ['12', '确定要执行审核操作吗？'],
  ['13', '确定要执行审核操作吗？']
  // TODO驳回 ['30' || '10' || '0', '此单据状态不能进行驳回操作!']
])
