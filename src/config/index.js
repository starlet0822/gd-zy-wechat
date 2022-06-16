/*
 * @Description: 环境变量配置 方便在.js、.vue文件使用
 * @Author: wuxxing
 * @LastEditTime: 2022-06-15 15:02:21
 */
// 环境
export const ENV = process.env.VUE_APP_ENV
// 基础请求路径
export const API_BASEURL = process.env.VUE_APP_API_BASEURL
// 请求超时
export const API_TIMEOUT = process.env.VUE_APP_API_TIMEOUT
// app 名称
export const GLOB_TITLE = process.env.VUE_APP_GLOB_TITLE
// 是否是开发环境
export const ISDEV = process.env.NODE_ENV === 'development'
// 是否是生产环境
export const ISBUILD = process.env.NODE_ENV === 'production'
