/*
 * @Description: 入口函数
 * @Author: wuxxing
 * @LastEditTime: 2022-04-28 09:44:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.less' // 全局样式
import '@/plugins/vant' // 按需导入vant组件
// import './plugins/index' // 注册所有依赖插件
import 'amfe-flexible' // 屏幕适配
import '@/utils/permission' // 鉴权
import { ENV } from '@/config'
import common from './mixins/common'
import { registerGlobFilter } from './filters/index'
import { registerGlobComp } from '@/components/global'
import { registerGlobDirective } from '@/directives'
import { userAgent } from '@utils/is' // 注册全局自定义指令
// import { getCode, setCode } from './utils/code'
registerGlobFilter(Vue) // 注册全局过滤器
registerGlobComp(Vue) // 注册全局组件
registerGlobDirective(Vue)
// mock 服务
// // if (process.env.NODE_ENV === 'production') {
// const { mockXHR } = require('../mock')
// mockXHR()
// // }
// getCode()
// setCode(getCode)

console.log('当前运行环境：', ENV)
console.log('当前运行系统：', userAgent())
Vue.use(common) // 公共混入注册
Vue.config.productionTip = false // 关闭生产环境提示

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
