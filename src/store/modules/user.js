/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:45:47
 */
import { judgeLoginState } from '@/api/modules/user'
const state = {
  code: null,
  userName: 'startlet_wu',
  roles: ['admin']
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_CODE(state, code) {
    state.code = code
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setCode({ commit }, code) {
    commit('SET_CODE', code)
  },
  judgeLoginState({ commit }, params) {
    return new Promise((resolve, reject) => {
      judgeLoginState(params)
        .then((res) => {
          console.log('judgeLoginState', res)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
