/*
 * @Description: 路由动态缓存
 * @Author: wuxxing
 * @LastEditTime: 2022-04-06 10:40:48
 */
import { isPlainObject, findLastIndex, remove } from 'lodash-es'
const state = {
  historyVirtualRoutes: [], // 自定义虚拟路由栈
  include: [], // 缓存集合
  exclude: [] // 不缓存集合，确保及时清除缓存
}
const getters = {
  historyVirtualRoutes: (state) => state.historyVirtualRoutes,
  include: (state) => state.include,
  exclude: (state) => state.exclude
}
const actions = {
  // 处理缓存问题方法
  handleInclude({ commit, dispatch, getters }, { to, from }) {
    const len = getters.historyVirtualRoutes.length
    const flag = len && getters.historyVirtualRoutes[len - 1].path === from.path
    // console.log(to, from, flag)
    if (flag) {
      // 返回
      commit('POP_INCLUDE', from.name)
      commit('POP_HISTORY_VIRTUAL_ROUTES')
    } else {
      // 非返回
      commit('PUSH_INCLUDE', to.name)
      commit('PUSH_HISTORY_VIRTUAL_ROUTES', to)
    }
    // if (to.params.__routerType === 'push' || to.query.__routerType === 'push') {
    //   // push 方法跳转
    //   commit('PUSH_INCLUDE', to.name)
    //   commit('PUSH_HISTORY_VIRTUAL_ROUTES', to)
    // } else if (to.params.__routerType === 'replace' || to.query.__routerType === 'replace') {
    //   // replace 方法跳转
    //   commit('POP_INCLUDE', from.name)
    //   commit('PUSH_INCLUDE', to.name)
    //   commit('POP_HISTORY_VIRTUAL_ROUTES', from)
    //   commit('PUSH_HISTORY_VIRTUAL_ROUTES', to)
    // }
    // 处理 meta.keepAlive 参数缓存
    dispatch('handleIncludeKeepAlive', to)
    dispatch('handleIncludeKeepAlive', from)
  },
  /* eslint-disable */
  // 处理路由 meta.keepAlive 参数方法
  handleIncludeKeepAlive({ commit }, params) {
    if (params.meta.hasOwnProperty('keepAlive')) {
      if (params.meta.keepAlive === true || params.meta.keepAlive === 'true') {
        commit('PUSH_INCLUDE', params.name)
      } else if (params.meta.keepAlive === false || params.meta.keepAlive === 'false') {
        commit('POP_INCLUDE', params.name)
      }
    }
  },
  // 清除缓存
  clearInclude({ commit }) {
    commit('CLEAR_INCLUDE')
  },
  // 重置缓存
  resetKeepAlive({ commit }) {
    commit('RESET_KEEP_ALIVE')
  }
}
const mutations = {
  // 虚拟路由栈入栈
  PUSH_HISTORY_VIRTUAL_ROUTES(state, value) {
    state.historyVirtualRoutes.push(value)
  },
  // 虚拟路由栈出栈
  POP_HISTORY_VIRTUAL_ROUTES(state, value) {
    if (isPlainObject(value)) {
      const i = findLastIndex(state.historyVirtualRoutes, (item) => item.path === value.path)
      if (i !== -1) {
        // 删除传入的指定路由
        state.historyVirtualRoutes.splice(i, 1)
        return
      }
    }
    state.historyVirtualRoutes.pop() // 不传默认删除最后一个路由
  },
  // include 缓存集合入栈，同时需要 exclude 不缓存集合出栈
  PUSH_INCLUDE(state, value) {
    if (!value) return
    const i = state.include.indexOf(value)
    if (i === -1 && value) {
      state.include.push(value)
    }
    const index = state.exclude.indexOf(value)
    if (index !== -1) {
      remove(state.exclude, (item) => item === value)
    }
  },
  // include 缓存集合出栈，同时需要 exclude 不缓存集合入栈
  POP_INCLUDE(state, value) {
    const i = state.include.indexOf(value)
    if (i !== -1) {
      remove(state.include, (item) => item === value)
    }
    const index = state.exclude.indexOf(value)
    if (index === -1 && value) {
      state.exclude.push(value)
    }
  },
  // 重置缓存集合
  CLEAR_INCLUDE(state) {
    state.include = []
  },
  // 初始化
  RESET_KEEP_ALIVE(state) {
    state.historyVirtualRoutes = []
    state.include = []
    state.exclude = []
  }
}
export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions
}
