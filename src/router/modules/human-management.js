/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-28 17:09:52
 */
export default [
  {
    path: '/human-management',
    name: 'HumanManagement',
    component: () =>
      import(/* webpackChunkName: "human-management" */ '@/views/human-management/index.vue')
  },
  {
    path: '/attendance',
    name: 'Attendance',
    meta: {
      title: '考勤审批',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "attendance" */ '@/views/human-management/attendance/index.vue')
  },
  {
    path: '/rotational-check',
    name: 'RotationalCheck',
    meta: {
      title: '轮岗审批'
    },
    component: () =>
      import(/* webpackChunkName: "rotational-check" */ '@/views/human-management/rotational-check')
  }
]
