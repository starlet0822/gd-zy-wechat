/*
 * @Description: 状态统一出口
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 13:39:30
 */
const getters = {
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  roles2: state => state.testDemo.roles
}
export default getters
