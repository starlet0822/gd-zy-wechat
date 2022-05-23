/*
 * @Description: 前端分类菜单
 * @Author: wuxxing
 * @LastEditTime: 2022-05-07 11:49:03
 */
import store from '@/store'

export function handleMenus(menus, routes) {
  const homeMenus = []
  menus.forEach((menu) => {
    const parent = homeMenus.find((v) => v.modCode === menu.modCode)
    const item = []
    routes.forEach((route) => {
      if (route.meta.modCode === menu.modCode) {
        // this.$set(route, 'notCheckCount', null)
        // route.notCheckCount = null
        // 特殊处理智能报销
        if (route.name === 'BaoXiao') {
          route.path = route.path + store.getters.openId
          // console.log(route.path)
        }
        item.push(route)
      }
    })
    if (parent) {
      item && parent.children.push(item)
    } else {
      const obj = {
        title: menu.modName,
        modCode: menu.modCode,
        typeCode: item.map((v) => v.meta.typeCode).join(','),
        children: item
      }
      obj.children.length && homeMenus.push(obj) // 过滤掉无子菜单的
    }
  })
  console.log('homeMenus', homeMenus)
  return homeMenus
}
