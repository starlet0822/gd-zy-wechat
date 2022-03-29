/*
 * @Description: 常量统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-29 18:32:09
 */
// 默认文字颜色

import vars from '@css/vars.less'
export const RootValue = 37.5 // 自适应基准值
export const prefixCls = 'vh' // class类前缀
export const themeColor = '#4e78b9' // 主题基色值
export const textColor = '#262626'

export const checkStatus = new Map([
  ['NO', { text: '待审核', color: vars.colorRed }],
  // [0, { text: '已提交', color: vars.colorYellow }],
  ['YES', { text: '已审核', color: vars.colorBlue }]
])
