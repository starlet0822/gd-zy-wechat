/*
 * @Description:路由权限判断
 * @Author: wuxxing
 * @LastEditTime: 2022-04-15 18:04:43
 */
import store from '@/store'

export function judgeRoutePower(to, next) {
  const {
    meta: { modCode }
  } = to
  const hasPower = store.getters.menus.some((menu) => menu.modeCode === modCode)
  console.log('hasPower', modCode, hasPower)
  if (!hasPower) {
    next('/no-power')
  } else {
    next()
  }
}
