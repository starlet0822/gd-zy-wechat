/*
 * @Description:人力管理相关路由
 * @Author: wuxxing
 * @LastEditTime: 2022-03-29 13:57:15
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
    path: '/attendance-check',
    name: 'AttendanceCheck',
    meta: {
      title: '考勤审批'
    },
    component: () =>
      import(/* webpackChunkName: "attendance-check" */ '@/views/human-management/attendance/check')
  },
  {
    path: '/vacation',
    name: 'Vacation',
    meta: {
      title: '休假申请',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "vacation" */ '@/views/human-management/vacation/list.vue')
  },
  {
    path: '/vacation-check',
    name: 'VacationCheck',
    meta: {
      title: '休假审批'
    },
    component: () =>
      import(/* webpackChunkName: "vacation-check" */ '@/views/human-management/vacation/check')
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
