/*
 * @Description: 项目设置
 * @Author: wuxxing
 * @LastEditTime: 2022-04-28 13:08:03
 */
// !!!不可使用 import 语法
module.exports = {
  devProxyTarget: `http://10.10.246.222:8089`, // 开发环境代理目标地址 测试服务器http://10.10.246.222:8089/OESWechat  http://10.10.231.33:8087
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  title: process.env.VUE_APP_GLOB_TITLE || '广东中医企业微信',
  showAxiosLoading: true // 是否开启请求加载效果
}
