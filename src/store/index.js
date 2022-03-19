/*
 * @Description: 状态统一管理
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 13:38:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { _camelCase } from '@utils/index'

Vue.use(Vuex)

// 自动引入模块
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 把 './user.js' => 'user'
  const moduleName = _camelCase(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
  console.log(moduleName)
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug, // 严格模式
  modules,
  getters
})

export default store
