/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-17 18:03:55
 */
export default [
  {
    path: '/human-management',
    name: 'HumanManagement',
    component: () => import(/* webpackChunkName: "human-management" */ '@/views/human-management/index.vue')
  }
]
