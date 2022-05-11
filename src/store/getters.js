/*
 * @Description: 状态统一出口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-27 16:26:09
 */
const getters = {
  user: (state) => state.user.user,
  code: (state) => state.user.code,
  openId: (state) => state.user.openId,
  menus: (state) => state.user.menus
}
export default getters
