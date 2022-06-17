/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-06-17 09:12:45
 */
import { judgeLoginState, login, getUserInfo, logout } from '@/api/modules/user'
import md5 from 'js-md5'
import { str2UTF8Bytes } from '@/utils'
import { ISDEV } from '@/config'

const state = {
  code: null,
  openId: null,
  // openId: JSON.parse(localStorage.getItem('openId')) || 'xiejiewei', // TODO 测试
  menus: JSON.parse(localStorage.getItem('menus')) || [],
  userName: 'startlet_wu',
  user: null, // 用户信息
  userAccount: 'demo' // TODO 测试用户账号
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
    localStorage.setItem('openId', JSON.stringify(openId)) // for test
  },
  SET_MENUS(state, val) {
    state.menus = val
    localStorage.setItem('menus', JSON.stringify(val))
  },
  SET_USER(state, val) {
    state.user = val
    // localStorage.setItem('gdzy_wx_user', JSON.stringify(val))
  },
  SET_USER_ACCOUNT(state, val) {
    state.userAccount = val
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
    // commit('SET_OPENID', 'xiejiewei')
    return new Promise((resolve, reject) => {
      const { userAccount, password } = userInfo
      // commit('SET_OPENID', openId)
      if (ISDEV) {
        // 开发环境
        const openId = 'xiejiewei' + userAccount
        commit('SET_OPENID', openId)
        commit('SET_USER_ACCOUNT', userAccount)
      }
      const _password = md5.base64(str2UTF8Bytes(password)) // 加密处理
      login({
        userAccount: userAccount.trim(),
        password: _password,
        // openId: openId
        openId: state.openId
      })
        .then((res) => {
          if (res.errcode === '0') {
            const {
              data: { modList, orgUser }
            } = res
            commit('SET_MENUS', modList || [])
            commit('SET_USER', orgUser || null)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 退出登录
  logout({ state, commit }, openId = 'xiejiewei' + state.userAccount) {
    return new Promise((resolve, reject) => {
      logout({
        openId: ISDEV ? openId : state.openId
      })
        .then((res) => {
          if (res.errcode === '0') {
            commit('SET_MENUS', [])
            commit('SET_USER', null)
          }
          resolve(res)
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
            const {
              data: { modList, orgUser }
            } = res
            commit('SET_OPENID', res.data.openId)
            commit('SET_MENUS', modList || [])
            commit('SET_USER', orgUser || null)
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // 用户信息
  getUserInfo({ state, commit }, openId = 'xiejiewei' + state.userAccount) {
    return new Promise((resolve, reject) => {
      // openId = 'xiejiewei' + state.userAccount
      getUserInfo({
        openId: ISDEV ? openId : state.openId
      })
        .then((res) => {
          if (res.errcode === '0') {
            // const { data } = res
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
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
