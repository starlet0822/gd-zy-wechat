/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 18:33:05
 */
import { judgeLoginState, login } from '@/api/modules/user'
import md5 from 'js-md5'
import { str2UTF8Bytes } from '@/utils'

const state = {
  code: null,
  // openId: null,
  userAccount: '2541', // TODO 测试 2516 demo 1390
  openId: 'xiejiewei', // TODO 测试
  menus: JSON.parse(localStorage.getItem('menus')) || [], // TODO
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
      const { userAccount, password } = userInfo
      const _password = md5.base64(str2UTF8Bytes(password)) // 加密处理
      // console.log('加密处理后', _password)
      login({
        userAccount: userAccount.trim(),
        password: _password,
        openId: state.openId + state.userAccount // TODO 测试
        // openId: state.openId
      })
        .then((res) => {
          const { errcode, data } = res
          if (errcode === '0') {
            commit('SET_MENUS', data || [])
            localStorage.setItem('menus', JSON.stringify(data))
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
