/*
 * @Description: 状态统一出口
 * @Author: wuxxing
 * @LastEditTime: 2022-04-07 09:21:07
 */
const getters = {
  userName: (state) => state.user.userName,
  roles: (state) => state.user.roles,
  roles2: (state) => state.testDemo.roles,
  code: (state) => state.user.code
}
export default getters
