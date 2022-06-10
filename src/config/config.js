/*
 * @Description:全局配置
 * @Author: wuxxing
 * @LastEditTime: 2022-06-10 09:21:22
 */
import Vue from 'vue'
console.log('window._CONFIG', window._CONFIG)

// 设置全局API_BASEURL
Vue.prototype.API_BASEURL = window._CONFIG.VUE_APP_API_BASEURL
  ? window._CONFIG.VUE_APP_API_BASEURL
  : process.env.VUE_APP_API_BASEURL
window._CONFIG.BASEURL = Vue.prototype.API_BASEURL
