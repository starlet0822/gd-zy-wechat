/*
 * @Description: 状态统一出口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-19 15:26:37
 */
const getters = {
  // userName: (state) => state.user.userName,
  // roles: (state) => state.user.roles,
  // roles2: (state) => state.testDemo.roles,
  code: (state) => state.user.code,
  openId: (state) => state.user.openId,
  userAccount: (state) => state.user.userAccount, // TODO test
  menus: (state) => state.user.menus
}
export default getters
