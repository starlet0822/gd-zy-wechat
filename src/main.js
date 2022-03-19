/*
 * @Description: 入口函数
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 11:13:37
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.less' // 全局样式
import '@/plugins/vant' // 按需导入vant组件
// import './plugins/index' // 注册所有依赖插件
import 'amfe-flexible' // 屏幕适配
import { ENV } from '@/config/index'
import common from './mixins/common'
import { registerGlobComp } from '@/components/global/index'
import { registerGlobDirective } from '@/directives/index'
registerGlobComp(Vue) // 注册全局组件
registerGlobDirective(Vue) // 注册全局自定义指令

console.log('当前运行环境：', ENV)
Vue.use(common) // 公共混入注册
Vue.config.productionTip = false // 关闭生产环境提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
