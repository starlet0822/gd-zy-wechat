/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-04-28 15:54:23
 */
import { judgeLoginState, login } from '@/api/modules/user'
import md5 from 'js-md5'
import { str2UTF8Bytes } from '@/utils'
import { ISDEV } from '@/config'

const state = {
  code: null,
  openId: null,
  // openId: JSON.parse(localStorage.getItem('openId')) || 'xiejiewei', // TODO 测试
  menus: JSON.parse(localStorage.getItem('menus')) || [],
  userName: 'startlet_wu',
  user: null // 用户信息
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
  }
}
export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
