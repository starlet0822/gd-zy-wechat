/*
 * @Description: 前端分类菜单
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 10:53:22
 */
export function handleMenus(menus, routes) {
  const homeMenus = []
  menus.forEach((menu) => {
    const parent = homeMenus.find((v) => v.modCode === menu.modCode)
    const item = []
    routes.forEach((route) => {
      if (route.meta.modCode === menu.modCode) {
        item.push(route)
      }
    })
    if (parent) {
      item && parent.children.push(item)
    } else {
      const obj = {
        title: menu.modName,
        modCode: menu.modCode,
        children: item
      }
      homeMenus.push(obj)
    }
  })
  console.log('homeMenus', homeMenus)
  return homeMenus
}
