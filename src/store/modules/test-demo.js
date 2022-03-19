/*
 * @Description:
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 12:36:23
 */
/*
 * @Description: 用户相关状态
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 09:10:27
 */
const state = {
  userName: 'startlet_wu',
  roles: ['admin']
}
const mutations = {
  SET_USER_NAME (state, name) {
    state.userName = name
  }
}
const actions = {
  // 设置name
  setUserName ({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
