/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 16:36:46
 */
import { judgeLoginState, login } from '@/api/modules/user'
const state = {
  code: null,
  openId: null,
  menus: JSON.parse(sessionStorage.getItem('menus')) || [],
  userName: 'startlet_wu',
  roles: ['admin']
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_CODE(state, code) {
    state.code = code
  },
  SET_OPENID(state, openId) {
    state.openId = openId
  },
  SET_MENUS(state, val) {
    state.menus = val
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
  setOpenId({ commit }, openId) {
    commit('SET_OPENID', openId)
  },
  // 用户登录
  login({ state, commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login({ ...userInfo, openId: state.openId || 'xiejiewei' })
        .then((res) => {
          const { errcode, data } = res
          if (errcode === '0') {
            commit('SET_MENUS', data || [])
            sessionStorage.setItem('menus', JSON.stringify(data))
          }
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  judgeLoginState({ commit }, params) {
    return new Promise((resolve, reject) => {
      judgeLoginState(params)
        .then((res) => {
          console.log('judgeLoginState', res)
          if (res.errcode === '0') {
            commit('SET_OPENID', res.data.openId)
          }
          resolve(res.data)
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
