/*
 * @Description: 状态统一出口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-20 11:25:05
 */
const getters = {
  // userName: (state) => state.user.userName,
  // roles: (state) => state.user.roles,
  // roles2: (state) => state.testDemo.roles,
  code: (state) => state.user.code,
  openId: (state) => state.user.openId,
  menus: (state) => state.user.menus
}
export default getters
