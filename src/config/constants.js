/*
 * @Description: 常量统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-04-25 09:41:42
 */
import vars from '../assets/css/vars.less'
export const RootValue = 37.5 // 自适应基准值
export const prefixCls = 'vh' // class类前缀
export const themeColor = vars.themeColor // 主题基色值
export const textColor = vars.colorText // 默认文字颜色

export const userCenter = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa07d3a2cb92618de&redirect_uri=http%3A%2F%2Fhrp.gdhtcm.com%3A8111%2FwechatWeb&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
export const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa07d3a2cb92618de&redirect_uri=http%3A%2F%2Fhrp.gdhtcm.com%3A8111%2FwechatWeb%2Flogin&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

// 字典常量
export { checkStatus, dataState, typeCode, checkStateTips } from './dictionary'
