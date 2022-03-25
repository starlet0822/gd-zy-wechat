/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-25 14:36:29
 */
export default [
  {
    path: '/human-management',
    name: 'HumanManagement',
    component: () =>
      import(/* webpackChunkName: "human-management" */ '@/views/human-management/index.vue')
  },
  {
    path: '/rotational-check',
    name: 'RotationalCheck',
    meta: {
      title: '轮岗审批',
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "rotational-check" */ '@/views/human-management/rotational-check')
  }
]
