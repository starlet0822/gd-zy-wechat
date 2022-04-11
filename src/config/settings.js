/*
 * @Description: 项目设置
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 14:51:37
 */
// !!!不可使用 import 语法
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  title: process.env.VUE_APP_GLOB_TITLE || '广东中医企业微信',
  showAxiosLoading: true // 是否开启请求加载效果
}
