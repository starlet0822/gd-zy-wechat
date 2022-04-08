/*
 * @Description: 常量统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-08 15:44:32
 */
// 默认文字颜色

import vars from '@css/vars.less'
export const RootValue = 37.5 // 自适应基准值
export const prefixCls = 'vh' // class类前缀
export const themeColor = '#2f6bf4' // 主题基色值
export const textColor = '#262626'

// 审核状态
export const checkStatus = new Map([
  ['NO', { text: '待审核', color: vars.colorRed }],
  // [0, { text: '已提交', color: vars.colorYellow }],
  ['YES', { text: '已审核', color: vars.colorBlue }]
])
// 查询状态
export const dataState = new Map([
  ['待处理', '0'],
  ['已处理', '1'],
  ['全部', 'all']
])
// 模块code
export const typeCode = new Map([
  ['attendance', 'hr_attendance_result'], // 考勤
  ['vacation', 'hr_vacation'] // 休假
])
