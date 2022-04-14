/*
 * @Description:字典管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-13 17:01:14
 */

import vars from '@css/vars.less'
// 审核状态
export const checkStatus = new Map([
  ['NO', { text: '待审核', color: vars.colorRed }],
  // [0, { text: '已提交', color: vars.colorYellow }],
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
  ['acquisition', 'fix_acquisition'], // 资产购置10W以下
  ['allocation', 'fix_allocation'], // 资产调拨
  ['attendance', 'hr_attendance_result'], // 考勤
  ['vacation', 'hr_vacation'] // 休假
])
