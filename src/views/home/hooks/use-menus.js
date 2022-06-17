/*
 * @Description: 前端分类菜单
 * @Author: wuxxing
 * @LastEditTime: 2022-06-17 09:29:49
 */
// import store from '@/store'
import { ISBUILD } from '@/config'
const { devProxyTarget } = require('@/config/settings')
const account = JSON.parse(localStorage.getItem('gdzy_wx_user'))?.account

export function handleMenus(menus, routes) {
  const homeMenus = []
  menus.forEach((menu) => {
    const parent = homeMenus.find((v) => v.modCode === menu.modCode)
    const item = []
    routes.forEach((route) => {
      if (route.meta.modCode === menu.modCode) {
        // this.$set(route, 'notCheckCount', null)
        // route.notCheckCount = null
        // TODO 特殊处理智能报销
        if (route.name === 'BaoXiao') {
          route.path =
            (ISBUILD ? window._CONFIG.BAOXIAO_URL : devProxyTarget) +
            `/ctrl/crtlwechat/index/wechatlogin.jsp?account=${account}&&JHSessionId=-1`
          console.log('特殊处理智能报销url', route.path)
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
